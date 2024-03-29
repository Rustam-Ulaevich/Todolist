import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])
    const changeTitleTodolist = useCallback (( id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }, [dispatch])
    const changeFilter = useCallback(( filter: FilterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

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
                {
                    todolists.map((tl) => {

                        let allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks

                        return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}} >
                            <Todolist

                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}        //{tasks[tl.id]}
                                changeFilter={changeFilter}
                                removeTodolist={removeTodolist}
                                changeTitleTodolist={changeTitleTodolist}
                                filter={tl.filter}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </Container>
    </div>);
}

export default AppWithRedux;
