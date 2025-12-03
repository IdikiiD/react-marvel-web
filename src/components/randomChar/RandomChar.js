import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../server/Server";
import {Component, useEffect, useRef, useState} from "react";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const [loading , setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateChar();
    },[])



    const marvelService = useRef(new MarvelService());

    const updateChar = () => {

            setLoading(true);
            setError(false);
            const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

            marvelService.current
                .getCharacter(id)
                .then(onCharLoaded)
                .catch(errorMes);


    }
    const onCharLoaded = (char) => {
        setChar(char)
        setLoading(false);
        setError(false);
    }

    const errorMes = () =>{
        setLoading(false);
        setError(true);
    }




        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(loading || error) ? <View char={char}/> : null

    const View = ({char}) =>{
        const {name, description, thumbnail, homepage, wiki} = char
        return (
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>)
    }

        return (
            <div className="randomchar">
                {spinner}
                {content}
                {errorMessage}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )



}




export default RandomChar;