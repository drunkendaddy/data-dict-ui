export interface IAddVariablesState {
    open: boolean;
    varName: string;
    category: string;
    type: string;
    description: string;
    lower: number;
    upper: number;
    required: boolean;
    units: string;
    forms: string[];
    error: string
}

export class Variable {

    constructor(id: String, variableName: string, category: string, crfDataType: string, description: string, valueLowerLimit: number, valueUpperLimit: number, isRequired: boolean, Units: string, FormName: string[]) {
        this._id = id;
        this.variableName = variableName;
        this.category = category;
        this.crfDataType = crfDataType;
        this.description = description;
        this.valueLowerLimit = valueLowerLimit;
        this.valueUpperLimit = valueUpperLimit;
        this.isRequired = isRequired;
        this.Units = Units;
        this.FormName = FormName;
    }

    _id: String;
    variableName: string;
    category: string;
    crfDataType: string;
    description: string;
    valueLowerLimit: number;
    valueUpperLimit: number;
    isRequired: boolean;
    Units: string;
    FormName: string[];
}
