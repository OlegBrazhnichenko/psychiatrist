import {combineReducers} from 'redux';
import Cards from 'src/reducers/Cards/reducers';

const reducers = {
   Cards,
};

export default combineReducers(reducers);
