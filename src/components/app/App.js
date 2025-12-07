import {lazy, Suspense, useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";

import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Spinner from "../../spinner/Spinner";



const CharList = lazy(()=> import('../charList/CharList'));
const ComicsList = lazy(()=> import('../comicsList/ComicsList'));
const SingleComic = lazy(()=> import('../singleComic/SingleComic'));

const CharListPreloading = lazy(()=> import('../charList/CharList'));


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
                    <Suspense fallback={<Spinner/>}>
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
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;