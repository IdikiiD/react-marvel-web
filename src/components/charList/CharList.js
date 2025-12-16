
import {useState, useEffect, useRef, useCallback, memo} from "react";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import './charList.scss';


import useMarvelService from "../../server/Server";
import SetState from "../../utils/setState";

const CharList = memo(({onCharSelected}) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const {setProcess,process , getAllCharacters} = useMarvelService();

    const itemRefs = useRef([]);  // Хук должен быть на верхнем уровне компонента

    useEffect(() => {
        onRequest(offset)
    }, [])

    const onRequest = useCallback( (offset) => {
        onCharListLoading()
        getAllCharacters(offset)
            .then(onCharListLoaded).then(()=> setProcess('confirmed'))

    },[getAllCharacters])

    const onCharListLoading = () => {
        setNewItemLoading(true)
    };

    const onCharListLoaded =  (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }



    const focusOnItem =  (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    const items = renderItems(charList);


    return (
        <div className="char__list">
            {SetState(process, () => renderItems(charList), charList)}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? "none" : "block"}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
})
export default CharList;