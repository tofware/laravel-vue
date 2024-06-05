import './bootstrap';
import {createApp, onMounted} from "vue";
import useAuth from './composables/auth';
import router from './routes/index.js';
import VueSweetalert2 from "vue-sweetalert2";
import {abilitiesPlugin} from "@casl/vue";
import ability from './services/ability';

createApp({
    setup() {
        const { getUser } = useAuth()
        onMounted(getUser)
    }
})
    .use(router)
    .use(VueSweetalert2)
    .use(abilitiesPlugin, ability)
    .mount('#app')
