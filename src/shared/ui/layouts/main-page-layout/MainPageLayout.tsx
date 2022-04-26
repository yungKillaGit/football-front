import { ReactNode, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteConfig } from 'shared/types';
import { MenuItem, Typography } from '@mui/material';
import { bem } from 'shared/lib';
import './MainPageLayout.scss';
import { AppBar, Logo } from 'shared/ui';

interface Props {
  appBarLinks: RouteConfig[];
  children: ReactNode;
}

const { block, element } = bem('MainPageLayout');

const MainPageLayout = ({ appBarLinks, children }: Props) => {
  const location = useLocation();
  const activeLink = useMemo(() => {
    return appBarLinks.find((x) => x.path === location.pathname);
  }, [location]);

  return (
    <div {...block()}>
      <AppBar toolbarClassName="grid-container">
        <Logo {...element('logo')} />
        {
          appBarLinks.map((link) => {
            return (
              <MenuItem key={link.path} {...element('menu-item-link', { active: activeLink?.path === link.path })}>
                <Link to={link.path}>
                  <Typography color="primary.light">
                    {link.title || ''}
                  </Typography>
                </Link>
              </MenuItem>
            );
          })
        }
      </AppBar>
      <div {...element('page-content', {}, 'grid-container')}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          {activeLink?.title}
        </Typography>
        {children}
      </div>
    </div>
  );
};

export default MainPageLayout;
