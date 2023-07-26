import { useParams, useHistory } from "react-router-dom";
import useFetch from "../customize/fetch";
import "./DetailBlog.scss";
const DetailBlog = () => {
  let { id } = useParams();
  let history = useHistory();
  const {
    data: dataDetail,
    isLoading,
    isIsErr,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`, false);
  const handleBackData = () => {
    history.push("/blogs");
  };

  console.log(">>Check data", dataDetail);
  return (
    <>
      <div>
        <span onClick={() => handleBackData()}>&lt;-- back</span>
      </div>
      <div className="blog-detail">
        {dataDetail && (
          <>
            <div className="title">
              Blog Id: {id} -{" "}
              {isLoading === true ? "Loading..." : dataDetail.title}
            </div>
            <div className="content">{dataDetail.body}</div>
          </>
        )}
      </div>
    </>
  );
};
export default DetailBlog;
