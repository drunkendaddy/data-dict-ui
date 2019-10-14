import * as React from 'react';
import {IVariablesState, Variable} from './IVariablesState';
import {IVariablesProps} from './IVariablesProps';
import styles from './Variables.module.scss';
import {MDBBtn, MDBCard, MDBCardHeader, MDBDataTable} from "mdbreact";
import ApiService from "../../service/ApiService";
import AddVariables from "../AddVariables/AddVariables";
import AuthService from "../../service/auth";

class Variables extends React.Component<IVariablesProps, IVariablesState> {

    role = '';

    constructor(props: IVariablesProps) {
        super(props);
        this.state = {
            variables: [],
            variableToEdit: null,
            edit: false,
            openModal: false,
            readOnly: true
        };
    }

    componentDidMount(): void {
        this.role = AuthService.getUser().role;
        ApiService.get('/variables')
            .then(res => this.setState({
                variables: res.data as Variable[]
            }));
    }

    public render(): JSX.Element {
        const data = this.getData();
        return (
            <div className={styles.variables}>
                <MDBCard>
                    <MDBCardHeader tag="h3" className="font-weight-bold text-uppercase py-4">
                        Variables
                        {
                            AuthService.getUser().role === 'ADMIN' &&
                            <MDBBtn color="success" className="float-right" onClick={this.handleAddNew}>Add New</MDBBtn>
                        }
                    </MDBCardHeader>
                    <MDBDataTable striped bordered hover data={data}/>
                </MDBCard>

                {this.state.openModal && <AddVariables close={this.closeModal} open={this.state.openModal}
                                                       variable={this.state.variableToEdit || undefined}
                                                       edit={this.state.edit} editFlag={this.state.edit}
                                                       readOnly={this.state.readOnly}/>}
            </div>
        );
    }

    private getData() {

        let rows: any[] = [];
        this.state.variables.forEach(value => {
            const map = new Map();
            map.set('variableName', value.variableName);
            map.set('category', value.category);
            map.set('crfDataType', value.crfDataType);
            map.set('valueLowerLimit', value.valueLowerLimit);
            map.set('valueUpperLimit', value.valueUpperLimit);
            map.set('Units', value.Units);
            map.set('isRequired', value.isRequired + "");
            map.set('actions',
                <div>
                    <MDBBtn size="sm" id="id1"
                            onClick={(e) => this.handleClick(e, value)}>View</MDBBtn>
                    {
                        (this.role === 'ADMIN' || this.role === 'CONTRIBUTOR') &&
                        <MDBBtn size="sm" id="id1" color="warning"
                                onClick={() => this.handleEdit(value)}>Edit</MDBBtn>
                    }
                    {
                        this.role === 'ADMIN' &&
                        <MDBBtn size="sm" id="id2" color="danger"
                                onClick={() => this.handleDelete(value)}>Delete</MDBBtn>
                    }
                </div>);
            // map.set('clickEvent', (e: any) => this.handleClick(e, value));

            const obj: any = {};
            map.forEach((v, k) => {
                obj[k] = v
            });

            rows.push(obj);
        });

        return {
            columns: [
                {
                    label: 'Variable Name',
                    field: 'variableName',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'CRF Data Type',
                    field: 'crfDataType',
                    sort: 'asc',
                    width: 120
                },
                {
                    label: 'Lower Limit',
                    field: 'valueLowerLimit',
                    sort: 'asc',
                    width: 120
                },
                {
                    label: 'Upper Limit',
                    field: 'valueUpperLimit',
                    sort: 'asc',
                    width: 120
                },
                {
                    label: 'Units',
                    field: 'Units',
                    sort: 'asc',
                    width: 180
                },
                {
                    label: 'Required?',
                    field: 'isRequired',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: '',
                    field: 'actions',
                    sort: 'asc',
                    width: 100
                },
            ],
            rows: rows
        }
    }

    private handleClick(e: any, value: Variable) {
        this.setState({
            variableToEdit: value,
            edit: true,
            openModal: true,
            readOnly: true
        });
    }

    handleAddNew = () => {
        this.setState({
            variableToEdit: null,
            edit: false,
            openModal: true,
            readOnly: false
        });
    };

    private handleEdit(value: Variable) {
        console.log('edit');
        this.setState({
            variableToEdit: value,
            edit: true,
            openModal: true,
            readOnly: false
        });
    }

    private handleDelete(value: Variable) {
        ApiService.delete('/variables/' + value._id)
            .then(() => {
                this.setState({
                    variables: this.state.variables.filter(v => {
                        return v._id !== value._id
                    })
                });
            })
            .catch(err => {
                console.log(err)
            });
    }

    closeModal = (obj: any) => {
        if (obj.added) {
            const var1 = this.state.variables;
            var1.push(obj.item as Variable);
            this.setState({
                variables: var1,
                openModal: false
            });
            return;
        }
        if (obj.edit) {
            const var1 = this.state.variables;
            for (let i = 0; i < var1.length; i++) {
                if (var1[i]._id === obj.item._id) {
                    var1[i] = obj.item;
                    break;
                }
            }

            this.setState({
                variables: var1,
                openModal: false
            });
            return;
        }
        this.setState({openModal: false});
    };
}

export default Variables;
