import React from 'react';
import { Routing } from 'pages';
import { routesMap } from 'pages/routes-map';
import { CssBaseline } from '@mui/material';
import { MainPageLayout } from 'shared/ui';
import { withProviders } from './providers';
import './index.scss';

const appBarLinks = [routesMap.dashboard, routesMap.tournaments, routesMap.teams];

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <MainPageLayout appBarLinks={appBarLinks}>
        <Routing />
      </MainPageLayout>
    </div>
  );
}

export default withProviders(App);
