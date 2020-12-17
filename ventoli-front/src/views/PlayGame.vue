<template>
	<div>
		<MainHeader />
		Game here
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';
	import MainHeader from '../components/MainHeader.vue';
	import { Game } from '../../../ventoli-model/dist';

	@Component({
		components: {
			MainHeader,
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
