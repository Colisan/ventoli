<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>Game here!</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import { Game } from '../../../ventoli-model/dist';

	export default defineComponent({
		name: 'MainGame',
		submit() {
			const isLoading = ref(true);

			let webSocket: WebSocket;
			try {
				webSocket = new WebSocket(
					process.env.VUE_APP_VENTOLI_SERVER_URL as string
				);
			} catch (e) {
				console.error('todo no socket');
				return;
			}

			webSocket.onopen = () => {
				webSocket.send('something');
				isLoading.value = true;
			};

			webSocket.onmessage = (data) => {
				console.log('recieved', data);
			};

			return {
				isLoading,
			};
		},
	});
</script>
