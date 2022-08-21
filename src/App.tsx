import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistId: string) {
        // let tasks = tasksObj[todolistId];
        // let filteredTasks = tasks.filter(f => f.id !== id);
        // tasksObj[todolistId] = filteredTasks;
        // setTasks({...tasksObj});
    }
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        // let newTasks = [task, ...tasks];
        // tasksObj[todolistId] = newTasks;
        tasksObj[todolistId] = [task, ...tasks];
        setTasks({...tasksObj});
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }

    }
    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        // let tasks = tasksObj[todolistId]
        // let task = tasks.find(t => t.id === taskId);
        let task = tasksObj[todolistId].find(t => t.id === taskId);
        if (task) {
            task.title = title
            setTasks({...tasksObj})
        }
    }
    function changeTitleTodolist(id: string, title: string) {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }
    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks(tasksObj)
    }
    function addTodolist(title: string) {
        let todolist: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj, [todolist.id]: []
        })
    }

    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todolists, setTodolists] = useState<Array<TodolistType>>([{
        id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}])
    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todolistId2]: [
            {id: v1(), title: "Table", isDone: true},
            {id: v1(), title: "Computer", isDone: true}]
    })

    return (<div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding:'10px'}}>
                    <AddItemForm addItem={(title) => {
                        addTodolist(title)
                    }}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasksObj[tl.id];
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(tl => !tl.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(tl => tl.isDone)
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}} >
                            <Todolist
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
                                changeTaskTitle={changeTaskTitle}
                                changeTitleTodolist={changeTitleTodolist}
                            />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>);
}

export default App;
