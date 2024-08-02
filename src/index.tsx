const numbers = [31, 82, 94, 73]
const mapFunction = (el: number, index: number) => el * index
const mappedArray = numbers.map(mapFunction)

const myNumber = mappedArray[0] && mappedArray[mappedArray.length - 1]
const bigCount = 41 + myNumber

//Какое значение получит переменная bigCount?//