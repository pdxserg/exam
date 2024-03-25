import ReactDOM from 'react-dom/client';
import styled, { keyframes } from "styled-components";

const chance = keyframes`
    to {
        width: 100%;
    }
`

const Community = styled.div`
    height: 50px;
    padding: 10px;
    max-width: 1200px;
    background-color: #e0e2e3;
    border-radius: 10px;
    padding: 10px;
`

const Bank = styled.div`
    width: 0;
    height: 100%;
    border-radius: 5px;
    background-color: #6aade1;
    animation: ${chance} 2s infinite alternate;

    &:hover {
        animation-play-state: paused;
    }
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<div className="App">
		<Community>
			<Bank />
		</Community>
	</div>
);


// Что должно быть вместо XXX, YYY и ZZZ, чтобы каждый нечетный повтор анимация проигрывалась в нормальном порядке, а каждый четный повтор в обратном. И при наведении курсора мыши на анимируемый элемент, анимация должна "замирать".
//❗ В ответе укажите значения через пробел: XXX YYY ZZZ