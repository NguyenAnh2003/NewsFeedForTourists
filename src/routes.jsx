import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/layouts/Layout';
import { lazy, Suspense } from 'react';


const lazyLoading = (pageName) => {
  const LazyPage = lazy(() =>  
    import(`./pages/${pageName}.jsx`)
  );

  return (
    <Suspense fallback='Loading...'>
      <LazyPage />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: lazyLoading('404'),
    children: [
      {
        index: true,
        element: lazyLoading('HomePage'),
      },
      {
        path: 'about',
        element: lazyLoading('AboutPage'),
      },
      {
        path: 'signin',
        element: lazyLoading('SignInPage')
      },
      {
        path: 'signup',
        element: lazyLoading('SignUpPage')
      },
      {
        path: 'upload',
        element: lazyLoading('UploadFile')
      }
    ],
  },
]);

//

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
