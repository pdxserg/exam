const numbers = [56, 86, 33, 46]
const mapFunction = (el: number, index: number) => el * index
const mappedArray = numbers.map(mapFunction)

const myNumber = mappedArray[0] && mappedArray[mappedArray.length - 1]
const bigCount = 80 + myNumber

//Какое значение получит переменная bigCount?//