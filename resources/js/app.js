import './bootstrap';
import {createApp, onMounted} from "vue";
import router from './routes/index.js';
import VueSweetalert2 from "vue-sweetalert2";
import {abilitiesPlugin} from "@casl/vue";
import ability from './services/ability';

createApp({})
    .use(router)
    .use(VueSweetalert2)
    .use(abilitiesPlugin, ability)
    .mount('#app')
