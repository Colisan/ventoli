<template>
	<div>
		<div v-if="isLoading">
			Loading
		</div>
		<div v-else>
			Game here!
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';

	@Component
	export default class MainGame extends Vue {
		isLoading: boolean = true;

		webSocket!: WebSocket;

		beforeMount() {
			console.log(process.env.VUE_APP_VENTOLI_SERVER_URL);
			this.connectToServer().then(() => {
				this.isLoading = false;
			});
		}

		async connectToServer() {
			return new Promise((resolve, reject) => {
				try {
					this.webSocket = new WebSocket(
						process.env.VUE_APP_VENTOLI_SERVER_URL as string
					);
				} catch (e) {
					reject(e);
				}

				this.webSocket.onopen = () => {
					this.webSocket.send('something');
					resolve(1);
				};

				this.webSocket.onmessage = data => {
					console.log('recieved', data);
				};
			});
		}
	}
</script>
