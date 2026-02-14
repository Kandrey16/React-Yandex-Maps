import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Coordinates } from '../hooks/useGenerateCoordinate'

interface IPointStore {
	points: Coordinates[]
	savePoints: (p1: Coordinates, p2: Coordinates) => void
}

export const usePointStore = create<IPointStore>()(
	persist(
		(set) => ({
			points: [],
			savePoints: (p1, p2) => set({ points: [p1, p2] }),
		}),
		{
			name: 'point-storage',
		}
	)
)
