import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _jsonUrl = '/heroes.json'; // путь к JSON в public

    const getAllCharacters = async (offset = 0, limit = 9) => {
        const data = await request(_jsonUrl);
        // имитация offset и limit
        const slice = data.slice(offset, offset + limit);
        return slice.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const data = await request(_jsonUrl);
        const char = data.find(c => c.id === id);
        if (!char) throw new Error("Character not found");
        return _transformCharacter(char);
    };
    const getAllComics = async (offset = 0) => {
        const res = await request(_jsonUrl);
        return res.map(_transformComics);
    }
   const getComic = async (id) =>{
        const res = await request(_jsonUrl);
        const comicID = res.find(c => c.id === +id);
       if (!comicID) throw new Error("Character not found");
        return _transformComics(comicID);
   }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : "There is no description for this character",
            thumbnail: char.thumbnail,
            homepage: char.homepage,
            wiki: char.wiki,
            comics: char.comics,
        };
    };
    const _transformComics = (comics) => {
        console.log('Данные комикса:', comics);  // ← Временно для отладки

        return {
            id: comics.id,
            title: comics.title || comics.name || "Unknown Title",
            description: comics.description || "There is no description",
            pageCount: "No information",
            thumbnail: typeof comics.thumbnail === 'string'
                ? comics.thumbnail
                : (comics.thumbnail?. path
                    ? `${comics.thumbnail.path}.${comics.thumbnail.extension}`
                    : "placeholder.jpg"),
            language: "en-us",
            price: comics.price
                ? `${comics.price}$`
                : "not available",
        };
    };

    return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic };
};

export default useMarvelService;
