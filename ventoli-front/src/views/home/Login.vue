<template>
	<form-popup v-if="!isLoading" @formPopupClose="onClose">
		<styled-form>
			<LoginForm />
		</styled-form>
	</form-popup>
</template>

<script lang="ts">
	import { computed, onBeforeMount, ref, defineComponent, reactive, toRefs } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import { useRouter } from 'vue-router';
	import LoginForm from '@/components/forms/LoginForm.vue';
	import FormPopup from '@/components/popups/FormPopup.vue';
	import StyledForm from '@/components/forms/StyledForm.vue';
	import useNeedLoggedOut from '@/compositions/NeedLoggedOut';

	export default defineComponent({
		name: 'Login',
		components: {
			LoginForm,
			FormPopup,
			StyledForm,
		},
		setup() {
			const router = useRouter();
			const store = useStore();

			const dataState = reactive({
				isLoading: true,
			});

			const onClose = () => {
				router.replace({ name: 'Welcome' });
			};

			const lastToken = localStorage.getItem('auth-token');

			if (lastToken) {
				store
					.dispatch('TestThenCallSetToken', lastToken)
					.then(() => {
						store.dispatch('CallGetSelfAccount').then(() => {
							router.back();
						});
					})
					.catch(() => {
						dataState.isLoading = false;
					});
			} else {
				dataState.isLoading = false;
			}

			store.subscribe((mutation, state) => {
				if (mutation.type === 'SetAuthToken') {
					if (mutation.payload) localStorage.setItem('auth-token', mutation.payload);
					else localStorage.removeItem('auth-token');
				}
			});

			return {
				...useNeedLoggedOut(),
				...toRefs(dataState),
				onClose,
			};
		},
	});
</script>
