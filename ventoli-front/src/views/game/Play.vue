<template>
	<div class="play">
		<MainGame />
	</div>
</template>

<script lang="ts">
	import { computed, onBeforeMount, ref, defineComponent } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import MainHeader from '@/components/MainHeader.vue';
	import MainGame from '@/components/MainGame.vue';
	import useNeedLoggedIn from '@/compositions/NeedLoggedIn';

	export default defineComponent({
		name: 'Play',
		components: {
			MainHeader,
			MainGame,
		},
		setup() {
			return {
				...useNeedLoggedIn(),
			};
		},
	});
</script>
