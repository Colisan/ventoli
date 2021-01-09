<template>
	<form-popup>
		<router-link to="/">Home</router-link>
		<SigninForm />
	</form-popup>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import useNeedLoggedOut from '@/compositions/NeedLoggedOut';
	import SigninForm from '@/components/SigninForm.vue';
	import FormPopup from '@/components/popups/FormPopup.vue';

	export default defineComponent({
		name: 'SignIn',
		components: {
			SigninForm,
			FormPopup,
		},
		setup() {
			return {
				...useNeedLoggedOut(),
			};
		},
	});
</script>
