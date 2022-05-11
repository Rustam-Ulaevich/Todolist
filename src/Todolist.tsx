import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string)=> void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask:(title: string, todolistId: string) =>void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitleStatus: (taskId: string, title: string, todolistId: string) => void
    changeTitleTodolist: (id: string, title: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const onChangeTitleHandler = (title: string) => {
        props.changeTitleTodolist(props.id, title)
    }


    function addTask(title: string) {
        props.addTask(title, props.id)
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
                    const onRemoveHandler = () => {props.removeTask(t.id, props.id)}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (value: string) => {
                        props.changeTaskTitleStatus(t.id, value, props.id)
                    }

                    return <div key={t.id} className={t.isDone ? 'is-done' :''}>
                        <Checkbox
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={removeTodolist}>
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
}

