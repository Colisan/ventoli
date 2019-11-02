
import { Vue } from 'vue-property-decorator';

function ucfirst(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export default {
  // todo passer en annotations
  defaultMutations(initialState: {[key: string]: any}) {
    const res = <any>{};
    Object.keys(initialState).forEach((prop) => {
      const mutationName = `set${ucfirst(prop)}`;
      res[mutationName] = (state: {[key: string]: any}, newValue: any) => {
        state[prop] = newValue;
      };
    });
    res.resetStore = (state: {[key: string]: any}) => {
      Object.keys(initialState).forEach((prop) => {
        state[prop] = initialState[prop];
      });
    };
    return res;
  },
  defaultGetters(initialState: any) {
    const res = <any>{};
    Object.keys(initialState).forEach((prop) => {
      res[prop] = (state: {[key: string]: any}) => state[prop];
    });
    return res;
  },
  defaultModel(vueComponent: Vue, propName: string) {
    Object.defineProperty(vueComponent, `${propName}Model`, {
      get(): any {
        return vueComponent.$store && vueComponent.$store.getters[propName];
      },
      set(value: any): void {
        if (vueComponent.$store) vueComponent.$store.commit(`set${ucfirst(propName)}`, value);
      },
    });
  },
};
