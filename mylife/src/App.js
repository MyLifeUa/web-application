import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './components/Home/Header/Header';

// import views router
import viewsRouter from './routers/viewsRouter';

function App() {
    const hist = createBrowserHistory();

    return (
        <div id="app">
            <Router history={hist}>
                <Switch>
                    {viewsRouter.map((page) => {
                        return <Route path={page.path} component={page.component} />
                    })}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
