import { Value } from 'slate';

export function doSearch( text, data ){

    const similarData = data.map(dataArr => {
        return dataArr.reduce((acc, current) => {

            const { title, description } = current.attributes;

            const realDescription = (description[0] === '{' ? (Value.fromJSON(JSON.parse(description))).anchorText.text : description);

            const titleMatch = ( title ? compare( title, text ) : -1 );
            const descriptionMatch = ( realDescription ? compare( realDescription, text ) : -1);
            
            if( titleMatch !== -1 || descriptionMatch !== -1 )
                acc.push(current);
    
            return acc;
            
        }, []);
    });

    return similarData.reduce( (acc, actual) => { acc = acc.concat(actual); return acc }, []);

    function compare(txt1, txt2){return (txt1).indexOf( txt2 ) || txt2.indexOf( txt1 )};
}