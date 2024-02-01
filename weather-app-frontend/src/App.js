
import React from '';
import { BRouter as Router, Route, Switch } from '-router-dom';import Home from './components/';
import Weather from './components/Weather';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

const API_BASE_URL = 'http://localhost:3000/api';

function authenticate(username, password) {
  return axios.post(`${API_BASE_URL}/auth`, { username, password })
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error(error);
      return false;
    });
}

function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    return Promise.resolve(false);
  }
  return axios.get(`${API_BASE_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error(error);
      return false;
    });
}

function App() {
  return (
    <Router>
      <div>
        {/* Navigation/header */}
        <header>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/weather">Weather</a>
              </li>
              <li>
                <button onClick={() => {
                  checkAuth().then(isAuthenticated => {
                    if (isAuthenticated) {
                      localStorage.removeItem('token');
                    } else {
                      authenticate('myuser', 'mypassword').then(() => {
                        window.location.href = '/profile';
                      });
                    }
                  });
                }
                }>
                  {checkAuth().then(isAuthenticated => isAuthenticated ? 'Logout' : 'Login')}
                </button>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main content area */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/weather" component={Weather} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>

        {/* Footer or other global components */}
        <footer>
          &copy; 2023 My App
        </footer>
      </div>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => {
      checkAuth().then(isAuthenticated => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          window.location.href = '/';
        }
      });
      return null;
    }} />
  );
}

export default App;