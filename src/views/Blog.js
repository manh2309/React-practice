import useFetch from "../customize/fetch";
import "./Blog.scss";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AddBlog from "./Addblog";
const Blog = () => {
  const {
    data: dataBlogs,
    isLoading,
    isIsErr,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts`, false);
  const [show, setShow] = useState(false);
  const [newData, setNewData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (dataBlogs && dataBlogs.length > 0) {
      let data = dataBlogs.slice(0, 9);
      setNewData(data);
      console.log(">>>Check new data", newData);
    }
  }, [dataBlogs]);

  const handleAddNew = (blog) => {
    let data = newData;
    data.unshift(blog);
    setShow(false);
    setNewData(data);
  };

  const deletePost = (id) => {
    let data = newData;
    data = data.filter((item) => item.id !== id);
    setNewData(data);
  };

  return (
    <>
      <div>
        {/* <button className="btn-add-new" onClick={handleAddNew}>
          + Add new blog
        </button> */}
        <Button variant="primary" className="my-3" onClick={handleShow}>
          + Add new blog
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddBlog handleAddNew={handleAddNew} />
          </Modal.Body>
        </Modal>
      </div>
      <div className="blog-container">
        {isLoading === false &&
          newData &&
          newData.length > 0 &&
          newData.map((item) => {
            return (
              <div className="single-blog" key={item.id}>
                <div className="title">Title: {item.title}</div>
                <div className="content">{item.body}</div>
                <button>
                  <Link to={`/blogs/${item.id}`}>View details</Link>
                </button>
                <button onClick={() => deletePost(item.id)}>Delete Blog</button>
              </div>
            );
          })}
        {isLoading === true && <div> Loading... </div>}
      </div>
    </>
  );
};
export default Blog;
