import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default function useNeedLoggedIn() {
	const store = useStore();
	const router = useRouter();

	const isLoggedIn = computed(() => store.getters.isLoggedIn);

	onBeforeMount(() => {
		if (!isLoggedIn.value) {
			console.log('Not logged in, redirecting to login');
			router.push({ name: 'LogIn' });
		}
	});

	return {};
}
