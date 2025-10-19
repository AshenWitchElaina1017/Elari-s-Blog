import './assets/main.css'
import './assets/markdown.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MarkdownPlugin from './plugins/markdown'

const app = createApp(App)

app.use(router)
app.use(MarkdownPlugin)
app.mount('#app')
