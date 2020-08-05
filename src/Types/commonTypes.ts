
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: string
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

