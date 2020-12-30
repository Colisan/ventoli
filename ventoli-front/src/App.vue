<template>
	<div id="ventoli-app">
		<router-view />
		<popups />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import { useStore } from 'vuex';
	import { MutationType } from '@/store/storeFront/mutations';
	import { ActionType } from '@/store/storeFront/actions';
	import Popups from '@/components/Popups/Popups.vue';

	export default defineComponent({
		name: 'Ventoli',
		components: { Popups },
		setup() {
			const store = useStore();

			const lastToken = localStorage.getItem('auth-token');
			if (lastToken) {
					console.log("fetched token in storage");
				store.commit(MutationType.SetAuthToken, lastToken);
				store.dispatch(ActionType.CallGetSelfAccount);
			}

			store.subscribe((mutation, state) => {
				if (mutation.type === MutationType.SetAuthToken) {
					console.log("saving token in storage");
					localStorage.setItem('auth-token', mutation.payload);
				}
			});

			return {}
		},
	});
</script>
