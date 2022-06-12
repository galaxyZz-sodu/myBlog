/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@kangc/v-md-editor/lib/preview';

declare module '@kangc/v-md-editor/lib/theme/github';

declare module '@kangc/v-md-editor'

declare module '@kangc/v-md-editor/lib/plugins/highlight-lines/index'

declare module '@/store/index.js'

declare module '@/hooks/lazyLoad.js'