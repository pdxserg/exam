const bonus = {
	name: "Elizaveta",
	scores: 72
}

const addition = {
	... bonus,  scores:  bonus.scores++
}


const scores  = addition.scores

// Какое значение получит переменная scores?

