<template>
	<div>
		<MainHeader />
		<MainGame />
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';
	import MainHeader from '../components/MainHeader.vue';
	import MainGame from '../components/MainGame.vue';
	import { Game } from '../../../ventoli-model/dist';

	@Component({
		components: {
			MainHeader,
			MainGame,
		},
	})
	export default class PlayGame extends Vue {
		@Getter currentGame!: Game | undefined;

		@Getter isLoggedIn!: boolean;

		beforeMount() {
			if (!this.isLoggedIn) {
				this.$router.push({ name: 'Login' });
			}
		}
	}
</script>
