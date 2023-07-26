import { useHistory } from "react-router-dom";
const NotFound = () => {
  let history = useHistory();
  const handleHomePage = () => {
    history.push("/");
  };
  return (
    <div className="not-found-container">
      <h4>This page Isn't Available</h4>
      <h5>This back Home page</h5>
      <button className="btn btn-primary" onClick={() => handleHomePage()}>
        Go to Home
      </button>
    </div>
  );
};
export default NotFound;
