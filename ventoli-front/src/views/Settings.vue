<template>
	<div>
		<router-link to="/">Home</router-link>
		<SettingsForm />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import useNeedLoggedIn from '../compositions/NeedLoggedIn';
	import SettingsForm from '@/components/SettingsForm.vue';

	export default defineComponent({
		name: 'Settings',
		components: {
			SettingsForm,
		},
		setup() {
			return {
				...useNeedLoggedIn(),
			};
		},
	});
</script>
