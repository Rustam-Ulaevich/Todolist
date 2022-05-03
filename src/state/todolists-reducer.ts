import {TodolistType} from "../App";
import {v1} from "uuid";

export type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: "All"}]

        }
        case 'CHANGE-TODOLIST-TITLE': {
            return {
                ...state
            }
        }
        default:
            throw new Error("I don't understand this action type")
    }
}
