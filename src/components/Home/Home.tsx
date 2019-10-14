import * as React from 'react';
import {IHomeState} from './IHomeState';
import {IHomeProps} from './IHomeProps';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Variables from "../Variables/Variables";
import Users from "../admin/Users/Users";
import AuthService from "../../service/auth";
import styles from "./Home.module.scss";

class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: false,
            selection: 0,
            logout: false,
            role: ''
        };
    }

    componentDidMount(): void {
        const user = AuthService.getUser();
        if (!user) {
            this.setState({
                logout: true
            });
            return;
        }
        this.setState({
            role: user.role
        });

        let selection: number = 0;
        if (this.props.location.pathname === '/home')
            selection = 1;
        else if (this.props.location.pathname === '/home/users')
            selection = 2;
        this.setState({
            selection: selection
        });
    }

    toggleCollapse = () => {
        // this.setState({isOpen: !this.state.isOpen});
    };

    navChange = (e: any) => {
        let selection: number = 0;
        if (e.target.name === 'variable')
            selection = 1;
        else if (e.target.name === 'users')
            selection = 2;
        this.setState({
            selection: selection
        });
    };

    public render(): JSX.Element {
        if (this.state.logout)
            return <Redirect to="/login"/>;

        const style = {
            position: 'absolute',
            willChange: 'transform',
            top: '0px',
            left: '0px',
            transform: 'translate3d(-5px, 40px, 0px)',
        };

        // @ts-ignore
        return (
            <Router>
                <MDBNavbar color="blue" dark expand="md">
                    <MDBNavbarBrand>
                        <strong className="white-text">Dictionary App</strong>
                    </MDBNavbarBrand>
                    <MDBCollapse id="navbarCollapse3" navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active={this.state.selection === 1}>
                                <MDBNavLink name="variable" to="/home" onClick={this.navChange}>Variables</MDBNavLink>
                            </MDBNavItem>
                            {this.state.role === 'ADMIN' &&
                            <MDBNavItem active={this.state.selection === 2}>
                              <MDBNavLink name="users" to="/home/users"
                                          onClick={this.navChange}>Users</MDBNavLink>
                            </MDBNavItem>
                            }
                        </MDBNavbarNav>
                        <MDBNavbarNav right>

                            <MDBNavItem>
                                <MDBNavbarBrand>
                                    <span className="white-text">{AuthService.getUser().name}</span>
                                </MDBNavbarBrand>
                            </MDBNavItem>

                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user"/>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right={true}>
                                        <MDBDropdownItem onClick={this.logout}>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>

                <div>
                    <Switch>
                        <Route exact path="/home" component={() => <Variables/>}/>
                        <Route exact path="/home/users" component={Users}/>
                    </Switch>
                </div>
            </Router>
        );
    }

    logout = () => {
        AuthService.removeUserDetails();
        this.setState({
            logout: true
        });
    }

}

export default Home;
