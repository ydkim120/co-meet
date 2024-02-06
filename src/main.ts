import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css' // dark theme

import App from './App.vue'
import router from './router'


const app = createApp(App)
// .use(ElementPlus)
.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')