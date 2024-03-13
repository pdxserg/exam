import ReactDOM from 'react-dom/client';
import styled, { css } from "styled-components";

const ModalWindow = styled.div.attrs(() => ({
	role: "XXX",
	"aria-YYY": true
}) )`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    background-color: rgba(0, 0, 0, 0.3);
    color: #1f1d1d;
`

const ModalContent = styled.div`
    background-color: white;
    max-width: 500px;
    width: 100%;
    padding: 20px;
    margin: auto;
    border-radius: 10px
`

const Wrapper = styled.div`
    display: flex;
    gap: 30px;
    margin-top: 30px;
`

const StyledButton = styled.button<{ btnType: string }>`
    border-radius: 5px;
    border: 2px solid;
    cursor: pointer;
    padding: 15px;
    flex-grow: 1;

    ${props => props.btnType === "boat" && css`
        border-color: #2fbc69;
        background-color: #5de79777;
    `}
    
    ${props => props.btnType === "construction" && css`
        border-color: #e13c5f;
        background-color: rgba(241, 94, 126, 0.4)
    `}
`



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<ModalWindow>
		<ModalContent>
			<h2>Подумай хорошо 🙇‍♂️</h2>
			<p>Точно хочешь выучить c#?</p>
			<Wrapper>
				<StyledButton btnType="construction">Нет ❌</StyledButton>
				<StyledButton btnType="boat">Да ✔️</StyledButton>
			</Wrapper>
		</ModalContent>
	</ModalWindow>
);

// Что должно быть вместо XXX и YYY, чтобы сделать модальное окно доступным?
// ❗ В ответе укажите значения через пробел, вот так: XXX YYY
