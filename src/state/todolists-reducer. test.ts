import {TodolistType} from "../App";
import {v1} from "uuid";
import {todolistsReducer} from "./todolists-reducer";


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: "All"},
        {id: todolistId2, title: 'What to buy', filter: "All"}
    ]

    const endState = todolistsReducer(startState, {
        type: 'REMOVE-TODOLIST',
        id: todolistId1
    })

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be add', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolist = 'New todolist'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: "All"},
        {id: todolistId2, title: 'What to buy', filter: "All"}
    ]

    const endState = todolistsReducer(startState, {
        type: 'ADD-TODOLIST',
        id: todolistId1
    })

    expect(endState.length).toBe(3)
    expect(endState[endState.length - 1 ].title).toBe(newTodolist)
    expect(endState[endState.length - 1 ].filter).toBe('All')
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: "All"},
        {id: todolistId2, title: 'What to buy', filter: "All"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

