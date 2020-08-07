import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from '@material-ui/core';

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
        <input value={inputValue} onChange={changeInputValue} className={error ? 'error' : ''}
               onKeyPress={onKeyPress}/>
        <Button variant="contained" color="primary"
                size={'small'}
                style={{marginLeft: '10px'}}
                onClick={onAddItem}>+</Button>
        {error && <div style={{color: 'red'}}>{error}</div>}
    </div>
})