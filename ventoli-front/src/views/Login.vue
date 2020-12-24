<template>
	<div>
		<router-link to="/">Home</router-link>
		<LoginForm />
	</div>
</template>

<script lang="ts">
	import { computed, onBeforeMount, ref, defineComponent } from 'vue';
	import { useStore } from 'vuex'
	import { useRouter } from 'vue-router';
	import LoginForm from '@/components/LoginForm.vue';
	import useNeedLoggedIn from '../compositions/NeedLoggedIn';

	export default defineComponent({
		name: "Login",
		components: {
			LoginForm,
		},
		setup() {
			return {
				...useNeedLoggedIn(),
			};
		},
	});
</script>
