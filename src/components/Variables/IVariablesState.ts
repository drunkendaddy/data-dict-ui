type Nullable<T> = T | null;

export interface IVariablesState {
    variables: Variable[];
    variableToEdit: Nullable<Variable>;
    edit: boolean;
    openModal: boolean;
    readOnly: boolean
}

export interface Variable {
    _id: string;
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
