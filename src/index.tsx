import ReactDOM from 'react-dom'

export const YoutubeVideoBlock = () => {
	return <div>
		<VideoHeader />
		<VideoContent />
		<VideoStatistics />
	</div>
}
export const VideoHeader = () => {
	return <div>
		😀 Заголовок видео
	</div>
}
export const VideoContent = () => {
	return <div>
		📼 Контент видео
	</div>
}
export const VideoStatistics = () => {
	return <div>
		📊 Статистика лайков
	</div>
}

ReactDOM.render(<div>ххх</div>,
	document.getElementById('root')
);

//Что нужно написать вместо ххх, чтобы на экране увидеть:
//😀 Заголовок видео
//📼 Контент видео
//📊 Статистика лайков
// ❗ Ответ дать минимально возможным объёмом кода 