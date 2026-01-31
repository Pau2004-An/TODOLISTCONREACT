import './CreateTodoModal.css';

function CreateTodoModal({ children }) {
  return (
    <div className="ModalBackground">
      <div className="ModalContent">
        {children}
      </div>
    </div>
  );
}

export { CreateTodoModal };

