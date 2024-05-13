// import './pages/Router/variants/Router';
import Router from './pages/Router/Router';
import routes from './pages/Router/routes';

const router = new Router(routes);
// router.navigateTo('/');
const btn = document.querySelector('#button');
if (btn)
  btn.addEventListener('click', () => {
    console.log('click');
    router.navigateTo('/about');
  });
console.log(router);
