import "./todosList.css";
import React, { useRef, useState, MouseEvent } from "react";
import { FiPlus } from "react-icons/fi";
import TodoItem, { TodoItemProps } from "../todoItem/TodoItem";
import {
  getFromLocalStorage,
  setInLocalStorage,
} from "../../utils/storageUtils";

const TODOS_KEY = "TODOS";

function TodosListComponent() {
  const [todos, setTodos] = useState<TodoItemProps[]>(
    () => (getFromLocalStorage(TODOS_KEY) as TodoItemProps[]) ?? []
  );
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const renderTodos = () => {
    return todos.map((todo, index) => {
      const { isCompleted, content } = todo;
      return (
        <TodoItem
          {...{ isCompleted, content }}
          key={index}
          index={index}
          onDelete={onDeleteItem}
          onUpdate={onUpdateItem}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      );
    });
  };

  const onAddItem = () => {
    !isFocused &&
      setTodos((state) => [...state, { isCompleted: false, content: "" }]);
  };

  const onDeleteItem = (index: number) => {
    const temp = [...todos];
    temp.splice(index, 1);
    console.log(temp);
    setTodos(temp);
  };

  const onUpdateItem = (index: number, check: boolean, content: string) => {
    const temp = [...todos];
    temp[index].isCompleted = check;
    temp[index].content = content;
    setTodos(temp);
    setInLocalStorage(TODOS_KEY, temp);
  };

  const handleClickInEmptySpace = (event: MouseEvent) => {
    if (containerRef.current) {
      // click inside todos-container
      const clickedInsideContainer = containerRef.current.contains(
        event.target as Node
      );
      // click on todo item
      const clickedOnTodoItem = (event.target as HTMLElement).closest(
        ".todo-item-container"
      );
      if (clickedInsideContainer && !clickedOnTodoItem) {
        onAddItem();
      }
    }
  };
  return (
    <div className="container" onClick={handleClickInEmptySpace}>
      <h2 className="title">To Do's</h2>
      {todos.length > 0 ? (
        <div className="todos-container" ref={containerRef}>
          {renderTodos()}
        </div>
      ) : (
        <div className="no-content">
          <p>All Reminders Completed</p>
        </div>
      )}
      <div className="new-reminder-container" onClick={onAddItem}>
        <FiPlus size={25} color="white" />
      </div>
    </div>
  );
}

export default TodosListComponent;
