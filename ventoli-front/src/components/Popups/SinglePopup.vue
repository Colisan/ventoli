<template>
	<div>
		<header v-if="data.title">
			{{ data.title }}
		</header>
		<div>
			{{ data.content }}
		</div>
		<div>
			<button v-for="button in data.buttonList" :key="button.label" v-on:click="button.action">
				{{ button.label }}
			</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import { Popup } from '@/model/Popup';

	export default defineComponent({
		name: 'Popup',
		props: {
			data: {
				type: Popup,
				required: true,
			},
		},
		setup() {
			const store = useStore();
			const router = useRouter();

			return {};
		},
	});
</script>
