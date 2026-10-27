export const trips = [
  { id: 'singapore-stem', name: 'Singapore STEM Discovery', location: 'Singapore', description: 'Explore science centres, robotics, sustainability and future-ready technology.' },
  { id: 'jaipur-heritage', name: 'Jaipur Heritage Trail', location: 'Jaipur, India', description: 'Discover forts, architecture, local crafts and the stories behind Rajasthan’s heritage.' },
  { id: 'london-universities', name: 'London University Experience', location: 'London, UK', description: 'Experience university life and explore academic pathways at leading institutions.' },
] as const;
export type TripId = typeof trips[number]['id'];
export function getTripName(id: string) { return trips.find((trip) => trip.id === id)?.name ?? id; }
