<template>
	<form @submit="onSubmit">
		<input-field v-model="login" label="Login"/>
		<input-field v-model="password" :type="InputType.Password" label="Password"/>
		<input-field v-model="willRemember" :type="InputType.Check" label="Remember me"/>
		<input type="submit" value="Enter the castle!" />
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
	import { Game } from '../../../ventoli-model/dist';
import { ActionType } from '@/store/storeFront/actions';
import { MutationType } from '@/store/storeFront/mutations';
import InputField, { InputType } from './InputField.vue';


	export default defineComponent({
		name: 'LoginForm',
		components: { InputField },
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
					.dispatch(ActionType.CallLogin, {
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
