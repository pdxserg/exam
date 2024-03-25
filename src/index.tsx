import ReactDOM from 'react-dom/client';
import styled, { keyframes } from "styled-components";

const appointmentAnimation = keyframes`
    50% {
        transform: scale(5)
    }
    100% {
        transform: scale(3.5)
    }
`

export const Appointment = styled.div`
  width: 24px;
	height: 24px;
  transform: scale(3.5);
	background: #FF5252;
	clip-path: path("M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z");
  margin: 50px;
  animation: ${appointmentAnimation} 2s infinite;
  animation-delay: 3s;
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<div className="App">
		<Appointment/>
	</div>
);

// Что должно быть вместо XXX и YYY, чтобы анимация началась через 3 секунды после перезагрузки страницы?
//❗ В ответе укажите значения через пробел: XXX YYY