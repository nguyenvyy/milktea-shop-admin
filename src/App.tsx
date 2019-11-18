import React, { Suspense } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.scss';
import { configStore } from './redux/store';
import { Loading } from './components/common/Loading/Loading';
import { RouteWithSubRoutes } from './routes/RouteWithSubRoutes';
import { routes } from './config/route-config';
let store = configStore();
const App: React.FC = () => {


  return (
    <div className="App">
      <Provider store={store}>
      <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              {routes.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))}
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
