import React, { useState, useEffect, useRef } from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { PostWithAuth, DeleteWithAuth } from "../../services/HttpService";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { id, title, text, userId, userName, postLikes } = props.params;
  const [expanded, setExpanded] = React.useState(false);
  const [commentList, setCommentList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(postLikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [li̇keId, setLikedId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  let disabled = localStorage.getItem("currentUser") == null ? true : false;

  const setCommentRefresh = () => {
    setRefresh(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount(likeCount - 1);
      deleteLike();
    } else {
      setLikeCount(likeCount + 1);
      saveLike();
    }
  };

  const checkLikes = () => {
    var likeControl = postLikes.find(
      (like) => like.userId == localStorage.getItem("currentUser")
    );

    if (likeControl != null) {
      setLikedId(likeControl.id);
      setIsLiked(true);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [refresh]);

  useEffect(() => {
    checkLikes();
  }, []);

  const refreshComments = () => {
    fetch("/comments?postId=" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
      setRefresh(false)
  };

  const saveLike = () => {
    PostWithAuth("/likes", {
      postId: id,
      userId: localStorage.getItem("currentUser"),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const deleteLike = () => {
    DeleteWithAuth("/likes/" + li̇keId).catch((err) => console.log(err));
  };

  return (
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
              {userName ? userName.charAt(0).toUpperCase() : "U"}
            </Avatar>
          </Link>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleLike}
          disabled={disabled}
          style={isLiked ? { color: "red" } : null}
        >
          <FavoriteIcon />
        </IconButton>
        {likeCount}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {error
            ? "error"
            : isLoaded
            ? commentList.map((comment) => (
                <Comment
                  userId={localStorage.getItem("currentUser")}
                  userName={localStorage.getItem("userName")}
                  text={comment.text}
                ></Comment>
              ))
            : "Loading"}
          {localStorage.getItem("currentUser") == null ? (
            ""
          ) : (
            <CommentForm
              postId={id}
              userId={localStorage.getItem("currentUser")}
              userName={localStorage.getItem("userName")}
              setCommentRefresh={setCommentRefresh}
            ></CommentForm>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
