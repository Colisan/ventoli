<template>
	<a
		class="bigButton"
		:class="{
			'bigButton--isPressed': isPressed,
			'bigButton--isReleased': isReleased,
			'bigButton--isHover': isHover,
		}"
		@mousedown.left="onMouseDown"
		@mouseup.left="onMouseUp"
		@mouseover="onMouseOver"
		@mouseout="onMouseOut"
	>
		<div class="bigButton__contentWrapper">
			<div class="bigButton__content">
				<img v-if="icon" :src="require('@/assets/icons/' + icon)" class="bigButton__icon" />
				{{ text }}
			</div>
			<div class="bigButton__shine" />
		</div>
		<div class="bigButton__releaseOutline" />
	</a>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref, reactive, toRefs } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import { useRouter } from 'vue-router';
	import { Popup } from '@/model/Popup';

	export default defineComponent({
		name: 'BigButton',
		props: {
			text: {
				type: String,
				required: true,
			},
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
					context.emit('bigButtonPressed');
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
	$buttonColor: #1a7a3e;
	$buttonHeight: 2.8rem;
	$halfButtonHeight: $buttonHeight / 2;
	$buttonDotSize: 0.8rem;
	$halfButtonDotSize: $buttonDotSize / 2;
	$buttonOffset: 0.8rem;
	$shineWidth: 1rem;
	$shineSkew: 1rem;
	$outlineWidth: 1rem;
	$outlineTravel: 2rem;

	.bigButton {
		display: inline-block;
		vertical-align: middle;
		position: relative;
		height: $buttonHeight;
		font-size: 2rem;
		color: white;
		cursor: pointer;
		transition: filter 300ms;
		filter: drop-shadow(0 0 1rem rgba(0, 0, 0, 0.4));

		* {
			pointer-events: none;
		}

		> .bigButton__contentWrapper {
			height: 100%;
		}

		&:hover:not(&--isPressed) {
			filter: drop-shadow(0 0 1.2rem rgba(0, 0, 0, 0.7));
		}

		&--isHover &__shine {
			display: unset;
			animation: shineGlide 200ms 0ms linear;
		}

		&.bigButton--isReleased &__releaseOutline {
			display: unset;
			animation: outlineFade 500ms 0ms ease-out;
		}

		&.bigButton--isPressed::after {
			top: 50%;
			bottom: -1px; //TODO: fix =(
			clip-path: polygon(
				/* Top */ $halfButtonHeight 100%,
				calc(100% - #{$halfButtonHeight}) 100%,
				100% 0%,
				/* Right Dot*/ calc(100% - #{$buttonOffset}) 0%,
				calc(100% - #{$buttonOffset} - #{$halfButtonDotSize}) calc(0% + #{$halfButtonDotSize}),
				calc(100% - #{$buttonOffset} - #{$buttonDotSize}) 0%,
				/* Left Dot */ calc(#{$buttonOffset} + #{$buttonDotSize}) 0%,
				calc(#{$buttonOffset} + #{$halfButtonDotSize}) calc(0% + #{$halfButtonDotSize}),
				$buttonOffset 0%,
				0% 0%
			);
		}
	}

	.bigButton {
		&__contentWrapper {
			clip-path: polygon(
				/* Top */ $halfButtonHeight 0,
				calc(100% - #{$halfButtonHeight}) 0,
				100% 50%,
				/* Right Dot */ calc(100% - #{$buttonOffset}) 50%,
				calc(100% - #{$buttonOffset} - #{$halfButtonDotSize}) calc(50% - #{$halfButtonDotSize}),
				calc(100% - #{$buttonOffset} - #{$buttonDotSize}) 50%,
				calc(100% - #{$buttonOffset} - #{$halfButtonDotSize}) calc(50% + #{$halfButtonDotSize}),
				calc(100% - #{$buttonOffset}) 50%,
				100% 50%,
				/* Bottom */ calc(100% - #{$halfButtonHeight}) 100%,
				$halfButtonHeight 100%,
				0% 50%,
				/* Left Dot */ $buttonOffset 50%,
				calc(#{$buttonOffset} + #{$halfButtonDotSize}) calc(50% + #{$halfButtonDotSize}),
				calc(#{$buttonOffset} + #{$buttonDotSize}) 50%,
				calc(#{$buttonOffset} + #{$halfButtonDotSize}) calc(50% - #{$halfButtonDotSize}),
				$buttonOffset 50%,
				0% 50%
			);

			> .bigButton__content {
				height: 100%;
			}
		}

		&__content {
			display: flex;
			align-items: center;
			padding: 0 $buttonHeight;
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
				/* Top */ $halfButtonHeight 0,
				calc(100% - #{$halfButtonHeight}) 0,
				100% 100%,
				/* Right Dot*/ calc(100% - #{$buttonOffset}) 100%,
				calc(100% - #{$buttonOffset} - #{$halfButtonDotSize}) calc(100% - #{$halfButtonDotSize}),
				calc(100% - #{$buttonOffset} - #{$buttonDotSize}) 100%,
				/* Left Dot */ calc(#{$buttonOffset} + #{$buttonDotSize}) 100%,
				calc(#{$buttonOffset} + #{$halfButtonDotSize}) calc(100% - #{$halfButtonDotSize}),
				$buttonOffset 100%,
				0% 100%
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
			background-color: #0ff;
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
			padding-right: 1rem;
			vertical-align: middle;
		}
	}
</style>
