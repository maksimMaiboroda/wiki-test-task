import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '@/components/ui/Loader';
import MainLayout from '@layouts/MainLayout';

const HomePage = lazy(() => import('@pages/Home/HomePage'));
const AboutPage = lazy(() => import('@pages/About/AboutPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader isLoading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<Loader isLoading />}>
            <AboutPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loader isLoading />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
