import React from 'react';
import './App.css';
import {TodoList} from './TodoList';

export function App() {
    const tasks1 = [
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS & TS', isDone: false},
        {id: 3, title: 'React & Redux', isDone: true}
    ]

    const tasks2 = [
        {id: 1, title: 'Hello world!', isDone: true},
        {id: 2, title: 'Yo yo', isDone: true},
        {id: 3, title: 'I\'m happy', isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks1}/>
            <TodoList title={'Songs'} tasks={tasks2}/>
        </div>
    );
}


