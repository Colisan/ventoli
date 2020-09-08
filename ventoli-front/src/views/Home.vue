<template>
	<div>
		Hello
		<template v-if="!isLoggedIn">
			<router-link :to="{ name: 'Signin' }">Sign in</router-link>
			<router-link :to="{ name: 'Login' }">Log in</router-link>
		</template>
		<template v-else>
			<router-link :to="{ name: 'Settings' }">Settings</router-link>
			<a href="#" @click="logout">Log out</a>
		</template>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';

	@Component
	export default class Home extends Vue {
		@Getter isLoggedIn?: string;

		@Action logout?: Function;
	}
</script>
