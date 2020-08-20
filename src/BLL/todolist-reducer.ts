import {TodoListType} from '../Types/commonTypes';

export const REMOVE_TODOLIST = 'todoList/todoListReducer/REMOVE_TODOLIST';
export const ADD_TODOLIST = 'todoList/todoListReducer/ADD_TODOLIST';
export const CHANGE_TODOLIST = 'todoList/todoListReducer/CHANGE_TODOLIST';
export const CHANGE_TODOLIST_FILTER = 'todoList/todoListReducer/CHANGE_TODOLIST_FILTER';

export const todoListReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return [
                ...state.filter( todo => todo.id !== action.id)
            ]
        case ADD_TODOLIST:
            return [
                ...state,
                action.newTodo
            ]
        case CHANGE_TODOLIST:
            return [
                ...state.map(todo => {
                    return todo.id === action.id ? {...todo, title: action.newTitle} : todo
                })
            ]
        case CHANGE_TODOLIST_FILTER:
            return [
                ...state.map(todo => {
                    return todo.id === action.id ? {...todo, filter: action.newFilter} : todo
                })
            ]
        default: throw new Error('I don\'t understand this type');
    }
}

type ActionType = RemoveTodoType | AddTodoType | ChangeTodoType | ChangeTodoFilterType;

type RemoveTodoType = ReturnType<typeof removeTodo>
export const removeTodo = (id: string) => ({type: REMOVE_TODOLIST, id} as const)

type AddTodoType = ReturnType<typeof addTodo>
export const addTodo = (newTodo: TodoListType) => ({type: ADD_TODOLIST, newTodo} as const)

type ChangeTodoType = ReturnType<typeof changeTodo>
export const changeTodo = (id: string, newTitle: string) => ({type: CHANGE_TODOLIST, id, newTitle} as const)

type ChangeTodoFilterType = ReturnType<typeof changeTodoFilter>
export const changeTodoFilter = (id: string, newFilter: string) => ({type: CHANGE_TODOLIST_FILTER, id, newFilter} as const)