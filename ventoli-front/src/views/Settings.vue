<template>
	<div class="settings__wrapper">
		<MainHeader />
		<SettingsForm class="settings__content" />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import useNeedLoggedIn from '@/compositions/NeedLoggedIn';
	import SettingsForm from '@/components/SettingsForm.vue';
	import MainHeader from '@/components/MainHeader.vue';

	export default defineComponent({
		name: 'Settings',
		components: {
			MainHeader,
			SettingsForm,
		},
		setup() {
			return {
				...useNeedLoggedIn(),
			};
		},
	});
</script>

<style scoper lang="scss">

.settings {
	&__wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $darkBackgroundColor;
	}

	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}

</style>