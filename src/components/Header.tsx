import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Медучреждение
        </Typography>
        <div className="nav-buttons">
          <NavLink
            to="/doctors"
            style={{ textDecoration: 'none', color: 'inherit' }}
            className={({ isActive }) => (isActive ? 'active' : undefined)}>
            <Button color="inherit">Врачи</Button>
          </NavLink>
          <NavLink
            to="/nurses"
            style={{ textDecoration: 'none', color: 'inherit' }}
            className={({ isActive }) => (isActive ? 'active' : undefined)}>
            <Button color="inherit">Медсестры</Button>
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
