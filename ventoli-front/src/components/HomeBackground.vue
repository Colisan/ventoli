<template>
	<canvas ref="canvas" class="ventoliDoor--mainCanvas" />
	<div class="ventoliDoor--selection isHidden">
		<div class="ventoliDoor--selectionIcon"></div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref, Ref, onMounted } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import { useRouter } from 'vue-router';
	import { Popup } from '@/model/Popup';
	import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
	import { ArcRotateCamera } from '@babylonjs/core/Cameras';
	import { Engine } from '@babylonjs/core/Engines';
	import { HemisphericLight } from '@babylonjs/core/Lights';
	import { Color3, Color4, Matrix, Vector3 } from '@babylonjs/core/Maths';
	import { AbstractMesh, InstancedMesh, Mesh } from '@babylonjs/core/Meshes';
	import { Effect, PostProcess, Scene, Texture } from '@babylonjs/core';
	import { Camera } from '@babylonjs/core/Cameras';
	import { SceneLoader } from '@babylonjs/core/Loading';
	import { Animation } from '@babylonjs/core/Animations';
	import { AssetsManager } from '@babylonjs/core/Misc';
	import { CubicEase, EasingFunction } from '@babylonjs/core/Animations';
	import { ActionManager } from '@babylonjs/core/Actions';
	import { ExecuteCodeAction } from '@babylonjs/core/Actions';
	import { ActionEvent } from '@babylonjs/core/Actions';

	// Side-effects
	import '@babylonjs/core/Materials/standardMaterial';
	import '@babylonjs/core/Meshes/Builders/sphereBuilder';
	import '@babylonjs/core/Meshes/Builders/boxBuilder';
	import '@babylonjs/core/Meshes/Builders/groundBuilder';
	import '@babylonjs/loaders';
	import '@babylonjs/core/Loading/loadingScreen';
	import '@babylonjs/core/Meshes/instancedMesh';

	class IslandRenderer {
		private m_canvas: HTMLCanvasElement;
		private m_engine: Engine;
		private m_scene: Scene;
		private m_camera!: ArcRotateCamera;
		private m_dezoom: number = 5;
		private m_cameraAngle: number = 2;
		private m_cameraAdditionalAngle: number = 0;
		private m_assetsManager!: AssetsManager;

		private m_tileBeneathCursor?: AbstractMesh;
		private m_cursorBottomMesh?: AbstractMesh;
		private m_cursorTopMesh?: AbstractMesh;
		private m_cursorTopAnimation?: Animation;

		constructor(canvas: HTMLCanvasElement) {
			this.m_canvas = canvas;
			this.m_engine = new Engine(this.m_canvas);
			this.m_scene = new Scene(this.m_engine);
			this.init();
			this.runRenderLoop();
		}

		private async addFuturePreload(dir: string, file: string): Promise<AbstractMesh> {
			return new Promise((resolve, _) => {
				let meshTask = this.m_assetsManager.addMeshTask('load ' + dir + '/' + file, '', dir, file);
				meshTask.onSuccess = (task) => {
					resolve(task.loadedMeshes[0]);
				};
				meshTask.onError = console.error;
			});
		}

		private init() {
			this.m_scene.clearColor = new Color4(0.078, 0.063, 0.075, 1.0);

			this.m_camera = new ArcRotateCamera(
				'camera1',
				(this.m_cameraAngle * Math.PI) / 2 + Math.PI / 4,
				Math.PI / 3,
				20,
				new Vector3(0, 0, 0),
				this.m_scene
			);
			//this.m_camera.attachControl(this.m_canvas, false)
			var light = new HemisphericLight('light1', new Vector3(0.3, 1, 0.6), this.m_scene);
			light.intensity = 0.7;

			this.m_camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
			//this.m_camera.angularSensibilityX = Infinity
			//this.m_camera.angularSensibilityY = Infinity
			///this.m_camera.wheelPrecision = Infinity
			this.m_camera.useFramingBehavior = true;

			Effect.ShadersStore['customFragmentShader'] = `
			#ifdef GL_ES
					precision highp float;
			#endif

			// Samplers
			varying vec2 vUV;
			uniform sampler2D textureSampler;

			// Parameters
			uniform vec2 screenSize;

			void main(void) 
			{
					vec2 texelSize = vec2(1.0 / screenSize.x, 1.0 / screenSize.y);
					vec4 baseColor = texture2D(textureSampler, vUV);
					gl_FragColor = baseColor;
			}
			`;

			var postProcess = new PostProcess(
				'My custom post process',
				'custom',
				['screenSize', 'threshold'],
				null,
				0.5,
				this.m_camera
			);
			postProcess.onApply = function (effect: Effect) {
				effect.setFloat2('screenSize', postProcess.width, postProcess.height);
			};

			window.addEventListener('resize', (_) => {
				this.updateCanvasSize();
				this.updateCameraBoundaries();
			});
			this.updateCanvasSize();
			this.updateCameraBoundaries();

			this.m_canvas.addEventListener('keydown', (evt) => {
				if (evt.key === 'ArrowRight') {
					this.rotateRight();
				}
				if (evt.key === 'ArrowLeft') {
					this.rotateLeft();
				}
			});

			/*
			let size = 1;
			var axisX = Mesh.CreateLines("axisX", [ 
				Vector3.Zero(), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0), 
				new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
				], this.m_scene);
			axisX.color = new Color3(1.0, 0, 0);
			var axisY = Mesh.CreateLines("axisY", [
				Vector3.Zero(), new Vector3(0, size, 0), new Vector3( -0.05 * size, size * 0.95, 0), 
				new Vector3(0, size, 0), new Vector3( 0.05 * size, size * 0.95, 0)
				], this.m_scene);
			axisY.color = new Color3(0, 1.0, 0);
			var axisZ = Mesh.CreateLines("axisZ", [
				Vector3.Zero(), new Vector3(0, 0, size), new Vector3( 0 , -0.05 * size, size * 0.95),
				new Vector3(0, 0, size), new Vector3( 0, 0.05 * size, size * 0.95)
				], this.m_scene);
			axisZ.color = new Color3(0, 0, 1.0);
			*/

			this.m_assetsManager = new AssetsManager(this.m_scene);
			this.m_assetsManager.useDefaultLoadingScreen = false;
			let cb = this.addFuturePreload('landingPage/obj/', 'cursor.babylon').then((mesh) => {
				this.m_cursorBottomMesh = mesh;
			});
			let ct = this.addFuturePreload('landingPage/obj/', 'cursor2.obj').then((mesh) => {
				this.m_cursorTopMesh = mesh;
			});
			(async () => {
				await cb;
				await ct;
				this.hideCursor();
			})();
			this.addFuturePreload('/landingPage/obj/', 'grass.babylon').then((mesh) => {
				mesh.isVisible = false;
				//console.log(mesh.getBoundingInfo())
				let blocWidth = 1;
				for (let i = -3; i <= 3; i++) {
					for (let j = -3; j <= 3; j++) {
						let newInstance = (mesh as Mesh).createInstance('i' + i + 'j' + j);
						newInstance.position = new Vector3(i * blocWidth, -0.3, j * blocWidth);
						newInstance.actionManager = new ActionManager(this.m_scene);
						newInstance.actionManager.registerAction(
							new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (evt) => {
								this.onMouseOverTile(evt);
							})
						);
						newInstance.actionManager.registerAction(
							new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (evt) => {
								this.onMouseOutTile(evt);
							})
						);
					}
				}
			});

			var convertToFlat = () => {
				for (var index = 0; index < this.m_scene.textures.length; index++) {
					this.m_scene.textures[index].updateSamplingMode(Texture.NEAREST_SAMPLINGMODE);
				}
			};
			this.m_scene.executeWhenReady(function () {
				convertToFlat();
			});

			this.preloadAll().then(() => {
				this.runRenderLoop();
			});
		}

		private rotateRight() {
			if (this.m_cameraAdditionalAngle++ === 0) this.rotateCamera();
		}

		private rotateLeft() {
			if (this.m_cameraAdditionalAngle-- === 0) this.rotateCamera();
		}

		private rotateCamera() {
			console.log('rotate', this.m_cameraAdditionalAngle);
			if (this.m_cameraAdditionalAngle !== 0) {
				let direction = this.m_cameraAdditionalAngle > 0 ? 1 : -1;
				var easing = new CubicEase();
				easing.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
				let to = this.m_cameraAngle + direction;

				let anim = Animation.CreateAndStartAnimation(
					'cameraRotation',
					this.m_camera,
					'alpha',
					60,
					30,
					(this.m_cameraAngle * Math.PI) / 2 + Math.PI / 4,
					(to * Math.PI) / 2 + Math.PI / 4,
					Animation.ANIMATIONLOOPMODE_CONSTANT,
					easing
				);
				if (anim) {
					anim.onAnimationEnd = () => {
						this.m_cameraAngle = to;
						this.m_cameraAdditionalAngle -= direction;
						this.rotateCamera();
					};
				}
			}
		}

		private onMouseOverTile(evt: ActionEvent) {
			console.log(evt);
			if (evt.meshUnderPointer) {
				this.moveCursorOver(evt.meshUnderPointer);
				this.showCursor();
			}
		}

		private onMouseOutTile(evt: ActionEvent) {
			if (evt.meshUnderPointer === this.m_tileBeneathCursor) {
				this.m_tileBeneathCursor = undefined;
				this.hideCursor();
			}
		}

		private showCursor() {
			if (this.m_cursorBottomMesh && this.m_cursorTopMesh) {
				this.m_cursorBottomMesh.isVisible = true;
				//this.m_cursorTopMesh.isVisible = true
			}
		}

		private hideCursor() {
			if (this.m_cursorBottomMesh && this.m_cursorTopMesh) {
				this.m_cursorBottomMesh.isVisible = false;
				this.m_cursorTopMesh.isVisible = false;

				let selection = document.querySelector('.ventoliDoor--selection') as HTMLElement;
				if (selection) {
					selection.classList.add('isHidden');
				}
			}
		}

		private moveCursorOver(tile: AbstractMesh) {
			this.m_tileBeneathCursor = tile;
			if (this.m_cursorBottomMesh && this.m_cursorTopMesh) {
				this.m_cursorBottomMesh.position = new Vector3(
					tile.position.x,
					tile.position.y + 0.4,
					tile.position.z
				);
				//this.m_cursorTopMesh.position = new Vector3(tile.position.x, tile.position.y + 1.4, tile.position.z)

				const pos = Vector3.Project(
					this.m_cursorBottomMesh.getAbsolutePosition(),
					Matrix.IdentityReadOnly,
					this.m_scene.getTransformMatrix(),
					this.m_camera.viewport.toGlobal(
						this.m_engine.getRenderWidth(),
						this.m_engine.getRenderHeight()
					)
				);
				let selection = document.querySelector('.ventoliDoor--selection') as HTMLElement;
				if (selection) {
					selection.classList.remove('isHidden');
					selection.style.top = 'calc(' + pos.y + 'px - 150px)';
					selection.style.left = pos.x + 'px';
				}
			}
		}

		private async preloadAll(): Promise<void> {
			return new Promise((resolve, _) => {
				this.m_assetsManager.onFinish = (_) => resolve();
				this.m_assetsManager.load();
			});
		}

		private runRenderLoop() {
			this.m_engine.runRenderLoop(() => {
				this.m_scene.render();
			});
		}

		private updateCanvasSize() {
			if (this.m_canvas) {
				this.m_canvas.width = this.m_canvas.clientWidth;
				this.m_canvas.height = this.m_canvas.clientHeight;
			}
		}

		private updateCameraBoundaries() {
			if (this.m_canvas && this.m_canvas) {
				let ratio = this.m_canvas.clientWidth / this.m_canvas.clientHeight;
				this.m_camera.orthoTop = Math.abs(this.m_dezoom);
				let newWidth = this.m_dezoom * ratio;
				this.m_camera.orthoLeft = -Math.abs(newWidth);
				this.m_camera.orthoRight = newWidth;
				this.m_camera.orthoBottom = -Math.abs(this.m_dezoom);
			}
		}
	}

	export default defineComponent({
		name: 'Home Background',
		setup() {
			const store = useStore();
			const router = useRouter();

			const canvas: Ref<HTMLCanvasElement | undefined> = ref();
			let renderer: IslandRenderer;

			onMounted(() => {
				if (canvas.value) renderer = new IslandRenderer(canvas.value);
			});

			return {
				canvas,
			};
		},
	});
</script>

<style lang="scss">
	.isHidden {
		display: none;
	}

	.ventoliDoor--mainCanvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: black;
	}
</style>
