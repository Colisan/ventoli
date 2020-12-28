<template>
	<div>
		Welcome
		<router-link :to="{ name: 'SignIn' }">Sign in</router-link>
		<router-link :to="{ name: 'LogIn' }">Log in</router-link>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import useNeedLoggedOut from '../compositions/NeedLoggedOut';

	export default defineComponent({
		name: 'Welcome',
		setup() {
			return {
				...useNeedLoggedOut(),
			};
		},
	});
</script>
