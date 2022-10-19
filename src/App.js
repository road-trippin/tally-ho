import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './components/AuthPage/AuthPage';
import HomePage from './components/HomePage/HomePage';
import NewTripPage from './components/NewTripPage/NewTripPage';
import TripPage from './components/TripPage/TripPage';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong.</p>
      <pre>{ error.message }</pre>
      <p>Please refresh the page.</p>
    </div>
  );
};

function App() {
  return (
    <div>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}>
        <Switch>
          <Route path="/auth/:type" component={AuthPage} />
          <Route exact path="/" component={HomePage} />
          <Route path="/new-trip" component={NewTripPage} />
          <Route path="/trip/:id" component={TripPage} />
          <Route path="*">
            <Redirect to="/auth/sign-up" />
          </Route>
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

export default App;
