type NewsType = {
	title: string
	author: string
}
type ArticleType = {
	title: string
	date: string
	text: string
}
type PagePropsType = {
	news: NewsType[]
	mainArticle: ArticleType
}
export const Page: React.FC<PagePropsType> = (props) => {
	return <div>
		<article>
			<h1>Название: {props.XXX.title}</h1>
			<div>{props.XXX.date}</div>
			<div>{props.XXX.text}</div>
		</article>
		<aside>Articles:
			<ul>
				{props.YYY.map(n => <li>{n.title}, {n.author}</li>)}
			</ul>
		</aside>
	</div>
}