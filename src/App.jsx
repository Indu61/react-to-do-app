import { useState } from "react";
import ToDoPage from "./components/ToDoPage";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToDoPage />
    </>
  );
}

export default App;
