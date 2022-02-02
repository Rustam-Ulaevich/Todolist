import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValueType='All'|'Active'|'Completed'

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "VueJS", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValueType>('All')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(f => f.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string){
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeFilter = (value: FilterValueType) =>{
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(f => !f.isDone)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(f => f.isDone)
    }

       return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
