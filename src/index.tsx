import ReactDOM from 'react-dom/client';
import styled from "styled-components";


const CarImg = styled.img`
    height: 400px;
    width: 400px;
    object-fit: contain
`


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<div className="App">
		<CarImg
			src="https://cdn.iconscout.com/icon/free/png-256/free-node-js-1-1174935.png?f=webp"

			XXX="https://brandlogos.net/wp-content/uploads/2020/09/react-logo-512x512.png YYY, https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png ZZZ" />
	</div>
);


// Что должно быть вместо XXX, YYY и ZZZ, чтобы код работал корректно и для экранов с разной плотностью пикселей загружалось правильное изображение?
//❗ В ответе укажите значения через пробел, вот так: XXX YYY ZZZ