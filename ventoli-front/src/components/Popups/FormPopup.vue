<template>
	<div class="formPopup__wrapper">
		<div class="formPopup">
			<div class="formPopup__content">
				<slot />
			</div>
			<icon-button class="formPopup__closeBtn" icon="close.png" @iconButtonPressed="onClose" />
		</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import { useRouter } from 'vue-router';
	import { Popup } from '@/model/Popup';
	import IconButton from '../IconButton.vue';

	export default defineComponent({
		name: 'Form Popup',
		components: { IconButton },
		setup(props, context) {
			const store = useStore();
			const router = useRouter();

			const onClose = () => {
				context.emit('formPopupClose');
			};

			return {
				onClose,
			};
		},
	});
</script>

<style scoped lang="scss">
	$boxChamferSize: 1.5rem;

	.formPopup {
		position: relative;

		&__wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__content {
			background-color: rgba(0, 0, 0, 0.6);
			padding: $boxChamferSize;
			clip-path: polygon(
				$boxChamferSize 0%,
				calc(100% - #{$boxChamferSize}) 0%,
				100% $boxChamferSize,
				100% calc(100% - #{$boxChamferSize}),
				calc(100% - #{$boxChamferSize}) 100%,
				$boxChamferSize 100%,
				0% calc(100% - #{$boxChamferSize}),
				0% $boxChamferSize
			);
		}

		&__closeBtn {
			position: absolute;
			top: -1rem;
			right: -1rem;
		}
	}
</style>
