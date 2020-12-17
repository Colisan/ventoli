<template>
	<div>
		Welcome
		<template>
			<router-link :to="{ name: 'Signin' }">Sign in</router-link>
			<router-link :to="{ name: 'Login' }">Log in</router-link>
		</template>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';

	@Component
	export default class Welcome extends Vue {
		@Getter isLoggedIn!: boolean;

		beforeMount() {
			if (this.isLoggedIn) {
				this.$router.push({ name: 'Home' });
			}
		}
	}
</script>
