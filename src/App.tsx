import React, {useState} from 'react';
import './App.css';
import {TodoList} from './UI/TodoList';
import {TasksType} from './Types/commonTypes';

export function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS & TS', isDone: false},
        {id: 3, title: 'React & Redux', isDone: true},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false}
    ])

    const deleteTask = (taskId: number) => {
        const newTasksList = tasks.filter( task => taskId !==task.id )
        setTasks(newTasksList);
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks} deleteTask={deleteTask}/>
        </div>
    );
}


