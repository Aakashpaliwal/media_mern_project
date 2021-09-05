import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import useStyles from "./styles.js";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js";
import { useSelector } from "react-redux";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clearHandler();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clearHandler();
    }
  };
  const clearHandler = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <form
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={submitHandler}
        >
          <Typography variant="h6">
            {currentId ? "Updating" : "Creating"} a memory
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clearHandler}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </Fragment>
  );
};

export default Form;
