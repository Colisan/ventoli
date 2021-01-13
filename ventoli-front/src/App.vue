<template>
	<div id="ventoli-app">
		<router-view />
		<popups />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import Popups from '@/components/popups/Popups.vue';

	export default defineComponent({
		name: 'Ventoli',
		components: { Popups },
		setup() {
			return {};
		},
	});
</script>

<style lang="scss">
	@font-face {
		font-family: 'Oclivion Laettes';
		src: url('assets/OclivionLaettes.ttf') format('truetype');
	}

	:root {
		font-family: 'Oclivion Laettes';
		font-size: 15px;

		> * {
			font-size: 2rem;
		}
	}
</style>
