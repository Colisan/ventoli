<template>
	<div class="start">
		<big-button :text="gameButtonLabel" @bigButtonPressed="onPlay" icon="play.png" />
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import { Game } from '@ventoli/ventoli-model';
	import BigButton from '@/components/BigButton.vue';
	import useNeedLoggedIn from '@/compositions/NeedLoggedIn';
	import { useRouter } from 'vue-router';

	export default defineComponent({
		name: 'Start',
		components: {
			BigButton,
		},
		setup() {
			const store = useStore();
			const router = useRouter();

			const currentGame = computed(() => store.state.currentGame);
			const gameButtonLabel = ref(currentGame.value === undefined ? 'New game' : 'Continue game');

			const onPlay = () => {
				router.push({ name: 'PlayGame' });
			};

			return {
				...useNeedLoggedIn(),
				gameButtonLabel,
				onPlay,
			};
		},
	});
</script>

<style scoper lang="scss">
	.start {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
