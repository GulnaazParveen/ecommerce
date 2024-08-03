// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // Correct import
import { composeWithDevTools } from "redux-devtools-extension";
import {

  productDetailsReducer,
  productsReducer,
} from "./reducers/productReducers"; // Correct reducer import
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer, // Ensure the reducer name matches here
  user:userReducer
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
