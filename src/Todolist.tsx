import React, {useState} from 'react';
import {filterType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number)=> void
}

export function Todolist(props: PropsType) {
    const [filterValue, setFilterValue] = useState<filterType>('All')
    let isDoneTrue = props.tasks
    if (filterValue === 'Active') {
        isDoneTrue = props.tasks.filter(f => f.isDone)
    }
    if (filterValue === 'Completed') {
        isDoneTrue = props.tasks.filter(f => !f.isDone)
    }
    const filteredTasks = (value: filterType) =>{
        setFilterValue(value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {isDoneTrue.map(t => {
                return (
                <li key={t.id}>
                    <button onClick={()=> props.removeTask(t.id)}>x</button>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                </li>
                )
            })
            }
        </ul>
        <div>
            <button onClick={()=> filteredTasks('All')}>All</button>
            <button onClick={()=> filteredTasks('Active')}>Active</button>
            <button onClick={()=> filteredTasks('Completed')}>Completed</button>

        </div>
    </div>
}
