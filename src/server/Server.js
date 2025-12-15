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
        const char = data.find(c => c.id === +id);
        if (!char) throw new Error("Character not found");
        return _transformCharacter(char);
    };
    const getCharacterByName =  async (name) =>{
        const data = await request(_jsonUrl);
        const chars = data.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
        if (chars.length === 0) return [];
        return chars.map(_transformCharacter);
    }
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
    const _transformComics = (comic) => {
        // comic — это объект героя с полем comics (массив)
        const comicNames = comic.comics?.map(c => c.name).join(', ') || comic.name;
        const comicPrice = comic.comics?.[0]?.price ? `${comic.comics[0].price}$` : "not available";

        const thumbnail = typeof comic.thumbnail === 'string'
            ? comic.thumbnail
            : (comic.thumbnail?.path ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` : "placeholder.jpg");

        return {
            id: comic.id,
            name: comicNames,
            description: comic.description || "There is no description",
            pageCount: "No information",
            thumbnail,
            language: "en-us",
            price: comicPrice,
        };
    };
    return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic, getCharacterByName };
};

export default useMarvelService;
