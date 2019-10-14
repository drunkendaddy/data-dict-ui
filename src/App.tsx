import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Landing from "./components/landing/Landing/Landing";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import PrivateRoute from "./routes/privateRoute";
import Home from "./components/Home/Home";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/home" component={Home}/>
                <Route path="/" component={Landing}/>
                {/*<Route path="*" component={App}/>*/}
            </Switch>
        </BrowserRouter>
    );
};

export default App;
