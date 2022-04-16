import loadable from '@loadable/component';

const DashboardPage = loadable(() => import('./dashboard-page'));
const TournamentsPage = loadable(() => import('./tournaments-page'));
const TeamsPage = loadable(() => import('./teams-page'));

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
};
