import { RouteProps } from 'react-router-dom';
import App from '../pages/app';
import NotFound from '../pages/notFound';
export const AppRoutes: RouteProps[] = [
  {
    path: '/',
    component: App,
    exact: true,
  },
  {
    path: '/*',
    component: NotFound,
  }
];