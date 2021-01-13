<template>
	<form @submit.prevent="onSubmit">
		<input-field v-model="login" label="Login" />
		<input-field v-model="password" :type="InputType.Password" label="Password" />
		<input-field v-model="passwordAgain" :type="InputType.Password" label="Confirm password" />
		<big-button text="Enter the Castel" @bigButtonPressed="onSubmit" icon="add.png" />
	</form>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import { useRouter } from 'vue-router';
	import { Player } from '@ventoli/ventoli-model';
	import InputField, { InputType } from './InputField.vue';
	import BigButton from '@/components/BigButton.vue';

	export default defineComponent({
		name: 'Signin Form',
		components: { InputField, BigButton },
		setup() {
			const store = useStore();
			const router = useRouter();

			const dataState = reactive({
				login: '',
				password: '',
				passwordAgain: '',
			});

			const dispatchCreation = () => {
				return store.dispatch('CallCreateAccount', {
					login: dataState.login,
					password: dataState.password,
				});
			};

			const dispatchLogin = () => {
				return store.dispatch('CallLogin', {
					login: dataState.login,
					password: dataState.password,
					willRemember: false,
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
