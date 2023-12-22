import React from "react";
import loginHoc from "../../loginHoc";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  padding: 8,
});

const StyledForm = styled("form")({
  marginBottom: 8,
});

const Auth = ({ handleValues, loginAsyncUI, errors, clearErrors }) => {
  const navigate = useNavigate();
  const registerPageNavigate = () => {
    navigate("/reg");
  };

  useEffect(() => {
    clearErrors({ name: null, email: null, password: null });
  }, [clearErrors]);

  return (
    <StyledContainer component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          AUTHORIZATION
        </Typography>
        <StyledForm onSubmit={loginAsyncUI}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{ mb: 2 }}
            onChange={handleValues("email")}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ mb: 2 }}
            onChange={handleValues("password")}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Authorize
          </Button>
          <Button
            onClick={registerPageNavigate}
            type="button"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register Page
          </Button>
        </StyledForm>
      </Paper>
    </StyledContainer>
  );
};

export default loginHoc(Auth, "/login");
