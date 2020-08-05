import React, {useState} from 'react';
import './App.css';
import {TodoList} from './UI/TodoList';
import {TodoListType, TaskStateType} from './Types/commonTypes';
import {v1} from 'uuid';

export function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId1,
            title: 'What to learn',
            filter: 'All'
        },
        {
            id: todoListId2,
            title: 'Videos',
            filter: 'All',
        }
    ]);

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS & TS', isDone: false},
            {id: v1(), title: 'React & Redux', isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Reducers', isDone: true},
            {id: v1(), title: 'Unit testing', isDone: false},
            {id: v1(), title: 'OOP', isDone: true}
        ],
    })

    const deleteTask = (todoId: string, taskId: string) => {
        const newTasks = {...tasks, [todoId]: tasks[todoId].filter( task => task.id !== taskId)};
        setTasks(newTasks);
    }

    const addTask = (todoId: string, newValue: string) => {
        const newTask = {id: v1(), title: newValue, isDone: false};
        const newTasks = {...tasks, [todoId]: [newTask, ...tasks[todoId]] }
        setTasks(newTasks);
    }

    const changeTaskStatus = (todoId: string, taskId: string, status: boolean) => {
        const newTasks = {...tasks, [todoId]: tasks[todoId].map( task => {
                return task.id === taskId ? {...task, isDone: status} : task
            })}
            setTasks(newTasks);
    }

    const deleteTodoList = (todoId: string) => {
        const newTodoLists = todoLists.filter( todo => todo.id !== todoId);
        setTodoLists(newTodoLists);
        delete tasks[todoId];
        setTasks({...tasks});
    }

    return (
        <div className="App">
            {
                todoLists.map( todo => <TodoList key={todo.id} todoId={todo.id} title={todo.title}
                                                 tasks={tasks[todo.id]} deleteTask={deleteTask}
                                                 addTask={addTask} changeTaskStatus={changeTaskStatus}
                                                 deleteTodoList={deleteTodoList} />)
            }
        </div>
    );
}


