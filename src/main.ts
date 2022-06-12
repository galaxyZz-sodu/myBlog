import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from '@/store/index.js' // 引入

// hooks里的图片懒加载插件
// import imgLazy from '@/hooks/lazyLoad.js'

// 引入编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// 引入编译器
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// highlightjs 核心代码
import hljs from 'highlight.js/lib/core';
// 按需引入语言包
import json from 'highlight.js/lib/languages/json';

import './assets/css/iconfont.css'

hljs.registerLanguage('json', json);

VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,
  });
VMdPreview.use(githubTheme);

createApp(App).use(router).use(ElementPlus).use(VMdPreview).use(VueMarkdownEditor).use(store).mount('#app')
