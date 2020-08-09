import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemFrom: React.FC<AddItemFormPropsType> = React.memo((props) => {
    const {addItem} = props;

    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<null | string>(null);

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    const onAddItem = () => {
        if (!inputValue.trim()) {
            setError('Title is required!')
        } else {
            addItem(inputValue);
            setInputValue('');
        }
    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        e.charCode === 13 && onAddItem()
    }

    return <div>
        <TextField value={inputValue} onChange={changeInputValue} error={!!error} helperText={error}
                   onKeyPress={onKeyPress} variant={'outlined'} label={'Title'} size={'small'}/>
        <IconButton color="primary" onClick={onAddItem}>
            <AddBox/>
        </IconButton>
    </div>
})