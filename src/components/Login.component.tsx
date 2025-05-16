import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/entity.service';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        campoUsuario: 'email',
        campoContrasena: 'contrasena',
        valorUsuario: username,
        valorContrasena: password
      };
      const response = await login('usuario', data);
      const { token, roles } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('roles', JSON.stringify(roles));
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: '¡Bienvenido!'
      });
      navigate('/crud/usuario');
    } catch (error) {
      console.error('Login failed', error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el Login',
        text: 'Por favor, verifique sus credenciales y intente de nuevo.'
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Iniciar Sesión
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
