import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from "../../server/Server";
import {memo, useCallback, useEffect, useState} from "react";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../../spinner/Spinner";
import {NavLink} from "react-router-dom";

const ComicsList = memo(({onCharSelected,onMouse}) => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = useCallback((offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    },[getAllComics, onComicsListLoaded])

   const onComicsListLoaded =useCallback( (newComicsList) => {
        if (newComicsList.length < 8){
            setComicsEnded(true);
        }
        setComicsList(prevList => [...prevList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(prevOffset => prevOffset + 8);
   }, []);

   const renderItems = (arr) => {
        const items = arr.map(item => {
            return (

                 <li className="comics__item" key={item.id}>
                        <NavLink end to={`/comics/${item.id}`} >
                            <img src={uw} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </NavLink>
                    </li>

            )
        })
       return (
           <ul className="comics__grid">
                {items}
              </ul>
       )

   }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null

    const content = !(loading || error || !comicsList) ? renderItems(comicsList) : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? "none" : "block"}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
})




export default ComicsList;