import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import {memo, useCallback, useEffect, useState} from "react";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useComicVineService from "../../server/Server";
import setState from "../../utils/setState";

const RandomChar = memo(() => {
    const [char, setChar] = useState(null);

    const { setProcess,process, getCharacter,clearError } = useComicVineService();



    const onCharLoaded = useCallback((char) => {
        setChar(char);
    },[]);

    const updateChar = () => {
        const allowedIds = [1, 2, 3];
        const id = allowedIds[Math.floor(Math.random() * allowedIds.length)];
        setChar(null);
        clearError()

        getCharacter(id).then(onCharLoaded).then(()=> setProcess('confirmed'))
    };
    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);
        return () => clearInterval(timerId);
    }, []);



    return (
        <div className="randomchar">
            {setState(process, ()=><View char={char} />, char)}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
});
const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main"><div className="inner">homepage</div></a>
                    <a href={wiki} className="button button__secondary"><div className="inner">wiki</div></a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
