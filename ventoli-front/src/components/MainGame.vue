<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>Game here!</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
	import { useStore } from '@/stores/storeFront';
	import { useRouter } from 'vue-router';
	import { Game } from '@ventoli/ventoli-model';

	export default defineComponent({
		name: 'MainGame',
		setup() {
			const dataState = reactive({
				isLoading: true,
			});

			let webSocket: WebSocket;
			try {
				webSocket = new WebSocket(process.env.VUE_APP_VENTOLI_SERVER_URL as string);

				webSocket.onopen = () => {
					webSocket.send(JSON.stringify({ type: 'PING', payload: new Date() }));
					dataState.isLoading = true;
				};

				webSocket.onmessage = (data) => {
					console.log('recieved', data);
					dataState.isLoading = false;
				};
			} catch (e) {
				console.error('todo no socket');
			}

			return {
				...toRefs(dataState),
			};
		},
	});
</script>
