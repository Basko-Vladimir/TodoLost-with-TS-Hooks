import React, {useState, ChangeEvent} from 'react';
import '../App.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {TaskType} from '../Types/commonTypes';
import {Button} from '@material-ui/core';

export type TodoListPropsType = {
    title: string
    todoId: string
    tasks: Array<TaskType>
    deleteTask: (todoId: string, taskId: string) => void
    addTask: (todoId: string, value: string) => void
    changeTaskStatus: (todoId:string, taskId: string, status: boolean) => void
    deleteTodoList: (todoId: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const {title, todoId, tasks, deleteTask, addTask, changeTaskStatus, deleteTodoList} = props;

    const [filter, setFilter] = useState<string | null>('All');
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<null | string>(null);
    let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    } else if (filter === 'Completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const filterTasks = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilter(e.currentTarget.textContent)
    }

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        e.charCode === 13 && onAddTask();
    }

    const onAddTask = () => {
        if (!inputValue.trim()) {
            setError('Title is required!')
        } else {
            addTask(todoId, inputValue);
            setInputValue('');
        }
    }

    return (
        <div>
            <h3>{title}
                <IconButton color="secondary" size={'small'}
                            onClick={() => deleteTodoList(todoId)}><DeleteForeverIcon/></IconButton>
            </h3>
            <div>
                <input value={inputValue} onChange={changeInputValue} className={error ? 'error' : ''}
                       onKeyPress={onKeyPress}/>
                <Button variant="contained" color="primary"
                        size={'small'} style={{marginLeft: '10px'}}
                        onClick={onAddTask}>+</Button>
                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>
            <ul>
                {
                    filteredTasks.map(task => {
                        const changeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todoId, task.id, e.currentTarget.checked)
                        }
                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeCheckbox}/>
                            <span>{task.title}</span>
                            <IconButton color="secondary" size={'small'}
                                        onClick={() => deleteTask(todoId, task.id)}><DeleteForeverIcon/></IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={filterTasks} className={filter === 'All' ? 'active-filter' : ''}>All</button>
                <button onClick={filterTasks} className={filter === 'Active' ? 'active-filter' : ''}>Active</button>
                <button onClick={filterTasks} className={filter === 'Completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}