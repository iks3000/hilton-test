"use client";
import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useAuth } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    login(name);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Typography variant='h4' component='h1' gutterBottom>
        Login
      </Typography>

      <Box
        display='flex'
        gap='0.5rem'
        flexDirection='column'
        width='40%'
        component='form'
        onSubmit={handleLogin}
      >
        <TextField
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant='outlined'
          fullWidth
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleLogin}
          size='large'
          fullWidth
          type='submit'
          disabled={!name.length}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
