const Todos = (props) => {
  //properties == props
  // parent => child , top => buttom
  // const todos = props.todos;
  const { todos, title, deleteDataTodos } = props;
  const handleDeleteClick = (id) => {
    alert(id);
    deleteDataTodos(id);
  };
  return (
    <div className="todos-container">
      <div className="title">{title}</div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <li className="todos-child">
              {todo.title} &nbsp;
              <span onClick={() => handleDeleteClick(todo.id)}>x</span>
            </li>
          </div>
        );
      })}
      <hr />
    </div>
  );
};
export default Todos;
