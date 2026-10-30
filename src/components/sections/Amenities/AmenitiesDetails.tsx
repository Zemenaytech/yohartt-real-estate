'use client';

import Image, { type StaticImageData } from 'next/image';
import { useState } from 'react';
import amenityRooftop from '@/assets/home/amenities-options/rooftop.webp';
import amenityGarage from '@/assets/home/amenities-options/parking.webp';
import amenityRestaurant from '@/assets/home/amenities-options/interior.webp';
import amenityFitness from '@/assets/home/amenities-options/fitness.webp';
import { Instrument_Serif } from 'next/font/google';

const amenitiesFont = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-amenities',
});
type Amenity = {
  name: string;
  label: string;
  description: string;
  image: StaticImageData;
  alt: string;
};

const amenities: Amenity[] = [
  {
    name: 'Rooftop',
    label: 'Landscaped rooftop terrace',
    description:
      'A landscaped rooftop terrace made for fresh air, quiet pauses and time together, with generous views across the city.',
    image: amenityRooftop,
    alt: 'Landscaped rooftop terrace with outdoor seating and fitness equipment',
  },
  {
    name: 'Garage',
    label: 'Secure parking',
    description:
      'A calm, secure arrival beneath the building. Generous parking keeps every journey simple, with room for residents and their guests.',
    image: amenityGarage,
    alt: 'Modern underground parking garage',
  },
  {
    name: 'Restaurant',
    label: 'Top-floor café restaurant',
    description:
      'A welcoming place to pause, meet and share the day. The top-floor restaurant brings good food and easy conversation close to home.',
    image: amenityRestaurant,
    alt: 'Warm modern top-floor restaurant interior with city views',
  },
  {
    name: 'Fitness',
    label: 'Private fitness space',
    description:
      'A focused space for movement and balance. The in-house gym makes it easy to stay active without leaving the complex.',
    image: amenityFitness,
    alt: 'Woman stretching in a private fitness studio',
  },
];

export function AmenitiesDetailsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAmenity = amenities[activeIndex];

  return (
    <section className={`amenities-details ${amenitiesFont.variable}`} aria-labelledby="amenities-details-title">
      <div className="amenities-details__navigation" role="tablist" aria-label="Amenities">
        {amenities.map((amenity, index) => {
          const tabId = `amenity-tab-${amenity.name.toLowerCase()}`;
          return (
            <button
              key={amenity.name}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls="amenities-details-panel"
              tabIndex={activeIndex === index ? 0 : -1}
              className={activeIndex === index ? 'is-active' : undefined}
              onClick={() => setActiveIndex(index)}
            >
              {amenity.name}
              {activeIndex === index && <em>{amenity.label}</em>}
            </button>
          );
        })}
      </div>

      <div id="amenities-details-panel" className="amenities-details__content" role="tabpanel" aria-live="polite" aria-labelledby={`amenity-tab-${activeAmenity.name.toLowerCase()}`}>
        <div className="amenities-details__rule" />
        <p className="amenities-details__label">{activeAmenity.label}</p>
        <p className="amenities-details__description">{activeAmenity.description}</p>
      </div>

      <div className="amenities-details__visual" key={activeAmenity.name}>
        <Image
          src={activeAmenity.image}
          alt={activeAmenity.alt}
          fill
          sizes="58vw"
          // priority={activeIndex === 0}
        />
      </div>

      <h2 id="amenities-details-title" className="amenities-details__title">
        AMENITIES
      </h2>
    </section>
  );
}
