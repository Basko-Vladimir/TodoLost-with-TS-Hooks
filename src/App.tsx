import React, {useState} from 'react';
import './App.css';
import {TodoList} from './UI/TodoList';
import {TasksType} from './Types/commonTypes';
import {v1} from 'uuid';

export function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS & TS', isDone: false},
        {id: v1(), title: 'React & Redux', isDone: true},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ]);

    const deleteTask = (taskId: string) => {
        const newTasksList = tasks.filter( task => taskId !== task.id )
        setTasks(newTasksList);
    }

    const addTask = (newValue: string) => {
        // if (newValue.trim() !== '') {
            const newTask = {id: v1(), title: newValue, isDone: false}
            setTasks([newTask, ...tasks]);
        // } else {
        //     setError('Title is required!')
        // }
    }

    const changeTaskStatus = (taskId: string, status: boolean) => {
        const changedTasks = tasks.map( t => {
            if (taskId === t.id) {
                return {...t, isDone: status}
            } else return t
        })
        setTasks(changedTasks);
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks}
                      deleteTask={deleteTask} addTask={addTask} changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}


