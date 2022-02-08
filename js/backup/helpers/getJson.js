const getJson = (url)=>{
    return $.getJSON({
        url,
        async:false,
    }).responseJSON;
}

export default getJson;