const getJson = async (url) => {
    return (await fetch(url)).json();
};

export default getJson;
