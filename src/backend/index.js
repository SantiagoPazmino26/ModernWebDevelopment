import Koa from 'koa'
import serve from 'koa-static'

async function main() {
		{
			const app = new Koa()
			app.use(serve('dist'))
			
			app.listen(3000)
		}
}

main()
