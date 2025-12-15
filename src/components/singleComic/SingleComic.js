import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../server/Server";
import {NavLink, useParams} from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../../spinner/Spinner";

const SingleComic = () => {

    const [comictData, setComictData] = useState(null);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {loading, error, getComic} = useMarvelService();
    const {id} = useParams();

    useEffect(() => {
        onRequest(id)
    }, [id])

    const onRequest = (id) => {
        getComic(id)
            .then(onComictLoaded)

    }
    const onComictLoaded = (comictData) => {
        setComictData(comictData);
    }

    const renderItems = (comictData) => {
        const {name, description, pageCount, language, price} = comictData
    }
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null

    const content = !(loading || error || !comictData) ? renderItems(comictData) : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SingleComic;