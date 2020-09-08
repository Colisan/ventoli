<template>
	<div>
		<router-link to="/">Home</router-link>
		<SettingsForm />
	</div>
</template>

<script lang="ts">
	import SettingsForm from '@/components/SettingsForm.vue';

	export default {
		name: 'settings',
		components: {
			SettingsForm,
		},
	};
</script>
