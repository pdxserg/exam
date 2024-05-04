import React, {MouseEvent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Button() {
	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		// console.log((typeof e) === ххх)
	}
	return <button onClick={onClickHandler} >Click</button>
}


ReactDOM.render(
	<Button/>, document.getElementById('root')
);

// Что надо написать вместо ххх, чтобы в консоль вывело true?
