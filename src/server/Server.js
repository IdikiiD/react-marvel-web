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

    return { loading, error, clearError, getAllCharacters, getCharacter };
};

export default useMarvelService;
