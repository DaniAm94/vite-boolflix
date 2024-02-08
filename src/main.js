import 'bootstrap/dist/css/bootstrap.min.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


// Importo l'icona o le icone
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

//Dico alla libreria quali icone caricare
library.add(faSolidStar, faRegularStar, faMagnifyingGlass);

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
