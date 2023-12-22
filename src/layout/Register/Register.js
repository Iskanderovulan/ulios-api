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
  marginTop: 8,
});

const Register = ({
  handleValues,
  loginAsyncUI,
  errors,
  clearErrors,
  error,
  loading,
}) => {
  const navigate = useNavigate();
  const authPageNavigate = () => {
    navigate("/auth");
  };
  console.log(error);
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
          REGISTRATION
        </Typography>
        <StyledForm onSubmit={loginAsyncUI}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            sx={{ mb: 2 }}
            onChange={handleValues("name")}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            sx={{ mb: 2 }}
            onChange={handleValues("email")}
            error={!!errors.email || !!error}
            helperText={errors.email || error}
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
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </Button>
          <Button
            onClick={authPageNavigate}
            type="button"
            fullWidth
            variant="contained"
            color="primary"
          >
            Authorize Page
          </Button>
        </StyledForm>
      </Paper>
    </StyledContainer>
  );
};

export default loginHoc(Register, "/reg");
