import {Variable} from "../Variables/IVariablesState";

export interface IAddVariablesProps {
    variable?: Variable;
    edit: boolean;
    editFlag: boolean;
    open: boolean;
    close: any,
    readOnly: boolean
}
