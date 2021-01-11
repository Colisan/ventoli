<template>
	<form-popup @formPopupClose="onClose">
		<SigninForm />
	</form-popup>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import useNeedLoggedOut from '@/compositions/NeedLoggedOut';
	import SigninForm from '@/components/SigninForm.vue';
	import FormPopup from '@/components/popups/FormPopup.vue';
	import { useRouter } from 'vue-router';

	export default defineComponent({
		name: 'SignIn',
		components: {
			SigninForm,
			FormPopup,
		},
		setup() {
			const router = useRouter();
			
			const onClose = () => {
				router.replace({ name: 'Welcome' });
			};

			return {
				...useNeedLoggedOut(),
				onClose
			};
		},
	});
</script>
