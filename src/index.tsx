import styled from "styled-components";
import ReactDOM from 'react-dom/client';


const StyledCousinInput = styled.input`
    width: 350px;
    height: 35px;
    background-color: transparent;
    border: 1px solid #626673;
    border-radius: 5px;
    caret-color: #2d2f38;
    padding: 8px 20px;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #2d2f38;

    &:: {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        color: #a3a9ba;
    }
`


const CousinInput = () => {
	return (
		<StyledCousinInput XXX="Type cousin here..."/>
	);
};


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<div className="App">
		<CousinInput />
	</div>
);


// Что должно быть вместо XXX, чтобы стили применились к подсказке в текстовом поле?
