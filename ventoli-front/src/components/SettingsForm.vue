<template>
	<form @submit="submit">
		<input type="password" v-model="oldPassword" placeholder="old password" />
		<input type="password" v-model="newPassword" placeholder="new password" />
		<input
			type="password"
			v-model="newPasswordAgain"
			placeholder="confirm new password"
		/>
		<input type="submit" value="Save" />
	</form>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';
	import helperStores from '@/helpers/helperStores';
	import { Player } from '../../../ventoli-model/dist';

	@Component
	export default class SettingsForm extends Vue {
		private oldPassword = '';

		private newPassword = '';

		private newPasswordAgain = '';

		@Action editAccount: any;

		get formValidationError(): string {
			const player = new Player();
			try {
				player.password = this.newPassword;
			} catch (error) {
				return error.toString();
			}

			// TODO
			if (!this.oldPassword) return 'Old password is incorrect';

			if (this.oldPassword === this.newPassword)
				return 'Old and new passwords are the same';

			if (this.newPassword !== this.newPasswordAgain)
				return "Password confirmation don't match";

			return '';
		}

		async submit() {
			const validationError = this.formValidationError;

			if (validationError) {
				// eslint-disable-next-line
				alert(validationError);
				console.error(validationError);
				return;
			}
			this.editAccount({
				login: this.newPassword,
				oldPassword: this.oldPassword,
				newPassword: this.newPassword,
			}).then(() => {
				// eslint-disable-next-line
				alert('ok');
			});
		}
	}
</script>
