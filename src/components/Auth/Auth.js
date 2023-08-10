import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostWithAuth } from "../../services/HttpService";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleButton = (path) => {
    sendRequest(path);
    setUsername("");
    setPassword("");
    //navigate("/");
  };

  const sendRequest = (path) => {
    PostWithAuth("/auth/" + path, {
      userName: username,
      password: password,
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormControl>
      <InputLabel>Username</InputLabel>
      <Input onChange={(i) => handleUsername(i.target.value)}></Input>
      <InputLabel style={{ top: 80 }}>Password</InputLabel>
      <Input
        style={{ top: 40 }}
        onChange={(i) => handlePassword(i.target.value)}
      ></Input>
      <Button
        variant="contained"
        style={{
          marginTop: 60,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          color: "white",
        }}
        onClick={() => handleButton("register")}
      >
        Register
      </Button>
      <FormHelperText style={{ margin: 20 }} id="my-helper-text">
        Are you already registered! Login
      </FormHelperText>
      <Button
        variant="contained"
        style={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          color: "white",
        }}
        onClick={() => handleButton("login")}
      >
        Login
      </Button>
    </FormControl>
  );
}
