import {Component} from "react";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const SetState = (action, Component, data) => {
    switch (action) {
        case 'waiting':
            return <Skeleton/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }

}
export default SetState;