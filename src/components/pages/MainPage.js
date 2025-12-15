import {useCallback, useState} from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import decoration from '../../resources/img/vision.png';

export const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = useCallback((id) => {
        setSelectedChar(id)
    },[])

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}  />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharSearchForm/>
                </ErrorBoundary>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </div>
        </>
    )
}

export default MainPage;