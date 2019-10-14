import * as React from 'react';
import {ISignUpState} from './ISignUpState';
import {ISignUpProps} from './ISignUpProps';
import styles from './SignUp.module.scss';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBModalFooter,
    MDBModal,
    MDBModalHeader, MDBModalBody
} from 'mdbreact';
import {Link} from "react-router-dom";
import ApiService from "../../../service/ApiService";
import {Redirect} from 'react-router-dom';

class SignUp extends React.Component<ISignUpProps, ISignUpState> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            confirmPass: '',
            error: '',
            success: false,
            loading: false,
            redirect: false
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

        this.invokeSignUp();
    };

    private invokeSignUp() {
        this.setState({
            loading: true
        });
        ApiService.post("/register", JSON.stringify({
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        })).then(res => {
            console.log(res);
            this.setState({
                success: true
            });
        }).catch(error => {
            this.setState({loading: false});
            if (error && error.response && error.response.data && error.response.data.message) {
                this.setState({error: error.response.data.message, loading: false});
            } else {
                this.setState({error: 'Please try again.'});
            }
        });
    }

    private validate(): boolean {
        if (!this.state.name || !this.state.username || !this.state.password || !this.state.confirmPass) {
            this.setState({
                error: 'All fields are mandatory.'
            });
            return false;
        }
        if (this.state.username.length < 6) {
            this.setState({
                error: 'Username must have at least 6 characters.'
            });
            return false;
        }
        if (this.state.password.length < 6) {
            this.setState({
                error: 'Password must have at least 6 characters.'
            });
            return false;
        }
        if (this.state.password !== this.state.confirmPass) {
            this.setState({
                error: 'Passwords do not match.'
            });
            return false;
        }
        return true;
    }

    public render(): JSX.Element {
        if (this.state.redirect)
            return <Redirect to="/login"/>;

        return (
            <MDBRow className="h-100 justify-content-center align-items-center">
                <MDBCol md="5">
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={this.onSubmit}>
                                <p className="h4 text-center py-4">Sign up</p>
                                <div className="grey-text">
                                    <MDBInput label="Your name" icon="user" group type="text" validate
                                              error="wrong" success="right" name="name" onChange={this.onChange}
                                              disabled={this.state.loading}/>
                                    <MDBInput label="Your username" icon="envelope" group type="text" validate
                                              error="wrong" success="right" name="username" onChange={this.onChange}
                                              disabled={this.state.loading}/>
                                    <MDBInput label="Your password" icon="exclamation-triangle" group
                                              type="password" validate error="wrong" success="right"
                                              name="password" onChange={this.onChange}
                                              disabled={this.state.loading}/>
                                    <MDBInput label="Confirm your password" icon="lock" group
                                              type="password" validate name="confirmPass" onChange={this.onChange}
                                              disabled={this.state.loading}/>
                                </div>
                                <div className="text-center mb-3">
                                    <MDBBtn type="submit" color="blue" rounded className="btn-block z-depth-1a"
                                            disabled={this.state.loading}>
                                        {this.state.loading ? 'Please wait...' : 'Sign Up'}
                                    </MDBBtn>
                                </div>
                                <label className={styles.error}>{this.state.error}</label>
                            </form>
                        </MDBCardBody>
                        <MDBModalFooter className="mx-5 pt-3 mb-1">
                            <p className="font-small grey-text d-flex justify-content-end">
                                Got an account?<Link className="blue-text ml-1" to="/login">Login</Link>
                            </p>
                        </MDBModalFooter>
                    </MDBCard>
                </MDBCol>

                <MDBModal isOpen={this.state.success}>
                    <MDBModalHeader>Successfully Registered</MDBModalHeader>
                    <MDBModalBody>
                        Please login in with your really registered account.
                    </MDBModalBody>
                    <MDBModalFooter>
                    </MDBModalFooter>
                    <MDBBtn color="primary" onClick={() => this.setState({redirect: true})}>Ok</MDBBtn>
                </MDBModal>
            </MDBRow>
        );
    }

}

export default SignUp;
