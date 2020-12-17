<template>
	<header class="mainHeader__wrapper">
		<div class="mainHeader__gameMenu">
			<router-link :to="{ name: 'Home' }">Home</router-link>
		</div>
		<div class="mainHeader__userMenu">
			<router-link :to="{ name: 'Settings' }">Settings</router-link>
			<a href="#" @click="onLogoutClick">Log out</a>
		</div>
	</header>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';

	@Component
	export default class MainHeader extends Vue {
		@Action logout!: Function;

		onLogoutClick() {
			this.logout();
			this.$router.push({ name: 'Welcome' });
		}
	}
</script>
