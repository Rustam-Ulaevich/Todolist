import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType='All'|'Active'|'Completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(f => f.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }
    function addTask(title: string, todolistId: string){
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }
    function changeStatus(taskId: string,
                          isDone: boolean,
                          todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find( t => t.id === taskId);
        if(task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }

    }
    function changeFilter(value: FilterValueType, todolistId: string){
        let todolist = todolists.find( tl => tl.id === todolistId);
        if(todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])

    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter( tl => tl.id !== todolistId )
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks(tasksObj)
    }

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "VueJS", isDone: false}],
        [todolistId2]: [
            {id: v1(), title: "Table", isDone: true},
            {id: v1(), title: "Computer", isDone: true}]
    })

    function addTodolist(title: string) {
        let todolist: TodolistType = {id: v1(), title: title, filter: "All"}
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }


       return (
        <div className="App">
            <span>
                <AddItemForm addItem={(title)=>{addTodolist(title)}}/>
            </span>
            <br/>
            {
                todolists.map( (tl) => {

                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'Active'){
                        tasksForTodolist = tasksForTodolist.filter(tl=> !tl.isDone)
                    }
                    if (tl.filter === 'Completed'){
                        tasksForTodolist = tasksForTodolist.filter(tl=> tl.isDone)
                    }
                   return <Todolist
                       key={tl.id}
                       id={tl.id}
                       title={tl.title}
                       tasks={tasksForTodolist}
                       removeTask={removeTask}
                       changeFilter={changeFilter}
                       addTask={addTask}
                       changeTaskStatus={changeStatus}
                       filter={tl.filter}
                       removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
