<template>
	<canvas ref="canvas" />
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref, Ref, onMounted } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import { Popup } from '@/model/Popup';
	import { Engine } from '@babylonjs/core/Engines';
	import { Scene } from '@babylonjs/core/scene';
	import { Color4, Vector3 } from '@babylonjs/core/Maths/math';
	import { HemisphericLight } from '@babylonjs/core/Lights';
	import { ArcRotateCamera, Camera } from '@babylonjs/core/Cameras';
	import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
	import { CubicEase, EasingFunction } from '@babylonjs/core/Animations/easing';
	import { Animation } from '@babylonjs/core/Animations';

	class IslandRenderer {
		private canvas: HTMLCanvasElement;
		private engine: Engine;
		private scene: Scene;
		private camera!: Camera;

		constructor(canvas: HTMLCanvasElement) {
			this.canvas = canvas;
			this.engine = new Engine(this.canvas);
			this.scene = new Scene(this.engine);
			this.init();
			this.runRenderLoop();
		}

		private init() {
			this.scene.clearColor = new Color4(0.078, 0.063, 0.075, 1.0);

			this.camera = new ArcRotateCamera(
				'camera',
				-Math.PI / 2,
				Math.PI / 2.5,
				3,
				new Vector3(0, 0, 0),
				this.scene
			);
			this.camera.attachControl(this.canvas, true);
			const light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
			const box = MeshBuilder.CreateBox('box', {}, this.scene);

			this.startCameraRotation();
		}

		private startCameraRotation() {
			let anim = Animation.CreateAndStartAnimation(
				'cameraRotation',
				this.camera,
				'alpha',
				60,
				10000 * 60,
				0,
				360
			);
		}

		private runRenderLoop() {
			this.engine.runRenderLoop(() => {
				this.scene.render();
			});
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
