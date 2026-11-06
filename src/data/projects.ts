import type { StaticImageData } from 'next/image';
import completedResidence from '@/assets/img/completed-residence.jpg';
import siteConcretePour from '@/assets/img/site-concrete-pour.jpg';
import siteRebarSkyline from '@/assets/img/site-rebar-skyline.jpg';
import siteStructure from '@/assets/img/site-structure.jpg';
import siteStructurePump from '@/assets/img/site-structure-pump.jpg';
import towerRender from '@/assets/img/tower-render.png';
// A still from the home hero video (2560×1440), sharp enough for full-width backdrops.
import towerDusk from '@/assets/img/tower-dusk.jpg';
import interior1 from '@/assets/home/residences-options/1.webp';
import interior2 from '@/assets/home/residences-options/2.webp';
import balconyImg from '@/assets/home/amenities-options/balcony.webp';
import lobbiesImg from '@/assets/home/amenities-options/lobbies.webp';
import type { EnquiryInterest } from './site';

export type Photo = { src: StaticImageData; alt: string; caption: string };

export type ProgressStage = {
  photo: Photo;
  title: string;
  text: string;
};

export type Project = {
  slug: string;
  name: string;
  status: 'Accepting enquiries' | 'Under construction' | 'Completed';
  type: string;
  location: string;
  tagline: string;
  summary: string;
  cover: Photo;
  specs: { label: string; value: string }[];
  highlights: string[];
  gallery: Photo[];
  /** Construction stages shown on the project index while work is on site. */
  progress?: ProgressStage[];
  /** Pre-selects this option in the enquiry form on the project page. */
  enquiryInterest: EnquiryInterest;
  /** Shows the interactive floor-by-floor explorer (Yohartt Tower only). */
  floorExplorer?: boolean;
  /** Portrait video shown in the project hero in place of a photo. */
  walkthrough?: { src: string; label: string; caption: string };
};

export const photos = {
  towerRender: {
    src: towerRender,
    alt: 'Architectural rendering of Yohart Tower, a slim white residential tower with full-width balconies at dusk',
    caption: 'Yohart Tower, artist impression',
  },
  towerDusk: {
    src: towerDusk,
    alt: 'Rendering of Yohart Tower at dusk: a slim white residential tower with full-width balconies above a tree-lined street',
    caption: 'Yohart Tower, artist impression',
  },
  completed: {
    src: completedResidence,
    alt: 'A completed mid-rise residential building with stone-look cladding, large black-framed windows and a gated entrance',
    caption: 'Recently completed Yohart residential building',
  },
  interior: {
    src: interior1,
    alt: 'Contemporary apartment living room with expansive floor-to-ceiling windows and refined finishes',
    caption: 'Interior Living Space',
  },
  balconyView: {
    src: balconyImg,
    alt: 'Private outdoor balcony with panoramic city views and lush planters',
    caption: 'Private Balcony Retreat',
  },
  entranceLobby: {
    src: lobbiesImg,
    alt: 'Double-height welcoming entrance lobby with modern stone cladding and ambient lighting',
    caption: 'Grand Entrance Lobby',
  },
  bedroom: {
    src: interior2,
    alt: 'Spacious master bedroom with floor-to-ceiling glazing and warm hardwood flooring',
    caption: 'Master Bedroom Suite',
  },
  structure: {
    src: siteStructure,
    alt: 'The concrete frame of the building wrapped in eucalyptus scaffolding and green safety netting, its lower floors open at street level',
    caption: 'Stage 01: The structure rises',
  },
  structurePump: {
    src: siteStructurePump,
    alt: 'The concrete frame wrapped in eucalyptus scaffolding and green safety netting, with a concrete pump truck parked in front',
    caption: 'Floor by floor',
  },
  rebar: {
    src: siteRebarSkyline,
    alt: 'Steel reinforcement mesh and column bars laid across a rooftop slab, with the Addis Ababa skyline behind',
    caption: 'Stage 02: Every slab, engineered',
  },
  pour: {
    src: siteConcretePour,
    alt: 'Workers spreading concrete delivered by a red boom pump across a reinforced slab, hills and city towers in the background',
    caption: 'Stage 03: Poured with precision',
  },
} satisfies Record<string, Photo>;

/**
 * Add a new project by appending an entry here — it gets its own page at /projects/<slug>.
 * TODO: confirm the facts below and give the completed building its real name.
 */
export const projects: Project[] = [
  {
    slug: 'the-tower',
  name: 'The Tower',
  status: 'Under construction',
  type: 'Residential tower',
  location: 'Addis Ababa, Ethiopia',
  tagline: 'Rising in Addis Ababa: a new residential landmark with a balcony on every level.',
  summary:
    'A residential tower with full-width glazing and a private balcony on every level.',
  cover: photos.towerDusk,
  specs: [
    { label: 'Status', value: 'Under construction' },
    { label: 'Type', value: 'Residential tower' },
    { label: 'Glazing', value: 'Full-width glazing' },
    { label: 'Outdoor space', value: 'Private balcony on every level' },
    { label: 'Arrival', value: 'Landscaped arrival court' },
    { label: 'Location', value: 'Addis Ababa' },
  ],
  highlights: [
    'Full-width glazing for natural light',
    'Private balcony on every level',
    'Landscaped arrival court',
    'Investment opportunities open',
  ],
    gallery: [photos.towerRender, photos.interior, photos.balconyView, photos.entranceLobby],
    progress: [
      {
        photo: photos.structure,
        title: 'The structure rises',
        text: 'Columns and slabs go up floor by floor, wrapped in scaffolding and safety netting from day one.',
      },
      {
        photo: photos.rebar,
        title: 'Every slab, engineered',
        text: 'Reinforcement is laid and tied to the structural drawings, with conduits and services set in place before any concrete arrives.',
      },
      {
        photo: photos.pour,
        title: 'Poured with precision',
        text: 'Ready-mix concrete is pumped, spread and vibrated across the slab by a dedicated crew for a solid, monolithic floor.',
      },
    ],
    enquiryInterest: 'Investment opportunities',
    floorExplorer: false,
  },
  {
    slug: 'yohart-tower',
    name: 'Yohart Tower',
    status: 'Accepting enquiries',
    type: 'Residential apartments',
    location: 'Addis Ababa, Ethiopia',
    tagline: 'Fifteen levels of light-filled homes above a landscaped arrival court.',
    summary:
      'Textured render and stone-look cladding, generous black-framed windows, private balconies and a secure gated entrance. Completed and handed over.',
    cover: photos.completed,
    specs: [
      { label: 'Status', value: 'Completed' },
      { label: 'Type', value: 'Residential apartments' },
      { label: 'Facade', value: 'Render & stone-look cladding' },
      { label: 'Access', value: 'Gated, covered entry' },
      { label: 'Location', value: 'Addis Ababa' },
    ],
    highlights: [
      'Large black-framed windows',
      'Private balconies',
      'Secure gated entrance',
      'Covered ground-level entry',
    ],
    gallery: [photos.completed, photos.entranceLobby, photos.interior, photos.bedroom],
    enquiryInterest: 'Yohart Tower',
    floorExplorer: true,
    walkthrough: {
      src: '/media/projects/completed-residence-walkthrough.mp4',
      label:
        'Walkthrough of a finished apartment: cove-lit ceilings, a feature TV wall and wide windows over the city',
      caption: 'Interior walkthrough',
    },
  
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
