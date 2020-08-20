import {v1} from 'uuid';
import {TodoListType} from '../Types/commonTypes';
import {todoListReducer, removeTodo, addTodo, changeTodo,
    changeTodoFilter} from './todolist-reducer';


test('correct todoList should be removed', () => {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, filter: 'All', title: 'Todo_1'},
        {id: todoListId2, filter: 'All', title: 'Todo_2'}
    ]

    const endState = todoListReducer( startState, removeTodo(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todoList should be added', () => {
    const todoId1 = v1();
    const todoId2 = v1();
    const todoId3 = v1();

    const startState: Array<TodoListType> = [
        {id: todoId1, filter: 'All', title: 'Todo_1'},
        {id: todoId2, filter: 'All', title: 'Todo_2'}
    ]

    const newTodo: TodoListType = {id: todoId3, title: 'NewTodo', filter: 'All'};

    const endState = todoListReducer( startState, addTodo(newTodo))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('NewTodo')

})

test ('correct todolist should be changes title', () => {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const newTitle = 'NewTitle'

    const startState: Array<TodoListType> = [
        {id: todoListId1, filter: 'All', title: 'Todo_1'},
        {id: todoListId2, filter: 'All', title: 'Todo_2'}
    ]

    const endState = todoListReducer(startState, changeTodo(todoListId1, newTitle))

    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe('Todo_2');
});

test ('correct filter of todolist should be changed', () => {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const newFilter = 'newFilter'

    const startState: Array<TodoListType> = [
        {id: todoListId1, filter: 'All', title: 'Todo_1'},
        {id: todoListId2, filter: 'All', title: 'Todo_2'}
    ]

    const endState = todoListReducer(startState, changeTodoFilter(todoListId1, newFilter))

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe('All');
})
