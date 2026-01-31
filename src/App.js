import React from "react";
import { TodoCounter } from "./CreateTodoCounter";
import { TodoSearch } from "./CraeteTodoSearch";
import { TodoList } from "./CreateTodoList";
import { TodoItem } from "./CreateTodoItem";
import { CreateTodoButton } from "./CreateTodoButton";
import { TodoLayout } from "./CreateTodoLayout";
import { CreateTodoModal } from "./CreateTodoModal";
import "./TodoSection.css";
import "./CreateTodo.css";
import "./CreateTodoLayout/TodoLayout.css";
import imagen5 from "./imagen5.png";


const defaultTodos = [
  { text: "Cortar cebolla", completed: true },
  { text: "Tomar el Curso de Intro a React.js", completed: false },
  { text: "Hacer la tarea de Cálculo", completed: true },
  { text: "Ir a clases de piano", completed: false },
  { text: "Ir al cine", completed: false },
];

// Guardar en localStorage
const localStorageTodos = localStorage.getItem('TODOS_V1');

let parsedTodos;

if (!localStorageTodos) {
  localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
  parsedTodos = defaultTodos;
} else {
  parsedTodos = JSON.parse(localStorageTodos);
}


function App() {
  const [todos, setTodos] = React.useState(parsedTodos);
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [newTodoValue, setNewTodoValue] = React.useState('');

  // Guardar en localStorage cuando los todos cambian
  React.useEffect(() => {
  localStorage.setItem('TODOS_V1', JSON.stringify(todos));
}, [todos]);


  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const toggleTodo = (text) => {
  const newTodos = [...todos];
  const index = newTodos.findIndex(todo => todo.text === text);
  newTodos[index].completed = !newTodos[index].completed;
  setTodos(newTodos);
};


  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todo => todo.text === text);
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const addTodo = (text) => {
  if (!text.trim()) return;

  const newTodos = [...todos];
  newTodos.push({
    text,
    completed: false,
  });

  setTodos(newTodos);
};


  return (
    <TodoLayout>
      <div className="AppContainer">
        {/* COLUMNA IZQUIERDA */}
        <section className="CreateTodo Card">
          <h2>Crear nueva tarea</h2>
          
          <CreateTodoButton setOpenModal={setOpenModal} />
          {openModal && (
            <CreateTodoModal>
              <h3>Nueva tarea</h3>
              <input
                placeholder="Escribe tu tarea..."
                value={newTodoValue}
                onChange={(event) => setNewTodoValue(event.target.value)}
              />
              <div className="ModalButtons">
                <button
                  onClick={() => {
                    addTodo(newTodoValue);
                    setNewTodoValue("");
                    setOpenModal(false);
                  }}
                >
                  Crear
                </button>
                <button onClick={() => setOpenModal(false)}>Cancelar</button>
              </div>
            </CreateTodoModal>
          )}

          <div className="CreateTodo-image">
            <img src={imagen5} alt="Todo illustration" />
          </div>
        </section>

        {/* COLUMNA DERECHA */}
        <section className="TodoSection Card">
          <h2 className="tareas">Tus tareas</h2>
          <TodoCounter completed={completedTodos} total={totalTodos} />
          <TodoSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <TodoList>
            {searchedTodos.map((todo) => (
              <TodoItem
                key={todo.text}
                text={todo.text}
                completed={todo.completed}
                onComplete={() => toggleTodo(todo.text)}
                onDelete={() => deleteTodo(todo.text)}
              />
            ))}
          </TodoList>
        </section>
      </div>
    </TodoLayout>
  );
}

export default App;
