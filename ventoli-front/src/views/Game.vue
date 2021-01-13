<template>
	<div class="game__wrapper">
		<main-header class="game__header" />
		<router-view class="game__content" />
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import { Game } from '@ventoli/ventoli-model';
	import useNeedLoggedIn from '@/compositions/NeedLoggedIn';
	import MainHeader from '@/components/MainHeader.vue';
	import { useRouter } from 'vue-router';

	export default defineComponent({
		name: 'Game',
		components: { MainHeader },
		setup() {},
	});
</script>

<style scoped lang="scss">
	.game {
		&__wrapper {
			background-color: $darkBackgroundColor;
		}

		&__wrapper,
		&__content {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		&__header {
			z-index: 2;
		}
	}
</style>
