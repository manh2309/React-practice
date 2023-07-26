import "./Blog.scss";
import { useState } from "react";
import axios from "axios";
const AddBlog = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title) {
      alert("empty title");
      return;
    }
    if (!content) {
      alert("empty content");
      return;
    }
    let data = { title: title, body: content, userId: 1 };
    let response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data
    );

    if (response && response.data) {
      let newblog = response.data;
      props.handleAddNew(newblog);
      console.log(">>>Check form: ", newblog);
    }
  };
  return (
    // <form onSubmit={handleSubmit}>
    <div className="add-new-container">
      <div className="text-add-new">---Add new blogs---</div>
      <div className="input-data">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-data">
        <label>Content:</label>
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="btn-add-new" onClick={handleSubmit}>
        Submit
      </button>
      {/* <button className="btn-add-new" type="submit">
          Submit
        </button> */}
    </div>
    // </form>
  );
};
export default AddBlog;
