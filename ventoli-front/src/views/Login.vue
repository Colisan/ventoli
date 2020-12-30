<template>
	<div>
		<template v-if="!isLoading">
			<router-link to="/">Home</router-link>
			<LoginForm />
		</template>
	</div>
</template>

<script lang="ts">
	import { computed, onBeforeMount, ref, defineComponent, reactive, toRefs } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import LoginForm from '@/components/LoginForm.vue';
	import useNeedLoggedOut from '@/compositions/NeedLoggedOut';
	import { ActionType } from '@/store/storeFront/actions';
	import { MutationType } from '@/store/storeFront/mutations';

	export default defineComponent({
		name: 'Login',
		components: {
			LoginForm,
		},
		setup() {
			const router = useRouter();
			const store = useStore();

			const dataState = reactive({
				isLoading: true,
			})
			
			const lastToken = localStorage.getItem('auth-token');

			if (lastToken) {
				store.dispatch(ActionType.TestThenSetToken, lastToken).then(() => {
					store.dispatch(ActionType.CallGetSelfAccount).then(() => {
						router.back();
					})
				}).catch(()=>{
					dataState.isLoading = false;
				})
			} else {
				dataState.isLoading = false;
			}

			store.subscribe((mutation, state) => {
				if (mutation.type === MutationType.SetAuthToken) {
					if (mutation.payload)
						localStorage.setItem('auth-token', mutation.payload);
					else
						localStorage.removeItem('auth-token');
				}
			});

			return {
				...useNeedLoggedOut(),
				...toRefs(dataState),
			};
		},
	});
</script>
