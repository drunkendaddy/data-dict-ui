import {BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';

interface MatchParams {
    location: string;
    name: string;
}

export interface IHomeProps extends RouteComponentProps<MatchParams> {
}
