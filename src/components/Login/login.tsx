import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from 'next/router'
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Cookies from 'js-cookie';
import Box from "@mui/material/Box";
import { getLoginDetails } from '../../api/auth/signin'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../Footer/footer";
import { Alert, Snackbar } from "@mui/material";

const defaultTheme = createTheme();

export default function LogIn() {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const resetErrorMessage = () => {
    setMessage(null);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        resetErrorMessage();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emailInput = event.currentTarget.elements.namedItem('email') as HTMLInputElement;
    const password = data.get('password');
  
    if (!emailInput || !password) {
      setMessage('Please provide both email and password');
      return;
    }
  
    if (!emailInput.validity.valid) {
      setMessage('Please enter a valid email address');
      return;
    }
  
    const email = emailInput.value;
    const passwordString = password as string; // Explicitly cast password to string
  
    const res = await getLoginDetails({ email, password: passwordString });
  
    if (res?.access_token) {
      Cookies.set('auth_token', res.access_token);
      router.push('/logged-in');
    } else {
      setMessage(res?.data?.message || 'Unauthorized');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Snackbar
          open={!!message}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={resetErrorMessage}
        >
          <Alert onClose={resetErrorMessage} severity="error">
            {message}
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs />
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
