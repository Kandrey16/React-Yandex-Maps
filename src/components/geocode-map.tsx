import { GeoObject, Map, Placemark } from '@pbe/react-yandex-maps'
import { usePointStore } from '../store/point.store'

type CoordinatesType = [number, number]

interface GeocodeMapProps {
	isShow: boolean
}

const CENTER: CoordinatesType = [55.7562, 37.6229]
const ZOOM = 10

const GeocodeMap = ({ isShow }: GeocodeMapProps) => {
	const { points } = usePointStore()

	return (
		<Map
			state={{ center: CENTER, zoom: ZOOM }}
			className='w-3/4 min-h-200 h-fit border rounded-xl overflow-hidden'
			modules={['geocode', 'route']}
		>
			{points.map((p, i) => (
				<Placemark key={i} geometry={p} />
			))}
			{isShow && points.length === 2 && (
				<GeoObject
					geometry={{
						type: 'LineString',
						coordinates: [points[0], points[1]],
					}}
					options={{
						geodesic: true,
						strokeWidth: 5,
						strokeColor: '#F008',
					}}
				/>
			)}
		</Map>
	)
}

export default GeocodeMap
