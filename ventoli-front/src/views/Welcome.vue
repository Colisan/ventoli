<template>
	<div>
		Welcome
		<big-button text="Sign in" @bigButtonPressed="onSignIn" />
		<big-button text="Log in" @bigButtonPressed="onLogIn" />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import useNeedLoggedOut from '@/compositions/NeedLoggedOut';
	import BigButton from '@/components/BigButton.vue';
	import { useRouter } from 'vue-router';

	export default defineComponent({
		name: 'Welcome',
	components: { BigButton },
		setup() {
			const router = useRouter();
			
			const onSignIn = () => {
				router.push({ name: 'SignIn' })
			}

			const onLogIn = () => {
				router.push({ name: 'SignIn' })
			}

			return {
				...useNeedLoggedOut(),
				onSignIn,
				onLogIn,
			};
		},
	});
</script>
