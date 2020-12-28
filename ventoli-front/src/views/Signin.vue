<template>
	<div>
		<router-link to="/">Home</router-link>
		<SigninForm />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import useNeedLoggedOut from '@/compositions/NeedLoggedOut';
	import SigninForm from '@/components/SigninForm.vue';

	export default defineComponent({
		name: 'SignIn',
		components: {
			SigninForm,
		},
		setup() {
			return {
				...useNeedLoggedOut(),
			};
		},
	});
</script>
