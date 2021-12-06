import { RawSourceData, Source } from './source.types'

export const parseSingleRawSourceData = (rawData: RawSourceData): Source => {
	const parsedData = { ...rawData, tags: JSON.parse(rawData.tags) }

	return parsedData
}

export const parseRawSourcesData = (rawData: RawSourceData[]): Source[] => {
	return rawData.map(parseSingleRawSourceData)
}
