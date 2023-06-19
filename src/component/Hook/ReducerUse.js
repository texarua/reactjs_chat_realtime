import { useReducer, useState } from "react";

const ACTION_UP = 'up';
const ACTION_DOWN = 'down';

const initialState = 0;

const reducer = (state, action) => {
    switch(action) {
        case ACTION_UP:
            return state = state + 1;
        case ACTION_DOWN:
            return state = state - 1;
        default:
            throw new Error('invalid action');   
    }
}

function ReducerUse() {
    // const [count, setCount] = useState(0);
    const [count, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <div>
                <h1>{count}</h1>
            </div>
            {/* <div>
                <button onClick={(e) => setCount(count + 1)}>UP</button>
                <button onClick={(e) => setCount(count - 1)}>DOWN</button>
            </div> */}
            <div>
                <button onClick={(e) => dispatch(ACTION_UP)}>UP</button>
                <button onClick={(e) => dispatch(ACTION_DOWN)}>DOWN</button>
            </div>
        </div>
    )
}

export default ReducerUse