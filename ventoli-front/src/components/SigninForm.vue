<template>
	<form @submit="onSubmit">
		<input-field v-model="login" label="Login"/>
		<input-field v-model="password" :type="InputType.Password" label="Password"/>
		<input-field v-model="passwordAgain" :type="InputType.Password" label="Confirm password"/>
		<input type="submit" value="Create new account!" />
	</form>
</template>

<script lang="ts">
	import {
		computed,
		defineComponent,
		onBeforeMount,
		reactive,
		ref,
		toRefs,
	} from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import { Player } from '../../../ventoli-model/dist';
	import { ActionType } from '@/store/storeFront/actions';
	import InputField, { InputType } from './InputField.vue';

	export default defineComponent({
		name: 'SigninForm',
		components: { InputField },
		setup() {
			const store = useStore();
			const router = useRouter();

			const dataState = reactive({
				login: '',
				password: '',
				passwordAgain: '',
			});

			const dispatchCreation = () => {
				return store.dispatch(ActionType.CallCreateAccount, {
					login: dataState.login,
					password: dataState.password,
				});
			};

			const dispatchLogin = () => {
				return store.dispatch(ActionType.CallLogin, {
					login: dataState.login,
					password: dataState.password,
				});
			};

			const formValidationError = (): string => {
				const player = new Player();
				try {
					player.validName = dataState.login;
					player.validClearPassword = dataState.password;
				} catch (error) {
					return error.toString();
				}

				if (dataState.password !== dataState.passwordAgain)
					return "Password confirmation don't match";

				return '';
			};

			const onSubmit = () => {
				const validationError = formValidationError();

				if (validationError) {
					// eslint-disable-next-line
					alert(validationError);
					console.error(validationError);
					return;
				}

				dispatchCreation()
					.then(() => {
						dispatchLogin()
							.then(() => {
								router.push({ name: 'Home' });
							})
							.catch((err: any) => {
								// eslint-disable-next-line
								alert(err);
							});
					})
					.catch((err: any) => {
						// eslint-disable-next-line
						alert(err);
					});
			};

			return {
				...toRefs(dataState),
				onSubmit,
				InputType,
			};
		},
	});
</script>
