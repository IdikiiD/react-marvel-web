import {useEffect, useState} from "react";
import ErrorMessage from '../errorMessage/ErrorMessage';
import {useParams} from "react-router-dom";
import useMarvelService from "../../server/Server";
import Spinner from "../../spinner/Spinner";
import clearError from "../../server/Server";
import AppBanner from "../appBanner/AppBanner";
const SinglePage = ({Component , dataType}) => {
    const {id} = useParams()
    const [data, setData] = useState(null);

    const {loading, error, getCharacter, getComic} = useMarvelService();

    useEffect(() => {
        onRequest()
    }, [id])

    const onRequest = () => {


        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case'character':
                getCharacter(id).then(onDataLoaded);
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>

    )
}
export default SinglePage;