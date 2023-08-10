import React, { useState } from "react";
import {
  Avatar,
  CardContent,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import { PostWithAuth } from "../../services/HttpService";
const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  //   small: {
  //     width: theme.spacing(4),
  //     height: theme.spacing(4),
  //   },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));
function CommentForm(props) {
  const { postId, userId, userName, setCommentRefresh } = props;
  const classes = useStyles();
  const [text, setText] = useState("");

  const saveComment = () => {
    PostWithAuth("/comments", {
      postId: postId,
      userId: userId,
      text: text,
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };

  const handleSubmit = () => {
    saveComment();
    setText("");
    setCommentRefresh()
  };
  const handleText = (value) => {
    setText(value);
  };
  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        id="outlined-adorment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        value={text}
        onChange={(i) => handleText(i.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + userId }}
            >
              <Avatar aria-aria-label="recipe" className={classes.small}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleSubmit}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
        style={{ color: "black", background: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
}
export default CommentForm;
