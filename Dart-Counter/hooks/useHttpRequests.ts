export default () =>{

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

    const postAsync = async (url:string, body:any) => {
        const response = await fetch(url, {
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "fairestdb.p.rapidapi.com",
            "x-rapideapi-key": "apikey",
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify(body)
        })
        const data = await response.json();
        return data;
    }

    return{
        getAsync,
        postAsync
    }
}