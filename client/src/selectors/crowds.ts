import {State} from '../reducers'
import {createSelector} from 'reselect'


const getCrowdState = ((state: State) => state.crowd);

export const getCrowd = createSelector([getCrowdState], s => s.crowd);