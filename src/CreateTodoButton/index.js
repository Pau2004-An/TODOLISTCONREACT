import './TodoButton.css';

function CreateTodoButton({ setOpenModal }) {
  return (
    <button 
      className="CreateTodoButton"
      onClick={() => setOpenModal(true)}
    >
      Crear tarea
    </button>
  );
}

export { CreateTodoButton };
