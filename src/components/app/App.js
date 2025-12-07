import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

const App = () => {

    const [selectedChar, setSelectedChar] = useState(null);


    const onCharSelected = (id) => {
        setSelectedChar(id)
    }


    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <ErrorBoundary>
                                    <RandomChar/>
                                </ErrorBoundary>
                                <div className="char__content">
                                    <ErrorBoundary>
                                        <CharList onCharSelected={onCharSelected}/>
                                    </ErrorBoundary>
                                    <ErrorBoundary>
                                        <CharInfo charId={selectedChar}/>
                                    </ErrorBoundary>
                                    <img className="bg-decoration" src={decoration} alt="vision"/>
                                </div>
                            </>
                        }/>
                        <Route path="/comics" element={<ComicsList onCharSelected={onCharSelected}/>}/>
                        <Route path="/comics/:id" element={<SingleComic />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;