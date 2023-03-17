import { useState } from "react";

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments ?? []);

  const likePost = async (e) => {
    const icon = document.getElementById("like-post");
    const likes = document.getElementById("likes");
    icon.classList.toggle("active");
    if (icon.classList.contains("active")) {
      likes.innerHTML = parseInt(likes.innerHTML) + 1;
    } else {
      likes.innerHTML = parseInt(likes.innerHTML) - 1;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await fetch(`/posts/${post.id}/likes`, {
      method: icon.classList.contains("active") ? "POST" : "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: user?.token ?? "",
      },
    });
    let body = await res.json();
    console.log("status", res.status, body);
    if (res.status === 200) {
    } else {
      alert(`Error: ${body}`);
    }
  };

  const comment = async (e) => {
    e.preventDefault();
    const text = document.getElementById("post-comment").value.trim();
    const data = { text };
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await fetch(`/posts/${post.id}/comments`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Authorization: user?.token ?? "",
      },
    });
    let body = await res.json();
    console.log("status", res.status, body);
    if (res.status === 200) {
      document.getElementById("post-comment").value = "";
      setComments([
        ...comments,
        { user: { username: user.username }, text: text },
      ]);
    } else {
      alert(`Error: ${body}`);
    }
  };
  return (
    <div className="card mb-3 card_colour" style={{ maxWidth: "540px" }}>
      <div className="card-body">
        <div className="d-flex justify-content-start">
          {!post.user.picture && (
            <i className="fa-solid fa-user align-middle card_avatar fs-4 p-3"></i>
          )}

          {post.user.picture && (
            <img
              width={55}
              height={55}
              style={{ borderRadius: "60px", objectFit: "cover" }}
              src={`${post.user.picture}`}
              alt="Profile Photo"
            />
          )}
          <div className="p-2">
            <h5>{post.user.username}</h5>
            <span> {post.title} </span>
          </div>
        </div>
        <div>
          <p className="card-text">{post.caption}</p>
        </div>
        <div className="card-icons mt-2">
          <button onClick={likePost} id="like-post">
            <i className="fa-solid fa-thumbs-up me-1"></i>
          </button>
          <span id="likes" className="me-3">
            {post._count.likes}
          </span>
          <span id="likes" className="me-3">
            {post._count.comments} Comments
          </span>
        </div>
        {comments.map((comment, i) => {
          return (
            <div key={i}>
              <span style={{ fontWeight: "bold" }}>
                {comment.user.username}:{" "}
              </span>
              <span>{comment.text}</span>
            </div>
          );
        })}
        <div id="commentModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ padding: "1rem" }}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="commentModalLabel">
                  Add a Comment
                </h1>
              </div>
              <form className="mt-3 mb-3" onSubmit={comment} id="myForm">
                <div className="mb-3">
                  <input
                    type="text"
                    id="post-comment"
                    placeholder="type a comment"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
