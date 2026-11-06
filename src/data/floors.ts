/**
 * Yohart Tower floors — edit zone names, descriptions and highlights here.
 *
 * Shapes are polygons traced on the 1536×2752 rendering (src/assets/img/tower-render.png),
 * in that image's pixel coordinates. If the rendering changes, re-trace FLOOR_SHAPES.
 */

export const TOWER_VIEWBOX = { width: 1536, height: 2752 } as const;
/** Right edge of the balcony facade, used to pin the floor label. */
export const FACADE_RIGHT_X = 766;

type Zone = { name: string; desc: string; chips: string[] };

const ZONES = {
  penthouse: {
    name: 'Top level Residence',
    desc: 'The crown of the tower: top-floor living with the widest views over Addis Ababa.',
    chips: ['Top-floor living', 'Panoramic views', 'Private balcony'],
  },
  sky: {
    name: 'Sky residences',
    desc: 'Upper-level homes with open city and mountain views from a full-width balcony.',
    chips: ['Upper-level views', 'Full-width balcony', 'Floor-to-ceiling glazing'],
  },
  residences: {
    name: 'Residences',
    desc: 'Light-filled apartments with floor-to-ceiling glazing and a private balcony.',
    chips: ['Private balcony', 'Floor-to-ceiling glazing', 'Lift access'],
  },
  podium: {
    name: 'Residences',
    desc: 'A fully glazed level above the arrival court, set aside for lounge and amenity space.',
    chips: ['Full-glass frontage', 'Street-facing', 'Shared amenities'],
  },
  arrival: {
    name: 'Arrival & parking',
    desc: 'A covered, landscaped arrival court with secure parking beneath the tower.',
    chips: ['Covered parking', 'Landscaped entrance', 'Secure access'],
  },
} satisfies Record<string, Zone>;

const FLOOR_SHAPES: Record<string, string> = {
  '15': '265,356 766,21 766,202 265,528',
  '14': '265,528 766,202 766,348 265,649',
  '13': '265,649 766,348 766,494 265,752',
  '12': '265,752 766,494 766,644 265,901',
  '11': '265,901 766,644 766,795 265,1026',
  '10': '265,1026 766,795 766,945 265,1154',
  '9': '265,1154 766,945 766,1097 265,1284',
  '8': '265,1284 766,1097 766,1248 265,1415',
  '7': '265,1415 766,1248 766,1398 265,1547',
  '6': '265,1547 766,1398 766,1550 265,1680',
  '5': '265,1680 766,1550 766,1704 265,1816',
  '4': '265,1816 766,1704 766,1855 265,1921',
  '3': '265,1921 766,1855 766,2009 265,2058',
  '2': '265,2058 766,2009 766,2165 265,2199',
  '1': '265,2199 766,2165 766,2324 265,2336',
  G: '265,2336 766,2324 766,2510 265,2517',
};

function zoneFor(id: string): Zone {
  if (id === 'G') return ZONES.arrival;
  const n = Number(id);
  if (n === 15) return ZONES.penthouse;
  if (n >= 13) return ZONES.sky;
  if (n === 1) return ZONES.podium;
  return ZONES.residences;
}

export type Point = [number, number];

export type Floor = {
  id: string;
  /** Big number on the floor card: "09", or "G". */
  num: string;
  /** Short tag on the building: "L09" or "G". */
  short: string;
  /** "Level 09" or "Ground floor". */
  label: string;
  zone: Zone;
  points: Point[];
};

const ORDER = ['15', '14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'G'];

export const FLOORS: Floor[] = ORDER.map((id) => {
  const ground = id === 'G';
  const padded = ground ? 'G' : id.padStart(2, '0');
  return {
    id,
    num: padded,
    short: ground ? 'G' : `L${padded}`,
    label: ground ? 'Ground floor' : `Level ${padded}`,
    zone: zoneFor(id),
    points: FLOOR_SHAPES[id].split(' ').map((p) => p.split(',').map(Number) as Point),
  };
});

export const DEFAULT_FLOOR = '10';

export function getFloor(id: string): Floor | undefined {
  return FLOORS.find((f) => f.id === id);
}
