import styled from 'styled-components';
import ReactDOM from 'react-dom/client';


const StyledClassroomField = styled.div`
    max-width: 500px;
    width: 100%;
    height: 20px;
    font-weight: 400;
    font-size: 16px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    overflow-y: auto;
    margin-top: 12px;
    border: 2px solid #dadee0;
    font-family: sans-serif
`

function ClassroomField() {
	return (
		<StyledClassroomField XXX={true} />
	)
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<div className="App">
		<ClassroomField />
	</div>
);

// Какой атрибут должен быть вместо XXX, чтобы стилизованный компонент, который по сути является тегом <div>, стал редактируемым полем для ввода текста?
contentEditable
