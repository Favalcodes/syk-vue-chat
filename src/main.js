import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import firebase from 'firebase';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPaperPlane)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDOcfb0Gekiy9WpX4kouZNkvkmdoKeP-b8",
  authDomain: "syk-chat.firebaseapp.com",
  projectId: "syk-chat",
  storageBucket: "syk-chat.appspot.com",
  messagingSenderId: "917968078678",
  appId: "1:917968078678:web:ebc77b463c6ebbb96ef8f7",
  measurementId: "G-EGESZS4EFB"
};

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged( () => new Vue({
  render: h => h(App),
}).$mount('#app'))


