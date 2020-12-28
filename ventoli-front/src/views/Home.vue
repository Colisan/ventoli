<template>
	<div>
		<MainHeader />
		<div>
			<router-link :to="{ name: 'PlayGame' }">
				{{ gameButtonLabel }}
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref } from 'vue';
	import { useStore } from 'vuex';
	import { Game } from '../../../ventoli-model/dist';
	import MainHeader from '@/components/MainHeader.vue';
	import useNeedLoggedIn from '../compositions/NeedLoggedIn';

	export default defineComponent({
		name: 'Home',
		components: {
			MainHeader,
		},
		setup() {
			const store = useStore();

			const currentGame = computed(() => store.state.currentGame);
			const gameButtonLabel = ref(
				currentGame.value === undefined ? 'New game' : 'Continue game'
			);

			return {
				...useNeedLoggedIn(),
				gameButtonLabel,
			};
		},
	});
</script>
