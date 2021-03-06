import {compose, createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {saveToLocalStorage, loadFromLocalStorage} from "./localStorage";
import {userReducer} from "./reducers/userReducer";
import {institutionReducer} from "./reducers/institutionReducer";
import {imagesReducer} from "./reducers/imagesReducer";
import {reviewsReducer} from "./reducers/reviewsReducer";

export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
const rootReducer = combineReducers({
    router: connectRouter(history),
    users: userReducer,
    institutions: institutionReducer,
    images: imagesReducer,
    reviews: reviewsReducer
});

const persistedState = loadFromLocalStorage();

const middleware = [thunkMiddleware, routerMiddleware(history)];
const enhancers = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    })
});

export default store;