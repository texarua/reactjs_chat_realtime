import { useReducer } from "react"

const initialState = {
    job: '',
    jobs: []
}

const SET_ACTION = 'set_job';
const ADD_ACTION = 'add_job';
const DELETE_ACTION = 'delete_job';

const setJob = payload => {
    return {
        type: SET_ACTION,
        payload
    }
}

const addJob = payload => {
    return {
        type: ADD_ACTION,
        payload
    }
}

const deleteJob = payload => {
    return {
        type: DELETE_ACTION,
        payload
    }
}

const reducer = (state, action) => {
    let newState = {};
    switch (action.type) {
        case SET_ACTION:
            newState = {
                ...state,
                job: action.payload
            }
            break;
        case ADD_ACTION:
            newState = {
                ...state,
                jobs: [...state.jobs, action.payload]
            }
            break;
        case DELETE_ACTION:
            const newJobs = [...state.jobs];
            newJobs.splice(action.payload, 1)
            newState = {
                ...state,
                jobs: newJobs
            }
            break;
        default:
            throw new Error('invalid action');
    }

    return newState;;
}

function TodoReducer() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {job, jobs} = state

    return (
        <div style={{ padding: '0 20px'}}>
            <h3>Todo</h3>
            <input 
                value={job}
                onChange={e => dispatch(setJob(e.target.value))}
            />
            <button onClick={() => dispatch(addJob(job))}>Add</button>
            <ul>
                {jobs.map((item, index) => {
                    return <li key={index}>{item}<span onClick={() => dispatch(deleteJob(index))} style={{cursor: "pointer"}}>&times;</span></li>
                })}
                
            </ul>
        </div>
    )
}

export default TodoReducer