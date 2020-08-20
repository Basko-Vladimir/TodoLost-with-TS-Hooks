
export const INCREMENT_AGE = 'todoList/userReducer/INCREMENT_AGE';
export const INCREMENT_CHILDREN_COUNT = 'todoList/userReducer/INCREMENT_CHILDREN_COUNT';
export const CHANGE_NAME = 'todoList/userReducer/CHANGE_NAME';


type StateType = {
    age: number
    childrenCount: number
    name: string
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case INCREMENT_AGE:
            return {
                ...state,
                age: state.age + 1
            }
        case INCREMENT_CHILDREN_COUNT:
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case CHANGE_NAME:
            return {
                ...state,
                name: 'Oleg'
            }
        default: throw new Error('I don\'t understand this type');
    }
}

type ActionType = {
    type: string
    [key: string]: any
}

// const changeName = (newName: string) => ({type: CHANGE_NAME, newName} as const )
