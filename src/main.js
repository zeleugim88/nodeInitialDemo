import { createApp } from 'vue'
import App from './App.vue' //import root component
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'
createApp(App).mount('#app')
//https://vuejs.org/api/application.html#createapp
//An application instance won't render anything until its .mount() method is called.
//.mount() returns its root component instance

