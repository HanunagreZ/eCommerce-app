import Router from './pages/Router/Router';
import routes from './pages/Router/routes';

// Роутер 1 на всё приложение, сюда вкидывается контейнер, в котором отрисовываются вьюшки
// Вторым параметром маршруты (где записаны пути и вьюшки)

const router = new Router(document.body, routes);

// Чтобы Линт не ругался
console.log(router);
