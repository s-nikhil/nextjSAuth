import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface HeaderProps {
  userEmail: string | null;
  children?: React.ReactNode; // Include children prop here
}

export default function Header({ userEmail, children }: HeaderProps) {
  const router = useRouter();

  const logoutUser = () => {
    Cookies.remove('auth_token');
    router.push('/sign-in');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {userEmail || "Guest"}
          </Typography>
          <Button onClick={logoutUser} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      {children} {/* Render the children here */}
    </Box>
  );
}
