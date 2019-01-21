export function getDataPage( data, page ){
    const startData = page*10 - 10;
    const finalData = page*10
    return data.slice( startData, finalData );
}

export function numberOfPages( data ){
    return Math.ceil( data.length/10 );
}