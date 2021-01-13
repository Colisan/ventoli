import { computed, onBeforeMount } from 'vue';
import { useStore } from '@/stores/storeFront';
import { useRouter } from 'vue-router';

export default function useNeedLoggedOut() {
	const store = useStore();
	const router = useRouter();

	const isLoggedIn = computed(() => store.getters.isLoggedIn);

	onBeforeMount(() => {
		if (isLoggedIn.value) {
			console.log('Not logged out, redirecting to home');
			router.push({ name: 'Start' });
		}
	});

	return {};
}
