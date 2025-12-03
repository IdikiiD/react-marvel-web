

const MarvelService = () =>  {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=a59d4f3c86d00be5489803bebb31aef9'
    const _baseOffset = 210
    const getResource = async (url) =>{
        let res = await fetch(url)

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await getResource(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        console.log('API Response:', res)
        return res.data.results.map(_transformCaracter);
    }

    const getCharacter = async (id) => {
        const res = await getResource(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCaracter(res.data.results[0])
    }

    const _transformCaracter = (char)=>{
        return{
            id: char.id,
            name:char.name,
            description:char.description ? ` ${char.description.slice(0,210)}...`: 'There is no description about hero',
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            comics: char.comics.items
        }

    }
    return { getAllCharacters, getCharacter }

}

export default MarvelService