import React, {ChangeEvent, useState} from "react";

export type EditableSpanType = {
    title: string
    onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanType) {

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
        ? <input value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onClick={activateEditMode}>{props.title}</span>
}
