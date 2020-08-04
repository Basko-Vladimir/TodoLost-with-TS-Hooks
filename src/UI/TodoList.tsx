import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {TasksType} from '../Types/commonTypes';

export type TodoListType = {
    title: string
    tasks: Array<TasksType>
    deleteTask: (id:number) => void
}

export const TodoList: React.FC<TodoListType> = (props) => {
    const {title, tasks, deleteTask} = props;

    const [filter, setFilter] = useState<string| null>('All')
    let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    } else if (filter === 'Completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const filterTasks = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilter(e.currentTarget.textContent)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
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