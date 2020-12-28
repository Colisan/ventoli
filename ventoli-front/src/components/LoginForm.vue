<template>
	<form @submit="onSubmit">
		<input v-model="login" placeholder="login" />
		<input type="password" v-model="password" placeholder="password" />
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

	export default defineComponent({
		name: 'LoginForm',
		setup() {
			const store = useStore();
			const router = useRouter();

			const dataState = reactive({
				login: '',
				password: '',
			});

			const onSubmit = () => {
				store
					.dispatch(ActionType.CallLogin, {
						login: dataState.login,
						password: dataState.password,
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
			};
		},
	});
</script>
