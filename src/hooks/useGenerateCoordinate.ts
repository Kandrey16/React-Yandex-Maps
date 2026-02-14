export type Coordinates= [number, number]

export function useGenerateCoordinate(bounds: number[][]): [number, number] {
	const minLat = bounds[0][0]
	const minLon = bounds[0][1]
	const maxLat = bounds[1][0]
	const maxLon = bounds[1][1]

	let lat = Number((minLat + Math.random() * (maxLat - minLat)).toFixed(6))
	let lon = Number((minLon + Math.random() * (maxLon - minLon)).toFixed(6))

	return [lat, lon]
}
