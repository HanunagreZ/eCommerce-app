import app from './components/App';
import Router from './components/Router/Router';
import { routes } from './data/routesData';

app.render();
const router = new Router(app.get(), routes);

export default router;
