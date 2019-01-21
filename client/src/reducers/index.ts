import { combineReducers } from 'redux'
import * as fromCrowd from './CrowdReducers'

/*
    Root state of app
 */
export interface State {
    crowd: fromCrowd.State
}

/*
 * initialState of the app
 */
export const initialState: State = {
    crowd: fromCrowd.initialState
};

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const reducer = combineReducers<State>({
    crowd: fromCrowd.reducer
});