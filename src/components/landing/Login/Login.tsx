import * as React from 'react';
import {ILoginState} from './ILoginState';
import {ILoginProps} from './ILoginProps';
import styles from '../Landing/Landing.module.scss';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBModalFooter, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import ApiService from "../../../service/ApiService";
import AuthService from "../../../service/auth";
import {Redirect} from 'react-router-dom';

class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            success: false,
            error: '',
            loading: false
        };
    }

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value} as any);
    };

    onSubmit = (e: any) => {
        this.setState({
            error: ''
        });
        e.preventDefault();
        e.stopPropagation();

        if (!this.validate())
            return;
        this.tryLogin();
    };

    private tryLogin() {
        ApiService
            .post("/login", {
                username: this.state.username,
                password: this.state.password
            })
            .then(this.handleSuccess)
            .catch(this.handleError);
    }

    handleSuccess = (res: any) => {
        AuthService.saveUserDetails(res.data);
        this.setState({
            success: true
        });
    };

    handleError = (error: any) => {
        this.setState({loading: false});
        if (error && error.response && error.response.data && error.response.data.message) {
            this.setState({error: error.response.data.message});
        } else {
            this.setState({error: 'Please try again.'});
        }
    };

    private validate(): boolean {
        if (!this.state.username) {
            this.setState({
                error: 'Please enter your username.'
            });
            return false;
        }
        if (!this.state.password) {
            this.setState({
                error: 'Please enter your password'
            });
            return false;
        }
        return true
    }

    public render(): JSX.Element {
        if (this.state.success) {
            return (
                <Redirect to={{
                    pathname: "/home",
                }}/>
            );
        }

        return (
            <MDBRow className="h-100 justify-content-center align-items-center">
                <MDBCol md="5">
                    <MDBCard>
                        <MDBCardBody className="mx-4">
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5">
                                    <strong>Sign in</strong>
                                </h3>
                            </div>
                            <MDBInput label="Your username" group type="text" validate error="wrong"
                                      success="right" onChange={this.onChange} name="username"/>
                            <MDBInput label="Your password" group type="password" validate
                                      containerClass="mb-0" onChange={this.onChange} name="password"/>
                            <div className="text-center mb-3">
                                <MDBBtn type="button" color="blue" rounded className="btn-block z-depth-1a"
                                        onClick={this.onSubmit}>
                                    Sign in
                                </MDBBtn>
                            </div>
                            <label className={styles.error}>{this.state.error}</label>
                        </MDBCardBody>
                        <MDBModalFooter className="mx-5 pt-3 mb-1">
                            <p className="font-small grey-text d-flex justify-content-end">
                                Not a member?<Link className="blue-text ml-1" to="/register">Signup </Link>
                            </p>
                        </MDBModalFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        );
    }
}

export default Login;
