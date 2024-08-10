const students = [
	{name: "Bob"},
	{name: "Alex"},
	{name: "Donald"}
]
const filteredStudents = students.filter(s => s.name !== "Kate")
const lengthDiff = students.length - filteredStudents.length
const newValue = (lengthDiff && 36.80) || (59.31 && 21.49)

//Какое значение получит переменная newValue?