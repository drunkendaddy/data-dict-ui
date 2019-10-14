export interface ISignUpState {
    name: String;
    username: String;
    password: String;
    confirmPass: String;
    error: String;
    success: boolean;
    loading: boolean,
    redirect: boolean
}
