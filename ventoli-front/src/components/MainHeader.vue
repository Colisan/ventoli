<template>
	<header class="mainHeader__wrapper">
		<div class="mainHeader__gameMenu">
			<router-link :to="{ name: 'Home' }">Home</router-link>
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
				router.push({ name: 'Welcome' });
			};

			return {
				onLogoutClick,
			};
		},
	});
</script>
