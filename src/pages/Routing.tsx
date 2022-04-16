import { Route, Routes } from 'react-router-dom';
import { routesMap } from 'pages/routes-map';

const Routing = () => {
  return (
    <Routes>
      {
        Object.values(routesMap).map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))
      }
    </Routes>
  );
};

export default Routing;
