<template>
	<form @submit="submit">
		<input v-model="login" />
		<input type="password" v-model="password" />
		<input type="password" v-model="passwordAgain" />
		<input type="submit" value="Save" />
	</form>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Getter, Action, Mutation } from 'vuex-class';
	import helperStores from '@/helpers/helperStores';

	@Component
	export default class SettingsForm extends Vue {
		private login = '';

		private password = '';

		private passwordAgain = '';

		submit() {
			alert(this);
		}
	}
</script>
