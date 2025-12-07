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
        return (
            <div className="single-comic">
                <img src={xMen} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comictData.name}</h2>
                    <p className="single-comic__descr">{comictData.description}</p>
                    <p className="single-comic__descr">{comictData.pageCount}</p>
                    <p className="single-comic__descr">{comictData.language}</p>
                    <div className="single-comic__price">{comictData.price}</div>
                </div>
                <NavLink end to={"/comics"}  className="single-comic__back">Back to all</NavLink>
            </div>
        )
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