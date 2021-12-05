import { createServer } from 'http'
import next from 'next'
import { parse } from 'url'

const port = parseInt(process.env.PORT || '3000', 10)
const app = next({})
const handle = app.getRequestHandler()

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url || '', true)

		handle(req, res, parsedUrl)
	}).listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`)
	})
})
