import logo from "./logo.svg";
import "./App.css";
import Nav from "./views/Nav";
import Todos from "./views/Todos";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Covid from "./views/Covid";
import CountDown from "./views/Countdown";
import CDHook from "./views/CountdownHook";
import Blog from "./views/Blog";
import DetailBlog from "./views/DetailBlog";
import AddBlog from "./views/Addblog";
import { useState, useEffect } from "react";
import NotFound from "./views/NotFound";
import YoutubeSearch from "./views/YoutubeSearch";
const App = () => {
  const [name, setName] = useState("Manh");
  const [address, setAddress] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, title: "Manh di code dao", type: "Manh1" },
    { id: 2, title: "Manhmom", type: "Manh1" },
    { id: 3, title: "Manhmom1", type: "Manh2" },
    { id: 4, title: "Manhmom2", type: "Manh2" },
  ]);

  useEffect(() => {
    //Sẽ chạy vào khi rerender
    console.log(">>>Run useEfect");
  }, []); // [] == componentDidMouse chỉ chạy duy nhất 1 lần
  //Sử dụng được nhiều useEffect
  const handleChangeName = (event) => {
    setAddress(event.target.value);
  };
  const handleClick = (event) => {
    //Hook not auto merge state
    // student = { ...student, setStudent };
    // console.log(">>>Check student", setStudent);
    if (!address) {
      alert("This not wrongs");
      return;
    }
    let newTodos = { id: Math.floor(Math.random() * 1000), title: address };
    // todos = [...todos, newTodos];
    setTodos([...todos, newTodos]);
    setAddress("");
    alert("well done");
  };
  const deleteDataTodos = (id) => {
    let newDataTodos = todos;
    newDataTodos = newDataTodos.filter((item) => item.id !== id);
    setTodos(newDataTodos);
  };

  return (
    <Router>
      <>
        <div className="App">
          <header className="App-header">
            <Nav />
            <img src={logo} className="App-logo" alt="logo" />

            <Switch>
              <Route exact path="/">
                {/* <h3>Covid 19 Tracking in Vietnam:</h3> */}
                <Covid />
              </Route>
              <Route path="/timer">
                <CountDown />
                <hr />
                <CDHook />
              </Route>
              <Route path="/todos">
                <Todos
                  todos={todos}
                  title={"All todos"}
                  deleteDataTodos={deleteDataTodos}
                />
                <input
                  type="text"
                  value={address}
                  onChange={(event) => handleChangeName(event)}
                />
                <br />
                <button onClick={(event) => handleClick(event)}>
                  Click me
                </button>
              </Route>
              <Route path="/blogs" exact>
                <Blog />
              </Route>
              <Route path="/blogs/:id">
                <DetailBlog />
              </Route>
              <Route path="/add-new-blog">
                <AddBlog />
              </Route>
              <Route path="/secret">
                <YoutubeSearch />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </header>
        </div>
      </>
    </Router>
  );
};

export default App;
