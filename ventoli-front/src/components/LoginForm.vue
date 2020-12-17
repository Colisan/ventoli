<template>
	<form @submit="submit">
		<input v-model="login" placeholder="login" />
		<input type="password" v-model="password" placeholder="password" />
		<input type="submit" value="Enter the castle!" />
	</form>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';
	import helperStores from '@/helpers/helperStores';

	@Component
	export default class LoginForm extends Vue {
		private login = '';

		private password = '';

		@Action loginWithCredentials: any;

		submit() {
			this.loginWithCredentials({
				login: this.login,
				password: this.password,
			})
				.then((res: any) => {
					this.$router.back();
				})
				.catch((err: any) => {
					// eslint-disable-next-line
					alert(err);
				});
		}
	}
</script>
