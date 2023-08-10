import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { PostWithAuth } from "../../services/HttpService";

function PostForm(props) {
  //const { id, title, text, userId, userName } = props.params;
  const userId = localStorage.getItem("currentUser");
  const userName = localStorage.getItem("userName") ?? "U";
  const { refreshPosts } = props;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);
  const savePost = () => {
    PostWithAuth("/posts", {
      title: title,
      userId: userId,
      text: text,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  const handleSubmit = () => {
    if (title !== "" && text !== "") {
      savePost();
      setIsSent(true);
      setText("");
      setTitle("");
      refreshPosts();
    }
  };
  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };
  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSent(false);
  };

  return (
    <div>
      <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your post is sent!
        </Alert>
      </Snackbar>

      <Card sx={{ width: 800, textAlign: "left", margin: 3 }}>
        <CardHeader
          avatar={
            <Link
              to={{ pathname: "/users/" + userId }}
              style={{
                textDecoration: "none",
                boxShadow: "none",
              }}
            >
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <OutlinedInput
              id="outlined-adorment-amount"
              multiline
              placeholder="title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            />
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {
              <OutlinedInput
                id="outlined-adorment-amount"
                multiline
                placeholder="text"
                inputProps={{ maxLength: 250 }}
                fullWidth
                value={text}
                onChange={(i) => handleText(i.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleSubmit}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
