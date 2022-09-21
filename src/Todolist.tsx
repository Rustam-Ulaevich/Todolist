import React, {useCallback} from 'react';
import {FilterValueType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValueType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTitleTodolist: (id: string, title: string) => void
    filter: FilterValueType
}

export const Todolist = React.memo( function(props: PropsType) {

    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => dispatch(addTaskAC(props.id, title)), [])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const onChangeTitleHandler = useCallback((title: string) => {
        props.changeTitleTodolist(props.id, title)
    }, [props.changeTitleTodolist, props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)}, [props.changeFilter, props.id])


    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)}, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)}, [props.changeFilter, props.id])

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => <Task todolistId={t.id} task={t}/>)
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
})

