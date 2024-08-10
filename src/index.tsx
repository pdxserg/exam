const value = 33

const getValue = (value: any) => {
	value += 84
	return value
}

const myResult= getValue("") || value

//Какое значение получит переменная myResult?