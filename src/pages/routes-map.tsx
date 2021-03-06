import loadable from '@loadable/component';

const DashboardPage = loadable(() => import('./dashboard'));
const TournamentsPage = loadable(() => import('./tournaments'));
const TeamsPage = loadable(() => import('./teams'));
const ExecutionPage = loadable(() => import('./execution'));

export const routesMap = {
  dashboard: {
    path: '/',
    element: <DashboardPage />,
    title: 'Dashboard',
  },
  tournaments: {
    path: '/tournaments',
    element: <TournamentsPage />,
    title: 'Tournaments',
  },
  teams: {
    path: '/teams',
    element: <TeamsPage />,
    title: 'Teams',
  },
  execution: {
    path: '/execution',
    element: <ExecutionPage />,
    title: 'Execution',
  },
};
