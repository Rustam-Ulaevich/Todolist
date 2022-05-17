import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD TASK'
    todolistId: string
    title: string
}
export  type ChangeTaskStatusActionType = {
    type: 'CHANGE TASK STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE TASK TITLE'
    todolistId: string
    taskId: string
    title: string
}

type ActionTasksType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType


export const removeTaskAC = (taskId: string, todolistId: string):RemoveTaskActionType => {
    return {type:'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (todolistId: string, title: string):AddTaskActionType => {
    return {type:'ADD TASK', todolistId, title}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean,):ChangeTaskStatusActionType => {
    return {type:'CHANGE TASK STATUS', todolistId, taskId, isDone}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string):ChangeTaskTitleActionType => {
    return {type:'CHANGE TASK TITLE', todolistId, taskId, title}
}


export const tasksReducer = (state: TasksStateType, action: ActionTasksType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const endTasks = tasks.filter( t => t.id != action.taskId)
            stateCopy[action.todolistId] = endTasks
            return stateCopy
        }

        case 'ADD TASK': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [{id: v1(), title: action.title, isDone: false}, ...stateCopy[action.todolistId]];;
            return stateCopy;
        }

        case 'CHANGE TASK STATUS':{
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find( t => t.id == action.taskId)
            if(task) {
                task.isDone = action.isDone
            }
            return stateCopy
            }

        case 'CHANGE TASK TITLE': {
                const stateCopy = {...state};
                const tasks = stateCopy[action.todolistId];
                const task = tasks.find(t => t.id == action.taskId);
                if(task) {
                    task.title = action.title
                }
                return stateCopy;
            }

        case 'ADD-TODOLIST' : {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }

        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return  stateCopy
        }
        default: return {...state};

    }
}
