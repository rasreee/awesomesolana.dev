export const buildSourcesFixture = <JsonArray extends Record<string, object>[] = Record<string, object>[]>(
	tsJsonArray: JsonArray
) => {
	const fs = require('fs')
	const path = require('path')
	const FIXTURE_PATH = path.resolve(__dirname, './sources.json')

	const write = (content: string) => {
		fs.writeFileSync(FIXTURE_PATH, content)
	}

	const append = (content: string) => {
		fs.appendFileSync(FIXTURE_PATH, content)
	}

	write('[')

	tsJsonArray.forEach((source, index) => {
		append(`\n${JSON.stringify(source, null, 2)}`)

		if (index < tsJsonArray.length - 1) {
			append(',')
		}
	})

	append('\n]')
}
