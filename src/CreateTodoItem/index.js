import './TodoItem.css';

function TodoItem({ text, completed, onComplete, onDelete }) {
  return (
    <li className={`TodoItem ${completed && 'TodoItem--completed'}`}>
      <span
        className="TodoItem-check"
        onClick={onComplete}
      />
      <p className="TodoItem-text">
        {text}
      </p>
      <span
        className="TodoItem-delete"
        onClick={onDelete}
      >
        ✕
      </span>
    </li>
  );
}

export { TodoItem };
