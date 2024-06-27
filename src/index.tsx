let number = 92

if (number > 0) {
	let number = 10
	number++
}

const getNumber = (number: any) => {
	number *= 10
	return number
}

const bigValue= getNumber("number") || number

//Какое значение получит переменная bigValue?