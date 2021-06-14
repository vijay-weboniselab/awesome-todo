import React, { useState } from 'react';
import propTypes from 'prop-types';

function TodoItem({ todo, onDelete = () => {} }) {
  let { isComplete, description, user } = todo || {};
  const [done, setDone] = useState(isComplete);
  return (
    <li className={done ? 'item done' : 'item'}>
      <label className="item__checkbox item__checkbox--1">
        <input type="checkbox" onClick={(e) => setDone(e.target.checked)} />
        <i className="fas fa-check"></i>
      </label>
      {description}
      <button
        className="item__delete"
        onClick={() => {
          onDelete(todo);
        }}>
        x
      </button>
    </li>
  );
}
TodoItem.propTypes = {
  todos: propTypes.object,
  onDelete: propTypes.func,
};
export default TodoItem;
