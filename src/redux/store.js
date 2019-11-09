import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/root-reducer';


export const configStore = (preloadedState) => {
    const middlware = [
        thunk
    ]

    const middlwareEnhancer = applyMiddleware(...middlware);
    const enhancer = [
        middlwareEnhancer
    ]
    let devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    if (devTool) {
        enhancer.push(devTool)
    }

    const composEnhancer = compose(...enhancer);
    const store = createStore(rootReducer, composEnhancer);
    return store;
}