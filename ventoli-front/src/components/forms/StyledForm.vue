<template>
	<slot />
</template>

<script lang="ts">
	import { computed, defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';

	export default defineComponent({
		name: 'Styled Form',
		components: {},
		setup() {
			return {};
		},
	});
</script>

<style lang="scss">
	form {
		padding: 1rem 0.5rem;
	}

	fieldset {
		border: none;
		padding: 0;

		> label {
			display: block;
		}

		> input {
			display: block;
			width: 100%;
		}

		&:not(:last-child) {
			margin-bottom: 1rem;
		}
	}

	label {
		color: white;
	}

	input {
		box-sizing: border-box;
		padding: 0.2rem;
		font-size: inherit;
		font-family: inherit;
	}

	input[type='checkbox'] {
		width: 1.5rem;
		height: 1.5rem;
	}

	.bigButton {
		display: block;
		margin-top: 2rem;
	}
</style>
