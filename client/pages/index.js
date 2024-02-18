import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function addPost(event) {
    event.preventDefault();
    const title = event.target.elements.input_title.value.trim();
    const caption = document.querySelector("#description_input").value.trim();
    const data = { title, caption };
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await fetch("/posts/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Authorization: user?.token ?? "",
      },
    });
    let body = await res.json();
    console.log("status", res.status, body);
    if (res.status === 201) {
      setPosts([...posts, body]);
    } else {
      alert(`Error: ${body}`);
    }
  }

  const loadPosts = async (user) => {
    const res = await fetch("/posts", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: user?.token ?? "",
      },
    });
    let body = await res.json();
    console.log("status", res.status, body);
    if (res.status === 200) {
      setPosts(body);
    } else {
      alert(`Error: ${body}`);
    }
  };

  useEffect(() => {
    console.log("page is fully loaded");
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      loadPosts(user);
    } else {
      window.location.href = "/login.html";
    }
  }, []);
  return (
    <>
      <Head>
        <title>TWICHER</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="content">
          <div className="right">
            <div className="image-text">
              <div className="text header-text">
                <span className="name">Welcome Back</span>
                <span className="profession fw-normal fs-4">Kristine</span>
              </div>
            </div>

            <div className="d-flex mt-2">
              {/* <button
                data-bs-toggle="modal"
                className="add_post_btn"
                data-bs-target="#addPostModal"
                id="post_btn">
                <i className="fa-solid fa-plus"></i>
              </button> */}
              <div
                className=""
                id="addPostModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="addPostModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content" style={{ padding: "1rem" }}>
                    <div className="modal-header">
                      <h1 className="fs-5" id="addPostModalLabel">
                        Add Post
                      </h1>
                    </div>
                    <form className="mt-3" onSubmit={addPost}>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="title"
                          className="form-control p-2"
                          id="input_title"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <textarea
                          rows="2"
                          placeholder="Caption...."
                          className="form-control"
                          id="description_input"></textarea>
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
          <div className="middle">
            {posts.map((post, i) => {
              return <Post key={i} post={post} />;
            })}
            {/* <Post /> */}

            {/* <div
              className="card mb-3 card_colour"
              style={{ "max-width": "540px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-start">
                  <i className="fa-solid fa-user align-middle card_avatar fs-4 p-3"></i>
                  <div className="p-2">
                    <h5>Chebet Ronoh</h5>
                    <span> Lorem ipsum dolor, sit amet consectetur. </span>
                  </div>
                </div>
                <div>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                </div>
                <div className="card-icons mt-2">
                  <button id="like-post">
                    <i className="fa-solid fa-thumbs-up me-1"></i>
                  </button>
                  <span id="likes" className="me-3">
                    0
                  </span>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdro">
                    <i className="fa-solid fa-comment align-middle"></i>
                  </button>
                </div>
                

                
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}