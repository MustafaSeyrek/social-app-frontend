import React from "react";
import {
  Avatar,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import User from '../User/User';
const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  // small: {
  //   width: theme.spacing(4),
  //   height: theme.spacing(4),
  // },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));
function Comment(props) {
  const { text, userId, userName } = props;
  const classes = useStyles();

  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        disabled
        id="outlined-adorment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        value={text}
        startAdornment={
          <InputAdornment position="start">
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + userId }}
            >
              <Avatar aria-aria-label="recipe" className={classes.small}>
                {userName != null ?  userName.charAt(0).toUpperCase() : "U"}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        style={{ color: "black", background: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
}
export default Comment;
