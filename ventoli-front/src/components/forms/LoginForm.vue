<template>
	<form @submit.prevent="onSubmit">
		<input-field v-model="login" label="Login" />
		<input-field v-model="password" :type="InputType.Password" label="Password" />
		<input-field v-model="willRemember" :type="InputType.Check" label="Remember me" />
		<big-button text="Enter the Castel" @bigButtonPressed="onSubmit" icon="key.png" />
	</form>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import { useRouter } from 'vue-router';
	import { Game } from '@ventoli/ventoli-model';
	import InputField, { InputType } from '@/components/forms/InputField.vue';
	import BigButton from '@/components/BigButton.vue';

	export default defineComponent({
		name: 'Login Form',
		components: { InputField, BigButton },
		setup() {
			const store = useStore();
			const router = useRouter();

			const dataState = reactive({
				login: '',
				password: '',
				willRemember: false,
			});

			const onSubmit = () => {
				store
					.dispatch('CallLogin', {
						login: dataState.login,
						password: dataState.password,
						willRemember: dataState.willRemember,
					})
					.then((res: any) => {
						router.back();
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
