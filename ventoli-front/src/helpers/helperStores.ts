import { Vue } from 'vue-property-decorator';

function ucfirst(input: string): string {
	return input.charAt(0).toUpperCase() + input.slice(1);
}

export default {
	// todo passer en annotations
	defaultMutations<StateType>(initialState: StateType) {
		const res = <any>{};
		Object.keys(initialState).forEach((prop) => {
			const mutationName = `set${ucfirst(prop)}`;
			res[mutationName] = (state: StateType, newValue: any) => {
				(state as { [key: string]: any })[prop] = newValue;
			};
		});
		res.resetStore = (state: StateType) => {
			Object.keys(initialState).forEach((prop) => {
				(state as { [key: string]: any })[prop] = (initialState as {
					[key: string]: any;
				})[prop];
			});
		};
		return res;
	},
	defaultGetters<StateType>(initialState: StateType) {
		const res = <{ [key: string]: any }>{};
		Object.keys(initialState).forEach((prop) => {
			res[prop] = (state: StateType) => (state as { [key: string]: any })[prop];
		});
		return res;
	},
	/*
	defaultModel<StateType>(
		vueComponent: Vue,
		stateOrGetterName: string,
		mutationName = `set${ucfirst(stateOrGetterName)}`,
		modelName = `${stateOrGetterName}Model`
	) {
		Object.defineProperty(vueComponent, `${modelName}`, {
			get(): any {
				return (
					vueComponent.$store &&
					(vueComponent.$store.state[stateOrGetterName] ||
						vueComponent.$store.getters[stateOrGetterName])
				);
			},
			set(value: any): void {
				if (vueComponent.$store)
					vueComponent.$store.commit(mutationName, value);
			},
		});
	},*/
};
