import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = React.memo( (props: EditableSpanType) => {
    console.log('EditableSpan')

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return editMode
        ? <TextField value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onClick={activateEditMode}>{props.title}</span>
}
)
