import React, {ChangeEvent, useCallback} from 'react';
import {FilterValueType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TasksStateType} from "./AppWithRedux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: TasksStateType
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
    const onChangeTitleHandler = (title: string) => {
        props.changeTitleTodolist(props.id, title)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    let tasksForTodolist = props.tasks;
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(tl => !tl.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(tl => tl.isDone)
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
                props.tasks.map(t => {
                    const onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(props.id, t.id, e.currentTarget.checked))
                    }
                    const onChangeTitleHandler = (value: string) => {
                        dispatch(changeTaskTitleAC(props.id, t.id, value))
                    }

                    return <div key={t.id} className={t.isDone ? 'is-done' :''}>
                        <Checkbox
                               onChange={onChangeHandler}
                               color="primary"
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onRemoveHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
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
