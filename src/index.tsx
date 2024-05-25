const userName = (user = "") => {
	let userName: any = "Nikita"
	userName += user
	return user;
}

const student = userName() || "Ivan"

/*Какое значение получит переменная student? */ 