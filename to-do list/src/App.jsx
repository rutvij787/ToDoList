import { useEffect, useState } from "react";
import classes from "./styles.module.css";
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  async function fetchListOfTodos() {
    setLoading(true);
    const apiresponse = await fetch("https://dummyjson.com/todos");
    const result = await apiresponse.json();

    if (result?.todos && result?.todos?.length > 0) {
      setTodoList(result?.todos);
      setLoading(false);
    } else {
      setTodoList([]);
      setLoading(false);
      setErrorMessage("No data found");
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
    console.log(getCurrentTodoId);
    try {
      const apiresponse = await fetch(
        `https://dummyjson.com/todos/${getCurrentTodoId}`
      );
      const details = await apiresponse.json();
      if (details) {
        setTodoDetails(details);
        setOpenDialog(true);
      }
    } catch (error) {
      setTodoDetails(null);
      setOpenDialog(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchListOfTodos();
  }, []);

  if (loading)
    return <Skeleton variant="rectangular" width={210} height={118} />;
  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Simple to do list app</h1>

      <div className={classes.todoListWrapper}>
        {todoList && todoList.length > 0
          ? todoList.map((todoItem) => (
              <TodoItem
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
                todo={todoItem}
              />
            ))
          : null}
      </div>
      <TodoDetails
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        todoDetails={todoDetails}
        setTodoDetails={setTodoDetails}
      />
    </div>
  );
}

export default App;
