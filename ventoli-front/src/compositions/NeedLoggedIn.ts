import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
	
export default function useNeedLoggedIn() {
	const store = useStore()
	const router = useRouter()

	const isLoggedIn = computed(() => store.getters.isLoggedIn);

	onBeforeMount(() => {
		if (!isLoggedIn) {
			router.push({ name: 'LogIn' });
		}
	});

	return {}
}