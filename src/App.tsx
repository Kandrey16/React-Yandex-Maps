import { YMaps } from '@pbe/react-yandex-maps'
import GeocodeMap from './components/geocode-map'
import { useGenerateCoordinate } from './hooks/useGenerateCoordinate'
import { usePointStore } from './store/point.store'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const MOSCOW_BOUNDS = [
	[55.58, 37.38], // юго-запад
	[55.91, 37.85], // северо-восток
]

type FormData = {
	point1: string
	point2: string
}

function App() {
	const { points, savePoints } = usePointStore()
	const [show, setShow] = useState(false)
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		mode: 'onChange',
		defaultValues: {
			point1: points[0]?.join(', ') || '',
			point2: points[1]?.join(', ') || '',
		},
	})

	function generatePoints() {
		const coords1 = useGenerateCoordinate(MOSCOW_BOUNDS)
		const coords2 = useGenerateCoordinate(MOSCOW_BOUNDS)
		savePoints(coords1, coords2)
	}

	useEffect(() => {
		setValue('point1', points[0].join(', '))
		setValue('point2', points[1].join(', '))
	}, [points, setValue])

	const onSubmit = (data: FormData) => {
		const [lat1, lon1] = data.point1.split(',').map((s) => Number(s.trim()))
		const [lat2, lon2] = data.point2.split(',').map((s) => Number(s.trim()))
		if (!isNaN(lat1) && !isNaN(lon1) && !isNaN(lat2) && !isNaN(lon2)) {
			savePoints([lat1, lon1], [lat2, lon2])
		}
	}

	return (
		<div className='flex flex-col justify-center items-center p-6'>
			<YMaps
				query={{
					apikey: import.meta.env.VITE_YANDEX_API_KEY,
					load: 'package.full',
				}}
			>
				<GeocodeMap isShow={show} />
			</YMaps>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col items-center p-4 gap-4'
			>
				<div className='flex items-center gap-4'>
					<button
						className='px-6 py-6 
						bg-gradient-to-r from-purple-600 to-indigo-600
						hover:from-purple-700 hover:to-indigo-700
						active:from-purple-800 active:to-indigo-800
						text-white font-medium
						rounded-xl shadow-md hover:shadow-lg
						transition-all duration-200
						focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2'
						onClick={() => {
							generatePoints()
							setShow(false)
						}}
					>
						Сгенерировать точки
					</button>
					{points && (
						<div className='flex flex-col gap-2'>
							<div className='relative'>
								<input
									{...register('point1', { required: 'Заполните точку 1' })}
									placeholder='55.75, 37.61'
									className='text-white bg-gray-800 placeholder:text-gray-400 px-3 py-1 rounded w-48'
									onInput={(e) => {
										let v = e.currentTarget.value.replace(/[^0-9.,-]/g, '')
										if (v.match(/,/g)?.length > 1)
											v = v.replace(/,/g, (m, i) =>
												i === v.indexOf(',') ? ',' : ''
											)
										e.currentTarget.value = v
									}}
								/>
								{errors.point1 && (
									<span className='text-red-500 text-xs absolute -bottom-5 left-0'>
										{errors.point1.message}
									</span>
								)}
							</div>

							<div className='relative'>
								<input
									{...register('point2', { required: 'Заполните точку 2' })}
									placeholder='55.76, 37.62'
									className='text-white bg-gray-800 placeholder:text-gray-400 px-3 py-1 rounded w-48'
									onInput={(e) => {
										let v = e.currentTarget.value.replace(/[^0-9.,-]/g, '')
										if (v.match(/,/g)?.length > 1)
											v = v.replace(/,/g, (m, i) =>
												i === v.indexOf(',') ? ',' : ''
											)
										e.currentTarget.value = v
									}}
								/>
								{errors.point2 && (
									<span className='text-red-500 text-xs absolute -bottom-5 left-0'>
										{errors.point2.message}
									</span>
								)}
							</div>
						</div>
					)}
				</div>
				<button
					className='w-full py-3.5
    bg-gradient-to-r from-emerald-500 to-teal-600
    hover:from-emerald-600 hover:to-teal-700
    active:from-emerald-700 active:to-teal-800
    text-white font-semibold text-lg
    rounded-xl shadow-lg hover:shadow-xl
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed'
					onClick={() => setShow(true)}
					disabled={Object.keys(errors).length > 0}
				>
					Построить маршрут
				</button>
			</form>
		</div>
	)
}

export default App
