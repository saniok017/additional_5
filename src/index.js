module.exports = function check(str, bracketsConfig) {
  let matchingOpeningBracket, bracket;
  const stack=[];

  //   converting bracketsConfig (array of arrays) to map
  const bracketsMap= new Map();
  for (let a=0, len=bracketsConfig.length; a < len; a++){
    let arr = bracketsConfig[a];
    bracketsMap.set(arr[0],arr[1]);
  };
  //      than splitting map to arrays 
  let openingBrackets=[...bracketsMap.keys()];
  let closingBrackets=[...bracketsMap.values()];

  //      than check str for matches 
  for (let c=0, quantity = str.length; c < quantity; c++){
    bracket = str[c];
    //      case when they are equal
    let equalBrackets = (closingBrackets.indexOf(bracket) == openingBrackets.indexOf(bracket));
    let notequalbreckets = (closingBrackets.indexOf(bracket) !== openingBrackets.indexOf(bracket));
    if (equalBrackets && stack.indexOf(bracket) !== -1){
        if (stack.pop() !== openingBrackets[closingBrackets.indexOf(bracket)]) {
          return false;
        }
    }
    if (closingBrackets.indexOf(bracket) !== -1 && notequalbreckets){
      matchingOpeningBracket=openingBrackets[closingBrackets.indexOf(bracket)];
      if (stack.length == 0 || (stack.pop() !== matchingOpeningBracket)){
        return false;
      }
    } 
    else {
      stack.push(bracket);
    }
  }
  return (stack.length === 0);
}