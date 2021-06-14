import React from 'react';
import TodoItem from './TodoItem';
import propTypes from 'prop-types';

function TodoList({ todoList = [], onDelete = () => {} }) {
  return (
    <ul className="list">
      {todoList.map(({ _id, description, isDone }, index) => (
        <TodoItem key={_id} todo={{ _id, description, isDone }} onDelete={onDelete} />
      ))}
    </ul>
  );
}
TodoList.propType = {
  todoList: propTypes.array,
  onDelete: propTypes.func,
};
export default TodoList;
