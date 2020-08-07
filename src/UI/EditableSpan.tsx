import React, {ChangeEvent, useState} from 'react';

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
        ? <input type={'text'} autoFocus value={inputValue}
                 onBlur={deactivateEditMode}
                 onChange={onChangeInputValue}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
})