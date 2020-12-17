<template>
	<div>
		<router-link to="/">Home</router-link>
		<LoginForm />
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';
	import LoginForm from '@/components/LoginForm.vue';

	@Component({
		components: {
			LoginForm,
		},
	})
	export default class Login extends Vue {
		@Getter isLoggedIn!: boolean;

		beforeMount() {
			if (this.isLoggedIn) {
				this.$router.push({ name: 'Home' });
			}
		}
	}
</script>
