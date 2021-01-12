<template>
	<div class="welcome">
		<div class="welcome__title">&nbsp;Castel&nbsp; &nbsp;Ventoli&nbsp;</div>
		<big-button text="Create account" @bigButtonPressed="onSignIn" icon="add.png" />
		<big-button text="Log in" @bigButtonPressed="onLogIn" icon="key.png" />
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
				router.push({ name: 'Create Account' });
			};

			const onLogIn = () => {
				router.push({ name: 'Login' });
			};

			return {
				...useNeedLoggedOut(),
				onSignIn,
				onLogIn,
			};
		},
	});
</script>

<style scoped lang="scss">
	.welcome {
		pointer-events: none;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		&__title {
			font-size: 8rem;
			margin-bottom: 5rem;
			color: white;
		}
	}

	.bigButton {
		pointer-events: auto;

		&:not(:last-child) {
			margin-bottom: 3rem;
		}
	}
</style>
