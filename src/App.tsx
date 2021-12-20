import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
//add filter and useState
export type filterType='All'|'Active'|'Completed'

function App() {

    const [tasks, setTask] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: true},
        {id: 5, title: "Redux", isDone: false},
        {id: 6, title: "VueJS", isDone: false}
    ])




    const removeTask = (id: number) => {
    setTask(tasks.filter(f => f.id !== id))
}

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
