import React, {useState, ChangeEvent} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {TasksType} from '../Types/commonTypes';
import {Button} from '@material-ui/core';

export type TodoListType = {
    title: string
    tasks: Array<TasksType>
    deleteTask: (id: string) => void
    addTask: (value: string) => void
}

export const TodoList: React.FC<TodoListType> = (props) => {
    const {title, tasks, deleteTask, addTask} = props;


    const [filter, setFilter] = useState<string| null>('All');
    const [inputValue, setInputValue] = useState<string>('');
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
        e.charCode === 13 && onAddTask();
    }

    const onAddTask = () => {
        addTask(inputValue);
        setInputValue('');
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={inputValue} onChange={changeInputValue} onKeyPress={onKeyPress}/>
                <Button variant="contained" color="primary"
                        size={'small'} style={{marginLeft: '10px'}}
                        onClick={onAddTask}>+</Button>
            </div>
            <ul>
                {
                    filteredTasks.map(task => {
                    return <li key={task.id}>
                               <input type="checkbox" defaultChecked={task.isDone}/>
                               <span>{task.title}</span>
                               <IconButton color="secondary" size={'small'}
                                           onClick={() => deleteTask(task.id)}><DeleteForeverIcon/></IconButton>
                           </li>
                    })
                }
            </ul>
            <div>
                <button onClick={filterTasks}>All</button>
                <button onClick={filterTasks}>Active</button>
                <button onClick={filterTasks}>Completed</button>
            </div>
        </div>
    )
}