import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const hasRole = (requiredRoles: string[]) => {
    return roles.some((role: string) => requiredRoles.includes(role));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        {token ? (
          <>
            <Button
              color="inherit"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              Sin FK
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >

              {hasRole(['admin', 'roleManager']) && (
                <MenuItem onClick={() => { navigate('/crud/rol'); handleMenuClose(); }}>Rol</MenuItem>
              )}
              {hasRole(['admin', 'sourceManager']) && (
                <MenuItem onClick={() => { navigate('/crud/fuente'); handleMenuClose(); }}>Fuente</MenuItem>
              )}
              {hasRole(['admin', 'sectionManager']) && (
                <MenuItem onClick={() => { navigate('/crud/seccion'); handleMenuClose(); }}>Sección</MenuItem>
              )}
              {hasRole(['admin', 'subsectionManager']) && (
                <MenuItem onClick={() => { navigate('/crud/subseccion'); handleMenuClose(); }}>Subsección</MenuItem>
              )}
            </Menu> 
            {hasRole(['admin', 'invitado']) && (
              <Button color="inherit" onClick={() => navigate('/crud/usuario')}>Usuarios</Button>
            )}
            {hasRole(['admin']) && (
              <Button color="inherit" onClick={() => navigate('/fk/indicatorresult')}>Resultados</Button>
            )}
            {hasRole(['admin', 'invitado']) && (
              <Button color="inherit" onClick={() => navigate('/fk/indicatorvariables')}>Variables</Button>
            )}
            {hasRole(['admin', 'user']) && (
              <Button color="inherit" onClick={() => navigate('/fk/variablesusers')}>Usuarios Variables</Button>
            )}
            {hasRole(['admin', 'actor']) && (
              <Button color="inherit" onClick={() => navigate('/fk/actor')}>Actores</Button>
            )}
            {hasRole(['admin', 'indicator']) && (
              <Button color="inherit" onClick={() => navigate('/fk/indicators')}>Indicadores</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
          </>
        ) : (
          <Typography variant="body1" color="inherit">
            Por favor, inicie sesión para acceder a las rutas.
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
