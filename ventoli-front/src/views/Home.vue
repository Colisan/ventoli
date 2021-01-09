<template>
	<div class="home__wrapper">
		<router-view class="home__content" />
		<home-background class="home__background" />
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref } from 'vue';
	import { useStore } from 'vuex';
	import { Game } from '@ventoli/ventoli-model';
	import useNeedLoggedIn from '@/compositions/NeedLoggedIn';
	import { useRouter } from 'vue-router';
	import HomeBackground from '@/components/HomeBackground.vue';

	export default defineComponent({
		name: 'Home',
		components: { HomeBackground },
		setup() {},
	});
</script>

<style scoper lang="scss">
	.home {
		&__wrapper,
		&__content,
		&__background {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		&__background {
			width: 100%;
			height: 100%;
			background-color: $darkBackgroundColor;
			z-index: -1;
		}
	}
</style>
