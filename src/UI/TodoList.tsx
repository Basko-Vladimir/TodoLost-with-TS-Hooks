import React, {useState, ChangeEvent} from 'react';
import '../App.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {TaskType} from '../Types/commonTypes';
import {AddItemFrom} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox} from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';

export type TodoListPropsType = {
    title: string
    todoId: string
    tasks: Array<TaskType>
    deleteTask: (todoId: string, taskId: string) => void
    addTask: (value: string, todoId: string) => void
    changeTaskStatus: (todoId: string, taskId: string, status: boolean) => void
    changeTaskTitle: (todoId: string, taskId: string, newTitle: string) => void
    deleteTodoList: (todoId: string) => void
    changeTodoTitle: (todoId: string, newTitle: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    const [filter, setFilter] = useState<string | null>('All');
    let filteredTasks = props.tasks;

    if (filter === 'Active') {
        filteredTasks = props.tasks.filter(t => !t.isDone)
    } else if (filter === 'Completed') {
        filteredTasks = props.tasks.filter(t => t.isDone)
    }

    const filterTasks = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilter(e.currentTarget.textContent)
    }

    const addTaskToTodo = (value: string) => {
        props.addTask(value, props.todoId)
    }

    const changeTodoTitle = (newTitle: string) => {
        props.changeTodoTitle(props.todoId, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoTitle}/>
                <IconButton color="secondary" size={'small'}
                            onClick={() => props.deleteTodoList(props.todoId)}><DeleteForeverIcon/></IconButton>
            </h3>
            <AddItemFrom addItem={addTaskToTodo}/>
            <ul>
                {
                    filteredTasks.map(task => {
                        const changeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todoId, task.id, e.currentTarget.checked)
                        }

                        const changeTaskTitle = (newTitle: string) => {
                            props.changeTaskTitle(props.todoId, task.id, newTitle)
                        }

                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <Checkbox icon={<RadioButtonUncheckedIcon fontSize="small"/>}
                                      checkedIcon={<OfflinePinIcon fontSize="small"/>} checked={task.isDone}
                                      onChange={changeCheckbox} color={'primary'}/>
                            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                            <IconButton color="secondary" size={'small'}
                                        onClick={() => props.deleteTask(props.todoId, task.id)}>
                                <DeleteForeverIcon/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <ButtonGroup color={'primary'}>
                    <Button onClick={filterTasks} variant={filter === 'All' ? 'contained' : 'outlined'}>All</Button>
                    <Button onClick={filterTasks}
                            variant={filter === 'Active' ? 'contained' : 'outlined'}>Active</Button>
                    <Button onClick={filterTasks}
                            variant={filter === 'Completed' ? 'contained' : 'outlined'}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}