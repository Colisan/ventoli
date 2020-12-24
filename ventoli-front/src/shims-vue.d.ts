declare module '*.vue' {
  import type { Vue } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
