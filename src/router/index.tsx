import { lazy } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/home'));
const LoginPage = lazy(() => import('@/pages/login'));
const NotFoundPage = lazy(() => import('@/pages/404'));

const routerItems = [
  <Route path="/" element={<LoginPage />} key="LOGIN" />,
  <Route path="/home" element={<HomePage />} key="HOME" />,
  <Route path="/login" element={<LoginPage />} key="LOGIN" />,
  <Route path="*" element={<NotFoundPage />} key="NOT_FOUND" />,
];

const router = createBrowserRouter(createRoutesFromElements(routerItems));

export const RouteContainer = () => {
  return <RouterProvider router={router} />;
};
