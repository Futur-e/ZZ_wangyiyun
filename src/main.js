import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css'
import * as ElIcons from '@element-plus/icons'
import ui from './components/library'
const app = createApp(App)
app.use(ElementPlus).use(ui)

for (const name in ElIcons){
    // app.component(name,(ElIcons as any)[name])
    app.component(name,(ElIcons)[name])
}

app.use(store).use(router).mount('#app')
