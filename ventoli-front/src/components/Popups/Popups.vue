<template>
	<div>
		<div v-for="popup in popupList" :key="popup.content">
			<single-popup :data="popup" />
		</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, ref } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import SinglePopup from '@/components/popups/SinglePopup.vue';
	import { Popup } from '@/model/Popup';

	export default defineComponent({
		components: { SinglePopup },
		name: 'Popups Handler',
		setup() {
			const store = useStore();
			const router = useRouter();

			const popupList = computed(() => store.state.popupList as Array<Popup>);

			return {
				popupList,
			};
		},
	});
</script>
