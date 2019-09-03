import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import AuthLayout from "./layouts/Auth.jsx"
import AdminLayout from "./layouts/Admin.jsx"
import "assets/scss/material-dashboard-pro-react.scss"
import './App.scss'

class App extends React.Component {
	render() {
		const App = () => (
			<section className="App">
				<Switch>
					<Route path="/admin" component={AdminLayout} />
					<Route path="/auth" component={AuthLayout} />
					<Redirect from="/" to="/admin/dashboard" />
				</Switch>
			</section>
		)
		return (
			<Provider store={store}>
				<Switch>
					<App />
				</Switch>
			</Provider>
		)
	}
}

export default App
