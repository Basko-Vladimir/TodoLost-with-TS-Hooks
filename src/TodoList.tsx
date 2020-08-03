import React from 'react';

type TodoList = {
    title: string
    tasks: Array<{id: number, title: string, isDone: boolean}>
}

export function TodoList(props: TodoList) {
    const {title, tasks} = props;

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                { tasks.map( task => <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>) }
                {/*<li><input type="checkbox" checked={tasks[0].isDone}/> <span>HTML&CSS</span></li>*/}
                {/*<li><input type="checkbox" checked={tasks[1].isDone}/> <span>JS</span></li>*/}
                {/*<li><input type="checkbox" checked={tasks[2].isDone}/> <span>React</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}