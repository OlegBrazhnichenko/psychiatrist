import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';

import rootReducer from './reducers';

const configureStore = () => {
    return createStore(rootReducer, devToolsEnhancer({ realtime: true }));
};

export default configureStore;