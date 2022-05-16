import {TasksStateType} from "../App";
import {RemoveTaskAC, tasksReduser} from "./tasks-reduser";

test('remove task', ()=> {

    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "ReactJS", isDone: false}],
        'todolistId2': [
            {id: '1', title: "Table", isDone: true},
            {id: '2', title: "Computer", isDone: true}]
    }

    const endState = tasksReduser(startState, RemoveTaskAC('2', 'todolistId2'), )

    expect(endState['todolistId2'].length).toBe(1)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()


})
