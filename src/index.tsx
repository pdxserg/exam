const customer = {
	name: "Konstantin",
	age: 14,
	scores: [15.26, 12.09, 65.90]
}

const [first, second, third = 37.95] = customer.scores

switch(third){
	case 37.95:
		console.log("Germany")
		break;
	case 12.09:
		console.log("Algeria")
		break;
	default:
		console.log("Mongolia");
}
/*Какую строку мы увидим в консоли?*/

