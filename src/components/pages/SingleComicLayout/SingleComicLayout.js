import xMen from "../../../resources/img/x-men.png";
import {NavLink} from "react-router-dom";
import './singleComicLayout.scss';


const SingleComicLayout = (data) => {
    const {name, description, pageCount, language, price, thumbnail} = data
    return(
        <div className="single-comic">
            <img src={xMen} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <NavLink end to={"/comics"}  className="single-comic__back">Back to all</NavLink>
        </div>
    )

}