import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';


//UI компоненты Prime
import components from '@/components/UI/index';
import ToastService from 'primevue/toastservice';

//Хранилище
import {store} from "@/store/store";
//Роутер
import myRouter from "@/router/router";

//импорт стилей PrimeVue
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css';
import BadgeDirective from 'primevue/badgedirective';
import Tooltip from 'primevue/tooltip';

//Инициализация приложения
const app = createApp(App);
app.use(PrimeVue);
app.use(store);
app.use(ToastService);
app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
components.forEach(component => {
    app.component(component.name, component);
});
app
    .use(myRouter)
    .mount('#app');

