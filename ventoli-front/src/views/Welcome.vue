<template>
	<div class="welcome__wrapper">
		<div class="welcome__content">
			<div class="welcome__title">&nbsp;Castel&nbsp; &nbsp;Ventoli&nbsp;</div>
			<big-button text="Create account" @bigButtonPressed="onSignIn" icon='add.png' />
			<big-button text="Log in" @bigButtonPressed="onLogIn" icon='key.png' />
		</div>
		<div class="welcome__background">

		</div>
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
				router.push({ name: 'LogIn' })
			}

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
	&__wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__title {
		font-size: 8rem;
		margin-bottom: 5rem;
		color: white;
	}

	&__background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #060806;
		z-index: -1;
	}
}

.bigButton:not(:last-child) {
	margin-bottom: 3rem;
}

</style>
