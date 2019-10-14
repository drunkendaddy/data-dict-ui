import * as React from 'react';
import {ILandingState} from './ILandingState';
import {ILandingProps} from './ILandingProps';
import styles from './Landing.module.scss';
import Login from "../Login/Login";
import {MDBContainer} from "mdbreact";
import {Switch, Route, Redirect} from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import AuthService from "../../../service/auth";

class Landing extends React.Component<ILandingProps, ILandingState> {

    constructor(props: any) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    componentDidMount(): void {
        const token = AuthService.getToken();
        if (!token) {
            return;
        }
        this.setState({
            redirect: true
        });
    }

    public render(): JSX.Element {
        if (this.state.redirect)
            return (
                <Redirect to={{
                    pathname: '/home',
                    // state: this.state.me
                }}/>
            );

        return (
            <MDBContainer className={styles.landing}>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={SignUp}/>
                    <Redirect from="/" to="/login"/>
                </Switch>
            </MDBContainer>
        );
    }
}

export default Landing;
