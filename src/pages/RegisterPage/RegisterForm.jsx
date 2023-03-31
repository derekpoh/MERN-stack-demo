import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, signUp } from "../../utilities/users-service";
import { Box, TextField, Button, Grid, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function SignUpForm({setUser}) {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirm: ""
    })
    const disable = state.password !== state.confirm;
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await signUp(state);
        setUser(getUser());
        navigate("/users/account/preferences");
      } catch (error) {
        setError(error.message);
      }
    };
  
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]:event.target.value
        })
    };
  
    return (
        <Container maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              minHeight: '100vh',
            }}
          >
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <TextField
                label="Re-type Password"
                fullWidth
                margin="normal"
                type="password"
                name="confirm"
                value={state.confirm}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                disabled={disable}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Sign Up
              </Button>
            </form>
            <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
              <Grid item>
                <Typography variant="body2" align="center">
                  Already have an account?
                </Typography>
              </Grid>
            </Grid>
            <Button
              component={Link}
              to="/users/login"
              color="primary"
              variant="outlined"
              sx={{ marginTop: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Container>
    );
}