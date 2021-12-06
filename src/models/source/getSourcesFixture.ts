import { Source } from './Source'
import sourcesJson from './sources.json'

export const getSourcesFixture = (): Source[] => {
	return sourcesJson as Source[]
}
