import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './components/AuthPage/AuthPage';
import HomePage from './components/HomePage/HomePage';
import NewTripPage from './components/NewTripPage/NewTripPage';
import TripPage from './components/TripPage/TripPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/auth/:type" component={AuthPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/new-trip" component={NewTripPage} />
        <Route path="/trip/:id" component={TripPage} />
        <Route path="*">
          <Redirect to="auth/sign-up" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
