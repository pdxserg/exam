const user = {
	name: "Anastasiya",
	age: 35,
	friends: ["Vanya", "Igor", "Vladimir"]
}

const updatedUser = {
	...user,
	friends: user.friends
}

console.log(user.friends === updatedUser.friends)

/*Какое значение будет выведено в консоль?*/