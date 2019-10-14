import * as React from 'react';
import {IUsersState, User} from './IUsersState';
import {IUsersProps} from './IUsersProps';
import styles from './Users.module.scss';
import {MDBCard, MDBCardHeader, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import ApiService from "../../../service/ApiService";
import AuthService from "../../../service/auth";

class Users extends React.Component<IUsersProps, IUsersState> {

    constructor(props: IUsersProps) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount(): void {
        ApiService.get('/users')
            .then(res => {
                console.log(res);
                this.setState({
                    users: res.data as User[]
                });
            })
            .catch(err => {

            });
    }

    handleRoleChange = (e: any, u: User) => {
        u.role = e.target.value;
        this.forceUpdate();
        ApiService.put('/users/role', JSON.stringify(u))
            .then(value => console.log(value))
            .catch(err => console.log(err));
    };

    public render(): JSX.Element {
        return (
            <div className={styles.users}>
                <MDBCard>
                    <MDBCardHeader tag="h3" className="font-weight-bold text-uppercase py-4">
                        Users
                    </MDBCardHeader>
                    <MDBTable>
                        <MDBTableHead color="primary-color" textWhite>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Role</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                this.state.users.map((user, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            <select value={user.role} onChange={(e) => this.handleRoleChange(e, user)}
                                                    disabled={user.username === AuthService.getUser().username}>
                                                <option value="ADMIN">Admin</option>
                                                <option value="VIEWER">Viewer</option>
                                                <option value="CONTRIBUTOR">Contributor</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            }
                        </MDBTableBody>
                    </MDBTable>
                </MDBCard>
            </div>
        );
    }

}

export default Users;
