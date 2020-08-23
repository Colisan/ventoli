<template>
	<div>
		<router-link to="/">Home</router-link>
		<SigninForm />
	</div>
</template>

<script lang="ts">
	import SigninForm from '@/components/SigninForm.vue';

	export default {
		name: 'signin',
		components: {
			SigninForm,
		},
	};
</script>
