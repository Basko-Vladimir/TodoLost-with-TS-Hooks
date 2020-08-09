import React, {useState} from 'react';
import './App.css';
import {TodoList} from './UI/TodoList';
import {TodoListType, TaskStateType} from './Types/commonTypes';
import {v1} from 'uuid';
import {AddItemFrom} from './UI/AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, Grid, Paper} from '@material-ui/core'
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';


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
        const newTasks = {...tasks, [todoId]: tasks[todoId].filter(task => task.id !== taskId)};
        setTasks(newTasks);
    }

    const addTask = (newValue: string, todoId: string) => {
        const newTask = {id: v1(), title: newValue, isDone: false};
        const newTasks = {...tasks, [todoId]: [newTask, ...tasks[todoId]]}
        setTasks(newTasks);
    }

    const changeTaskStatus = (todoId: string, taskId: string, status: boolean) => {
        const newTasks = {
            ...tasks, [todoId]: tasks[todoId]
                .map(t => t.id === taskId ? {...t, isDone: status} : t)
        }
        setTasks(newTasks);
    }

    const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
        const newTasks = {
            ...tasks, [todoId]: tasks[todoId]
                .map(t => t.id === taskId ? {...t, title: newTitle} : t)
        };
        setTasks(newTasks);
    }

    const deleteTodoList = (todoId: string) => {
        const newTodoLists = todoLists.filter(todo => todo.id !== todoId);
        setTodoLists(newTodoLists);
        delete tasks[todoId];
        setTasks({...tasks});
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1();
        const newTodoList = {id: newTodoListId, title, filter: 'All'}
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({...tasks, [newTodoListId]: []})
    }

    const changeTodoTitle = (todoId: string, newTitle: string) => {
        const newTodoLists = todoLists.map(todo => todo.id === todoId ? {...todo, title: newTitle} : todo);
        setTodoLists(newTodoLists);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemFrom addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(todo => {
                            return (
                                <Grid item>
                                    <Paper elevation={3} style={{padding: '20px'}}>
                                        <TodoList key={todo.id} todoId={todo.id} title={todo.title}
                                                  tasks={tasks[todo.id]} deleteTask={deleteTask}
                                                  addTask={addTask} changeTaskStatus={changeTaskStatus}
                                                  deleteTodoList={deleteTodoList}
                                                  changeTaskTitle={changeTaskTitle}
                                                  changeTodoTitle={changeTodoTitle}/>
                                    </Paper>

                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


