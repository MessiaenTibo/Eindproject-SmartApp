export default () =>{

    const get = (url:string) => {
        fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "fairestdb.p.rapidapi.com",
            "x-rapidapi-key": "apikey"
        }
        })
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(err => { console.log(err); 
        });
    }

    // make this get asynchronus
    const getAsync = async (url:string) => {
        const response = await fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "fairestdb.p.rapidapi.com",
            "x-rapidapi-key": "apikey"
        }
        })
        const data = await response.json();
        return data;
    }


    return{
        get,
        getAsync
    }
}