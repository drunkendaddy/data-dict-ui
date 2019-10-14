import * as React from 'react';
import {IAddVariablesState, Variable} from './IAddVariablesState';
import {IAddVariablesProps} from './IAddVariablesProps';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import ChipInput from 'material-ui-chip-input'
import ApiService from "../../service/ApiService";
import styles from "../landing/SignUp/SignUp.module.scss";

class AddVariables extends React.Component<IAddVariablesProps, IAddVariablesState> {

    var1 = 0;

    public data = {
        category: "",
        description: "",
        forms: [],
        lower: '',
        required: "",
        type: "",
        units: "",
        upper: '',
        varName: "",
    };

    constructor(props: IAddVariablesProps) {
        super(props);
        this.state = {
            category: "",
            description: "",
            forms: [],
            lower: 0,
            required: false,
            type: "",
            units: "",
            upper: 0,
            varName: "",
            open: false,
            error: ''
        };
    }

    componentDidMount(): void {
        console.log('mount')
    }

    onInputChange = (e: any) => {
        // @ts-ignore
        this.data[e.target.name] = e.target.value;
        this.forceUpdate();
    };

    onSelectChange = (e: any) => {
        // @ts-ignore
        this.data[e.target.name] = e.target.value;
        this.forceUpdate();
    };

    onChipsChange = (chips: any) => {
        this.data.forms = chips;
        this.forceUpdate();
    };

    assignDataForEdit() {
        this.data.forms = [];
        if (!this.props.variable)
            return;
        this.data.varName = this.props.variable.variableName;
        this.data.description = this.props.variable.description;
        this.data.lower = this.props.variable.valueLowerLimit + "";
        this.data.upper = this.props.variable.valueUpperLimit + "";
        this.data.units = this.props.variable.Units;
        this.data.category = this.props.variable.category;
        this.data.type = this.props.variable.crfDataType;
        this.data.required = this.props.variable.isRequired + "";
        // @ts-ignore
        this.data.forms = this.props.variable.FormName;

        this.var1 = this.var1 + 1;
    }

    public render(): JSX.Element {
        console.log(this.props);

        if (this.props.edit && +this.var1 === 0) {
            this.assignDataForEdit();
        }

        return (
            <MDBModal isOpen={this.props.open} size="lg">
                <MDBModalHeader>{this.props.edit ? 'Edit ' : "Add "}Variable</MDBModalHeader>
                <MDBModalBody>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="formGroupExampleInput"
                                   placeholder="Variable Name" name="varName" onChange={this.onInputChange}
                                   value={this.data.varName} disabled={this.props.readOnly}/>
                        </div>

                        <div className="form-group">
                            <select className="browser-default custom-select" name="category"
                                    onChange={this.onSelectChange} value={this.data.category}
                                    disabled={this.props.readOnly}>
                                <option value="">Choose Category</option>
                                <option value="Calculated">Calculated</option>
                                <option value="Original">Original</option>
                                <option value="Derived">Derived</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="browser-default custom-select" name="type"
                                    onChange={this.onSelectChange} value={this.data.type}
                                    disabled={this.props.readOnly}>
                                <option value="">Choose CRF Data Type</option>
                                <option value="Number">Number</option>
                                <option value="Text">Text</option>
                                <option value="Date">Date</option>
                                <option value="Time">Time</option>
                            </select>
                        </div>

                        <div className="form-group">
                          <textarea className="form-control" id="exampleFormControlTextarea1"
                                    value={this.data.description} disabled={this.props.readOnly}
                                    placeholder="Description" name="description" onChange={this.onSelectChange}/>
                        </div>

                        <div className="form-group">
                            <input type="number" className="form-control" id="formGroupExampleInput"
                                   placeholder="Lower Limit" name="lower" onChange={this.onSelectChange}
                                   value={this.data.lower} disabled={this.props.readOnly}/>
                        </div>

                        <div className="form-group">
                            <input type="number" className="form-control" id="formGroupExampleInput"
                                   placeholder="Upper Limit" name="upper" onChange={this.onSelectChange}
                                   value={this.data.upper} disabled={this.props.readOnly}/>
                        </div>

                        <div className="form-group">
                            <select className="browser-default custom-select" name="required"
                                    onChange={this.onInputChange} value={this.data.required}
                                    disabled={this.props.readOnly}>
                                <option value="">Is required?</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" id="formGroupExampleInput"
                                   placeholder="Units" name="units" onChange={this.onSelectChange}
                                   value={this.data.units} disabled={this.props.readOnly}/>
                        </div>

                        <div className="form-group">
                            <ChipInput className="form-control" placeholder="Form Name (Type and press enter)"
                                       onChange={(chips) => this.onChipsChange(chips)} value={this.data.forms}
                                       disabled={this.props.readOnly}/>
                        </div>

                    </form>
                    <label className={styles.error}>{this.state.error}</label>
                </MDBModalBody>


                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.handleClose}>Close</MDBBtn>
                    {
                        !this.props.readOnly &&
                        <MDBBtn color="primary" onClick={this.handleSubmit}>Save changes</MDBBtn>
                    }

                </MDBModalFooter>
            </MDBModal>
        );
    }

    handleClose = () => {
        this.props.close({
            added: false,
        });
    };

    handleSubmit = (e: any) => {
        this.setState({error: ''});

        e.preventDefault();
        e.stopPropagation();

        if (!this.validate())
            return;

        let _id = '';
        if (this.props.edit && this.props.variable !== undefined)
            _id = this.props.variable._id;
        let var1 = new Variable(_id, this.data.varName, this.data.category, this.data.type,
            this.data.description, +this.data.lower, +this.data.upper, this.data.required === 'true', this.data.units, this.data.forms);

        if (this.props.edit) {
            ApiService.put('/variables/' + _id, JSON.stringify(var1))
                .then(this.handleEditRes)
                .catch(this.handleCatch);
        } else {
            ApiService.post('/variables', JSON.stringify(var1))
                .then(this.handleRes)
                .catch(this.handleCatch);
        }
    };

    handleRes = (res: any) => {
        this.props.close({
            added: true,
            item: res.data
        });
    };

    handleEditRes = (res: any) => {
        this.props.close({
            edit: true,
            item: res.data
        });
    };

    handleCatch = (error: any) => {
        if (error && error.response && error.response.data && error.response.data.message) {
            this.setState({error: error.response.data.message});
        } else {
            this.setState({error: 'Please try again.'});
        }
    };

    validate(): boolean {
        if (!this.data.varName) {
            this.setState({error: 'Variable name is required.'});
            return false;
        }
        if (!this.data.category) {
            this.setState({error: 'Category must be selected.'});
            return false;
        }
        if (!this.data.type) {
            this.setState({error: 'CRF Data Type must be selected.'});
            return false;
        }
        if (!this.data.lower) {
            this.setState({error: 'Lower limit is required.'});
            return false;
        }
        if (!this.data.upper) {
            this.setState({error: 'Upper limit is required.'});
            return false;
        }
        if (!this.data.required) {
            this.setState({error: 'Required must be selected.'});
            return false;
        }
        if (!this.data.units) {
            this.setState({error: 'Units is required.'});
            return false;
        }
        if (typeof this.data.forms === 'undefined' || this.data.forms.length === 0) {
            this.setState({error: 'Enter at least one form name'});
            return false;
        }
        if (+this.data.lower >= +this.data.upper) {
            this.setState({error: 'Lower limit must be less than upper limit.'});
            return false;
        }
        return true;
    }
}

export default AddVariables;
