import ReactDOM from 'react-dom/client';
import styled from "styled-components";

export const StyledAnalyst = styled.div`
    background: url("https://cdn.iconscout.com/icon/free/png-256/free-css3-8-1175200.png") center/cover no-repeat;

    @media (orientation: landscape), (min-width: 1200px) {
        width: 500px;
        height: 500px;
    }
    @media  (orientation: portrait), (max-width: 768px) {
        width: 250px;
        height: 250px;
    }
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<div className="App">
		<StyledAnalyst />
	</div>
);


// Какие значения  должны быть вместо XXX, YYY и ZZZ, чтобы для элемента большое изображение было на десктопе или ландшафтной ориентации, а маленькое - на мобилках или портретой ориентации?
// ❗ В ответе укажите значения через пробел вот так: XXX YYY ZZZ