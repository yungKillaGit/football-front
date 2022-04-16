import { AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import { bem } from 'shared/lib';

interface Props {
  children: ReactNode;
  toolbarClassName?: string;
}

const { block, element } = bem('AppBar');

const AppBar = ({ children, toolbarClassName }: Props) => {
  return (
    <MuiAppBar position="fixed" {...block()}>
      <Toolbar className={toolbarClassName}>
        {children}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
