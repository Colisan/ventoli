<template>
	<form @submit="submit">
		<input v-model="login" />
		<input type="password" v-model="password" placeholder="password" />
		<input
			type="password"
			v-model="passwordAgain"
			placeholder="confirm password"
		/>
		<input type="submit" value="Create new account!" />
	</form>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';
	import helperStores from '@/helpers/helperStores';
	import { Player } from '../../../ventoli-model/dist';

	@Component
	export default class SigninForm extends Vue {
		private login = '';

		private password = '';

		private passwordAgain = '';

		@Action createAccount: any;

		@Action loginWithCredentials: any;

		get formValidationError(): string {
			const player = new Player();
			try {
				player.validName = this.login;
				player.validClearPassword = this.password;
			} catch (error) {
				return error.toString();
			}

			if (this.password !== this.passwordAgain)
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

			this.createAccount({
				login: this.login,
				password: this.password,
			})
				.then(() => {
					this.loginWithCredentials({
						login: this.login,
						password: this.password,
					})
						.then(() => {
							this.$router.push({ name: 'Home' });
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
		}
	}
</script>
