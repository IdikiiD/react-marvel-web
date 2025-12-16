import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../server/Server";
import {NavLink, useParams} from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../../spinner/Spinner";
import setState from "../../utils/setState";

const SingleComic = () => {

    const [comictData, setComictData] = useState(null);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {process,setProcess, getComic} = useMarvelService();
    const {id} = useParams();

    useEffect(() => {
        onRequest(id)
    }, [id])

    const onRequest = (id) => {
        getComic(id)
            .then(onComictLoaded).then(()=> setProcess('confirmed'));

    }
    const onComictLoaded = (comictData) => {
        setComictData(comictData);
    }

    const renderItems = (comictData) => {
        const {name, description, pageCount, language, price} = comictData
    }


    return (
        <>
            {setState(process, () => renderItems(comictData), comictData)}
        </>
    )
}

export default SingleComic;