import {useEffect, useState} from "react";
import ErrorMessage from '../errorMessage/ErrorMessage';
import {useParams} from "react-router-dom";
import useMarvelService from "../../server/Server";
import Spinner from "../../spinner/Spinner";
import clearError from "../../server/Server";
import AppBanner from "../appBanner/AppBanner";
import SetState from "../../utils/setState";
const SinglePage = ({Component , dataType}) => {
    const {id} = useParams()
    const [data, setData] = useState(null);

    const {process, getCharacter, getComic} = useMarvelService();

    useEffect(() => {
        onRequest()
    }, [id])

    const onRequest = () => {


        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case'character':
                getCharacter(id).then(onDataLoaded);
                break;
        }
    }



    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {SetState(process, ()=><Component data={data}/>, data)}
        </>

    )
}
export default SinglePage;