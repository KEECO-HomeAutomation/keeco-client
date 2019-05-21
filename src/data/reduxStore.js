import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appDuck from './duck';
import dashboardDuck from '../scenes/Dashboard/data/duck';

const rootReducer = combineReducers({
	app: appDuck,
	dashboard: dashboardDuck
});

const persistedReducer = persistReducer({ key: 'root', storage }, rootReducer);

const configureStore = () => {
	let store = createStore(persistedReducer);
	let persistor = persistStore(store);

	return { store, persistor };
};

export default configureStore;
