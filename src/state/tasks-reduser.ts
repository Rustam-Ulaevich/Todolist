import {TasksStateType} from "../App";

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
export  type ChangeStatusActionType = {
    type: 'CHANGE STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
export type ChangeTaskActionType = {
    type: 'CHANGE TASK TITLE'
    todolistId: string
    taskId: string
    title: string
}

type ActionTasksType = RemoveTaskActionType | AddTaskActionType | ChangeStatusActionType | ChangeTaskActionType

export const RemoveTaskAC = (id: string, todolistId: string):RemoveTaskActionType => {
    return {type:'REMOVE-TASK', taskId: id, todolistId:todolistId}
}

export const tasksReduser = (state: TasksStateType, action: ActionTasksType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {}
             // let tasks = state[todolistId];
             // let filteredTasks = tasks.filter(f => f.id !== id);
             // tasksObj[todolistId] = filteredTasks;
             //  {...tasksObj};
        case 'ADD TASK':
            return {...state, state};
        case 'CHANGE STATUS':
            return {...state};
        case 'CHANGE TASK TITLE':
            return {...state};
        default: return {...state};

    }
}
