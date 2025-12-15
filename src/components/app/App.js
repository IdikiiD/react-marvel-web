import {lazy, Suspense, useCallback, useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";

import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Spinner from "../../spinner/Spinner";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import SinglePage from "../pages/SinglePage";
import singleCharacterLayout from "../pages/SingleCharacterLayout/SingleCharacterLayout";
import SingleCharacterLayout from "../pages/SingleCharacterLayout/SingleCharacterLayout";



const CharList = lazy(()=> import('../charList/CharList'));
const ComicsList = lazy(()=> import('../comicsList/ComicsList'));
const SingleComic = lazy(()=> import('../singleComic/SingleComic'));

const SingleComicPreload = ()=> import('../singleComic/SingleComic');

const ComicsListPreload = () => import('../comicsList/ComicsList')




const App = () => {

    const [selectedChar, setSelectedChar] = useState(null);


    const onCharSelected = useCallback((id) => {
        setSelectedChar(id)
    },[])


    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader onMouse={ComicsListPreload}/>
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
                        }/>
                        <Route path="/comics" element={<ComicsList onCharSelected={onCharSelected} onMouse = {SingleComicPreload}/>}/>
                        <Route path="/comics/:id" element={<SingleComic />} />
                        <Route exact path={"/characters/:id"} element ={<SinglePage Component={SingleCharacterLayout} dataType={'character'}/>}/>


                    </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;