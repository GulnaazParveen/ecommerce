import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Correct import using named export
import { composeWithDevTools } from "redux-devtools-extension";
import { producDetailSReducer, productsReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  products: productsReducer,
  producDetailS:producDetailSReducer
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
