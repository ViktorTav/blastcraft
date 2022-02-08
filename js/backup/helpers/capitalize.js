const capitalize = (str)=>{

    const strParts = str.split('-');

    return strParts.map(
        (strPart)=> strPart[0].toUpperCase() + strPart.substring(1)
    ).join(" ");

}

export default capitalize;