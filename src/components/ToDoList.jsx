import { useState, useEffect } from "react";
import "./toDoList.css";
import { TiTickOutline } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import { FcTodoList } from "react-icons/fc";

export const ToDoList = () => {
  const [value, setValue] = useState("");

  const [list, setlist] = useState(() => {
    try {
      const saved = localStorage.getItem("Reacttodo");
      if (!saved || saved === "undefined") return [];
      return JSON.parse(saved);
    } catch (error) {
      console.error("Error parsing localStorage:", error);
      return [];
    }
  });

  const [completed, adjustComp] = useState([]);

  const handleInputValue = (value) => {
    setValue(value);
  };

  const handleListItems = () => {
    if (!value) {
      return;
    }
    if (list.includes(value)) {
      setValue("");
      return;
    }
    setlist((prevTask) => [...prevTask, value]);
    setValue("");
  };

  localStorage.setItem("Reacttodo", JSON.stringify(list));

  const deleteLi = (elem) => {
    let updatedList = list.filter((item) => item !== elem);
    setlist(updatedList);
  };

  const handleComplete = (elem) => {
    if (completed.includes(elem)) {
      adjustComp(completed.filter((i) => i !== elem));
    } else {
      adjustComp([...completed, elem]);
    }
  };
  return (
    <div className="container">
      <div className="head">
        <span className="logo">
          <FcTodoList />
        </span>
        <h1>To-Do-List App</h1>
      </div>
      <div>
        <input
          type="text"
          autoComplete="off"
          placeholder="Enter Taske"
          value={value}
          onChange={(event) => handleInputValue(event.target.value)}
        />
        <button type="submit" onClick={handleListItems}>
          Add Taske
        </button>
      </div>
      <div>
        <ul className="listContainer">
          {list.map((elem, index) => {
            return (
              <li key={index}>
                <div className={completed.includes(elem) ? "linethrough" : ""}>
                  {elem}
                </div>
                <div>
                  <button onClick={() => handleComplete(elem)}>
                    <TiTickOutline />
                  </button>
                  <button onClick={() => deleteLi(elem)}>
                    <MdDeleteOutline />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
