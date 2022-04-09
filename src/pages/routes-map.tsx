import loadable from '@loadable/component';

const DashboardPage = loadable(() => import('./dashboard-page'));

export const routesMap = {
  dashboard: {
    path: '/',
    element: <DashboardPage />,
  },
};
