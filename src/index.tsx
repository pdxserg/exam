import ReactDOM from 'react-dom/client';
import styled, { keyframes } from "styled-components";



const brotherAnimation = keyframes`
    from {
        transform: translateY(0) translateX(0);
    }
    25% {
        background-color: red;
        transform: translateY(500px) translateX(150px);
    }
    50% {
        transform: translateY(400px) translateX(250px);
    }
    70% {
        transform: translateY(500px) translateX(420px);
    }
    90% {
        transform: translateY(480px) translateX(480px);
    }
    to {
        transform: translateY(500px) translateX(500px);
    }
`

const StyledBossBox = styled.div`
  height: 200px;
  width: 300px;
  border: 1px solid;
  padding: 20px;
`

const StyledBrother = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #c16ae1;
  transform-origin: center;
  animation: ${brotherAnimation} 2s ease-in;
  animation-fill-mode: forwards;
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<div className="App">
		<StyledBossBox>
			<StyledBrother/>
		</StyledBossBox>



	</div>
);

// Что должно быть вместо XXX и YYY, чтобы после проигрывания анимация остановилась на последнем ключевом кадре?
//❗ В ответе укажите значения через пробел, вот так: XXX YYY