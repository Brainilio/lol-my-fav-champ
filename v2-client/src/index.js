import React from "react"
import ReactDOM from "react-dom"
import App from "./container/App"
import { BrowserRouter } from "react-router-dom"
import * as serviceWorker from "./serviceWorker"
import "./styles/app.scss"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import champReducer from "./store/reducers/champs"
import authReducer from "./store/reducers/auth"

// redux tools
const composeEnhancers =
	(process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose

//combine reducers
const rootReducer = combineReducers({
	champs: champReducer,
	auth: authReducer,
})

//create store and compose applymiddleware + devtools
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,

	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
