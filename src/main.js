import Vue from 'vue';
import firebase from 'firebase';
import './firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: (h) => h(App),
    }).$mount('#app');
  }
});

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount('#app');
