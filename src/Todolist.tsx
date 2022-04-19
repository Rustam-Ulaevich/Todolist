import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

    const  onAllClickHandler = () => {
        props.changeFilter('All', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('Active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('Completed', props.id)
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
        </h3>

            <button onClick={removeTodolist}>x</button>

        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {props.removeTask(t.id, props.id)}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (value: string) => {
                        props.changeTaskTitleStatus(t.id, value, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' :''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'All' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'Active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}

