const student = {
	name: "Maria"
}

const newStudent = student

const myFriend = {
	...newStudent
}

const newUser = {
	name: "Igor"
}

const myFriendName =  student.name !== myFriend.name
	? newUser.name
	: student.name

/*Какое значение получит переменная "myFriendName"?*/