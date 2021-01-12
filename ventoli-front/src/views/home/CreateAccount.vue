<template>
	<form-popup @formPopupClose="onClose">
		<styled-form>
			<SigninForm />
		</styled-form>
	</form-popup>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import useNeedLoggedOut from '@/compositions/NeedLoggedOut';
	import SigninForm from '@/components/forms/SigninForm.vue';
	import StyledForm from '@/components/forms/StyledForm.vue';
	import FormPopup from '@/components/popups/FormPopup.vue';
	import { useRouter } from 'vue-router';

	export default defineComponent({
		name: 'Create Account',
		components: {
			SigninForm,
			FormPopup,
			StyledForm,
		},
		setup() {
			const router = useRouter();

			const onClose = () => {
				router.replace({ name: 'Welcome' });
			};

			return {
				...useNeedLoggedOut(),
				onClose,
			};
		},
	});
</script>
