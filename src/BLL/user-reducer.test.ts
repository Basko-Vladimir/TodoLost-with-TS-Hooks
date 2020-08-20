import {userReducer, INCREMENT_AGE, INCREMENT_CHILDREN_COUNT, CHANGE_NAME} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 1, name: 'Petr'};
    const endState = userReducer(startState, {type: INCREMENT_AGE});

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(1)
})

test('user reducer should increment only children count', () => {
    const startState = {age: 20, childrenCount: 1, name: 'Petr'};
    const endState = userReducer(startState, {type: INCREMENT_CHILDREN_COUNT});

    expect(endState.childrenCount).toBe(2)
})

test('user reducer should changes user name', () => {
    const startState = {age: 20, childrenCount: 1, name: 'Petr'};
    const endState = userReducer(startState, {type: CHANGE_NAME, name: 'Oleg'});

    expect(endState.name).toBe('Oleg')
})