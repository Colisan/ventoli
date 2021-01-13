<template>
	<form @submit.prevent="onSubmit">
		<input-field v-model="oldPassword" :type="InputType.Password" label="Current password" />
		<input-field v-model="newPassword" :type="InputType.Password" label="New password" />
		<input-field
			v-model="newPasswordAgain"
			:type="InputType.Password"
			label="Confirm new password"
		/>
		<big-button text="Save" @bigButtonPressed="onSubmit" icon="save.png" />
	</form>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import { useRouter } from 'vue-router';
	import { Player } from '@ventoli/ventoli-model';
	import InputField, { InputType } from '@/components/forms/InputField.vue';
	import BigButton from '@/components/BigButton.vue';

	export default defineComponent({
		name: 'SettingsForm',
		components: { InputField, BigButton },
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
					.dispatch('CallEditSelfAccount', {
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
