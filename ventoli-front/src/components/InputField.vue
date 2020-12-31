<template>
	<fieldset>
		<label :for="id">{{ label }}</label>
		<input v-model="value" :type="type" :placeholder="placeholder" :id="id" />
	</fieldset>
</template>

<script lang="ts">
	import {
		computed,
		defineComponent,
		onBeforeMount,
		reactive,
		ref,
		toRefs,
		DefineComponent,
		watch,
		toRef,
	} from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import { Player } from '../../../ventoli-model/dist';
	import { ActionType } from '@/store/storeFront/actions';

	export enum InputType {
		Text = 'TYPE_TEXT',
		Password = 'TYPE_PASSWORD',
		Check = 'TYPE_CHECKBOX',
	}

	export const inputTypeValues = {
		[InputType.Text]: 'text',
		[InputType.Password]: 'password',
		[InputType.Check]: 'checkbox',
	};

	export default defineComponent({
		name: 'Input Field',
		props: {
			modelValue: {
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
			type: {
				type: String,
				validator: (val: string) => Object.keys(inputTypeValues).includes(val),
				default: InputType.Text,
			},
			placeholder: {
				type: String,
				default: '',
			},
		},
		setup(props, context) {
			const dataState = reactive({
				value: props.modelValue,
				label: props.label,
				type: inputTypeValues[props.type as InputType],
				placeholder: props.placeholder,
				id: 'input_' + props.label.replaceAll(/(\W)/g, '_').toLowerCase(),
			});

			watch(toRef(props, 'modelValue'), (modelValue) => {
				dataState.value = modelValue;
			});

			watch(toRef(dataState, 'value'), (inputValue) => {
				context.emit('update:modelValue', inputValue);
			});

			return {
				...toRefs(dataState),
			};
		},
	});
</script>
