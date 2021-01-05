<template>
	<form @submit.prevent="onSubmit">
		<input-field v-model="oldPassword" :type="InputType.Password" label="Current password" />
		<input-field v-model="newPassword" :type="InputType.Password" label="New password" />
		<input-field
			v-model="newPasswordAgain"
			:type="InputType.Password"
			label="Confirm new password"
		/>
		<input type="submit" value="Save" />
	</form>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import { Player } from '@ventoli/ventoli-model';
	import { ActionType } from '@/store/storeFront/actions';
	import InputField, { InputType } from './InputField.vue';

	export default defineComponent({
		name: 'SettingsForm',
		components: { InputField },
		setup() {
			const store = useStore();
			const router = useRouter();

			const dataState = reactive({
				oldPassword: '',
				newPassword: '',
				newPasswordAgain: '',
			});

			const editAccount = () => {
				return store
					.dispatch(ActionType.CallEditSelfAccount, {
						login: dataState.newPassword,
						oldPassword: dataState.oldPassword,
						newPassword: dataState.newPassword,
					})
					.then(() => {
						// eslint-disable-next-line
						alert('ok');
					});
			};

			const formValidationError = (): string => {
				const player = new Player();
				try {
					player.validClearPassword = dataState.newPassword;
				} catch (error) {
					return error.toString();
				}

				// TODO
				if (!dataState.oldPassword) return 'Old password is incorrect';

				if (dataState.oldPassword === dataState.newPassword)
					return 'Old and new passwords are the same';

				if (dataState.newPassword !== dataState.newPasswordAgain)
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
				editAccount().then(() => {
					// eslint-disable-next-line
					alert('ok');
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
