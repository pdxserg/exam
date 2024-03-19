import ReactDOM from 'react-dom/client';
import styled from "styled-components";


const BirthImg = styled.img`
    object-fit: contain;
    max-width: 1200px
`


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<div className="App">
		<BirthImg
			src="https://brandlogos.net/wp-content/uploads/2020/09/react-logo-512x512.png"
			srcSet="https://cdn.iconscout.com/icon/free/png-256/free-node-js-1-1174935.png 85w, https://brandlogos.net/wp-content/uploads/2020/09/react-logo-512x512.png 512w, https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png 1200w"
			sizes="(max-width: 600px) 85px, (max-width: 800px) 512px, 1200px"
			alt="Birth" />
	</div>
);



// Посмотрите внимательно на код. Изображение с каким логотипом (Node.js, React или Angular) будет отображаться на экране шириной 768px?
// ❗ Перед проверкой не забывате очищать cache (при открытой консоли разработчика, правой клавишей мыши по кнопке перезагрузка страницы -> Очистка кэша и жесткая перезагрузка)
