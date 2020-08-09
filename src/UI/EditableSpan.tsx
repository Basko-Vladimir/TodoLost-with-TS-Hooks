import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanType = {
    title: string
    changeTitle: (value: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = React.memo(({title, changeTitle}) => {
    const [ediMode, setEditMode] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('')

    const activateEditMode = () => {
        setEditMode(true)
        setInputValue(title);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        changeTitle(inputValue);
    }

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return ediMode
        ? <TextField autoFocus value={inputValue} onBlur={deactivateEditMode}
                     onChange={onChangeInputValue} variant={'outlined'} label={'Title'} size={'small'}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
})