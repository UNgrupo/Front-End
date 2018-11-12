var dates = {}; //Todas las fechas

const generateDataByDate = function( arraysOfData, namesOfData ){
    
    if( arraysOfData.length !== namesOfData.length )
        throw new Error("Both arrays should have the same length");
    
    let arraysByTime = {};
    let auxArrayOfDicts = [];
    
    for( let i=0; i<arraysOfData.length; i++ )
        auxArrayOfDicts.push( completeDict( arraysOfData[i] ) );
    
    for( let i=0; i<arraysOfData.length; i++ )
        arraysByTime[namesOfData[i]] = generateDataStatistics( {...dates, ...auxArrayOfDicts[i]} );
    
    return arraysByTime;
}

export default generateDataByDate;

function generateDataStatistics( dict ){
  
    var array = [];
    Object.keys(dict).forEach(function(key) {
        array.push( {date: key, posts: dict[key]} );
    });
    return array;
}

function completeDict( dict ){
    let newDict = {};
    for(let i=0; i<dict.length; i++){
      if(newDict[dict[i].attributes.date])
          newDict[dict[i].attributes.date] += 1;
      else
        newDict[dict[i].attributes.date] = 1;
        
        if( !dates[dict[i].attributes.date] )
            dates[dict[i].attributes.date] = 0;
    }
    return newDict;
}