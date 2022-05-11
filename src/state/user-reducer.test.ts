import {StateType, userReducer} from "./user-reducer";


test('user reduser should increment only age', () => {
    const startState: StateType = {age: 37, childrenCount: 3, name: 'Rustam'}

    const endState = userReducer(startState,{type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(38);
    expect(endState.childrenCount).toBe(3)
})

test('user reduser should increment only children count', () => {
    const startState: StateType = {age: 37, childrenCount: 3, name: 'Rustam'}

    const endState = userReducer(startState,{type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(4)
    expect(endState.age).toBe(37)
})

test('user reduser should change name of user', () => {
    const startState: StateType = {age: 37, childrenCount: 3, name: 'Rustam'}
    const newName = 'Victor'

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe('Victor')
    expect(startState.name).toBe('Rustam')
    expect(endState.age).toBe(37)
})

