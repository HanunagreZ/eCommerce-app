import Router from './pages/Router/Router';
import routes from './pages/Router/routes';

// const app = document.querySelector('#app');
const router = new Router(document.body, routes);
// router.navigateTo('/');
const btn = document.querySelector('#button');
if (btn)
  btn.addEventListener('click', () => {
    console.log('click');
    router.navigateTo('/about');
  });
console.log(router);
