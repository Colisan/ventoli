<template>
	<a
		:class="{
			iconButton: true,
			'iconButton--isPressed': isPressed,
			'iconButton--isReleased': isReleased,
			'iconButton--isHover': isHover,
		}"
		@mousedown.left="onMouseDown"
		@mouseup.left="onMouseUp"
		@mouseover="onMouseOver"
		@mouseout="onMouseOut"
	>
		<div class="iconButton__contentWrapper">
			<div class="iconButton__content">
				<img v-if="icon" :src="require('@/assets/icons/' + icon)" class="iconButton__icon" />
			</div>
			<div class="iconButton__shine" />
		</div>
		<div class="iconButton__releaseOutline" />
	</a>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref, reactive, toRefs } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import { Popup } from '@/model/Popup';

	export default defineComponent({
		name: 'IconButton',
		props: {
			icon: {
				type: String,
			},
		},
		setup(props, context) {
			const router = useRouter();

			const dataState = reactive({
				isPressed: false,
				isReleased: false,
				isHover: false,
			});

			const onMouseDown = () => {
				dataState.isPressed = true;
			};

			const onMouseUp = (evt: MouseEvent) => {
				dataState.isPressed = false;
				dataState.isReleased = true;
				window.setTimeout(() => {
					dataState.isReleased = false;
					context.emit('iconButtonPressed');
				}, 500);
			};

			const onMouseOver = (evt: MouseEvent) => {
				dataState.isHover = true;
			};

			const onMouseOut = (evt: MouseEvent) => {
				window.setTimeout(() => {
					dataState.isHover = false;
				}, 200);
			};

			return {
				...toRefs(dataState),
				onMouseDown,
				onMouseUp,
				onMouseOver,
				onMouseOut,
			};
		},
	});
</script>

<style scoped lang="scss">
	$buttonColor: #73172d;
	$buttonHeight: 3.8rem;
	$halfButtonHeight: $buttonHeight / 2;
	$buttonDotSize: 0.8rem;
	$halfButtonDotSize: $buttonDotSize / 2;
	$buttonOffset: 0.8rem;
	$shineWidth: 1rem;
	$shineSkew: 1rem;
	$outlineWidth: 1rem;
	$outlineTravel: 2rem;

	.iconButton {
		display: inline-block;
		vertical-align: middle;
		position: relative;
		height: $buttonHeight;
		width: $buttonHeight;
		cursor: pointer;
		transition: filter 300ms;
		filter: drop-shadow(0 0 1rem rgba(0, 0, 0, 0.1));

		* {
			pointer-events: none;
		}

		> .iconButton__contentWrapper {
			height: 100%;
			width: 100%;
		}

		&:hover:not(&--isPressed) {
			filter: drop-shadow(0 0 1rem rgba(0, 0, 0, 0.4));
		}

		&--isHover &__shine {
			display: unset;
			animation: shineGlide 200ms 0ms linear;
		}

		&.iconButton--isReleased &__releaseOutline {
			display: unset;
			animation: outlineFade 500ms 0ms ease-out;
		}

		&.iconButton--isPressed::after {
			top: 50%;
			bottom: 0;
			clip-path: polygon(
				 0% 0%,
				 100% 0%,
				 50% 100%,
			);
		}
	}

	.iconButton {
		&__contentWrapper {
			clip-path: polygon(
				50% 0%,
				100% 50%,
				50% 100%,
				0% 50%, 
			);

			> .iconButton__content {
				height: 100%;
				width: 100%;
			}
		}

		&__content {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: $buttonColor;
		}

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 50%;
			background-color: #ff0;
			mix-blend-mode: overlay;
			opacity: 0.3;
			clip-path: polygon(
				 0% 100%,
				 50% 0%,
				 100% 100%,
			);
		}

		&__shine {
			display: none;
			position: absolute;
			top: 0;
			bottom: 0;
			left: -2rem;
			will-change: left;
			width: $shineWidth + $shineSkew;
			background-color: white;
			mix-blend-mode: overlay;
			clip-path: polygon(calc(100% - #{$shineWidth}) 0%, 100% 0%, $shineWidth 100%, 0% 100%);

			@keyframes shineGlide {
				from {
					left: -($shineWidth + $shineSkew);
				}
				to {
					left: calc(100% + #{($shineWidth + $shineSkew)});
				}
			}
		}

		&__releaseOutline {
			display: none;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: transparent;
			opacity: 0.8;
			will-change: left, right, background-color;
			clip-path: polygon(
				$halfButtonHeight 100%,
				0 50%,
				$halfButtonHeight 0%,
				calc(#{$halfButtonHeight} + #{$outlineWidth}) 0%,
				$outlineWidth 50%,
				calc(#{$halfButtonHeight} + #{$outlineWidth}) 100%,
				calc(100% - #{$halfButtonHeight} - #{$outlineWidth}) 100%,
				calc(100% - #{$outlineWidth}) 50%,
				calc(100% - #{$halfButtonHeight} - #{$outlineWidth}) 0%,
				calc(100% - #{$halfButtonHeight}) 0%,
				100% 50%,
				calc(100% - #{$halfButtonHeight}) 100%
			);

			@keyframes outlineFade {
				from {
					left: -$outlineWidth;
					right: -$outlineWidth;
					background-color: white;
				}
				to {
					left: -$outlineWidth - $outlineTravel;
					right: -$outlineWidth - $outlineTravel;
					background-color: transparent;
				}
			}
		}

		&__icon {
			width: 2rem;
			height: 2rem;
			image-rendering: pixelated;
			vertical-align: middle;
		}
	}
</style>
