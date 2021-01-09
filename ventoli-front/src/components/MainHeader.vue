<template>
	<header class="mainHeader__wrapper">
		<div class="mainHeader__gameMenu">
			<router-link :to="{ name: 'Start' }">Home</router-link>
		</div>
		<div class="mainHeader__userMenu">
			<router-link :to="{ name: 'Settings' }">Settings</router-link>
			<a href="#" @click="onLogoutClick">Log out</a>
		</div>
	</header>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import { ActionType } from '@/store/storeFront/actions';
	import { Popup } from '@/model/Popup';
	import { MutationType } from '@/store/storeFront/mutations';

	export default defineComponent({
		name: 'MainHeader',
		setup() {
			const store = useStore();
			const router = useRouter();

			const onLogoutClick = () => {
				store.dispatch(ActionType.Logout);
				router.push({ name: 'Home' });
			};

			return {
				onLogoutClick,
			};
		},
	});
</script>

<style scoped lang="scss">
	$headerHeight: 3rem;

	.mainHeader {
		&__wrapper {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: $headerHeight;
			display: flex;
			justify-content: space-between;
			background-color: rgba(0, 0, 0, 0.6);
		}

		&__userMenu,
		&__gameMenu {
			> * {
				display: inline-flex;
				align-items: center;
				height: 100%;
				vertical-align: middle;
				padding: 0 1rem;
			}
		}
	}
</style>
