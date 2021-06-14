import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { TODOS } from '../utils/api-endpoints';
const TodoList = dynamic(() => import('../components/Todo/TodoList'));
const Home = ({ todos = [] }) => {
  const [todoList, setTodoList] = useState(todos);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    setTodoInput('');
    return () => {};
  }, [todoList]);

  const handleKeyEnter = (e) => {
    if (e.key === 'Enter' && todoInput !== '') {
      setTodoList((prev) => [...prev, { user: 'test', description: e.target.value }]);
      fetch(TODOS, {
        method: 'POST',
        body: JSON.stringify({
          user: 'test',
          description: todoInput,
          isDone: false,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.newRecordId) {
            setTodoList((prev) => [
              ...prev,
              { _id: data.newRecordId, isDone: false, description: todoInput },
            ]);
          }
          e.target.value = '';
        });
    }
  };
  const handleDelete = (todo) => {
    fetch(TODOS, {
      method: 'DELETE',
      body: JSON.stringify(todo),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.deletedId) {
          setTodoList((prev) => prev.filter((todo) => todo._id !== data.deletedId));
        }
      });
  };

  return (
    <>
      <main className="app">
        <nav className="nav">
          <a href="/" className="nav__item active">
            Todos
          </a>
          {/* <a href="/" className="nav__item">
            Pokemons
          </a> */}
        </nav>

        <div className="add">
          <input
            placeholder="+ Add todo item"
            type="text"
            className="add__input"
            onChange={(e) => setTodoInput(e.target.value)}
            onKeyDown={handleKeyEnter}
          />
        </div>
        <TodoList todoList={todoList} onDelete={handleDelete} />
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/todos');
  const { data } = await res.json();
  return {
    props: {
      todos: data,
    },
  };
}

TodoList.propTypes = {
  todos: propTypes.array,
};

export default Home;
