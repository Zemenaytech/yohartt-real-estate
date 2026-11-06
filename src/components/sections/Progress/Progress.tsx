import Image from 'next/image';
import Link from 'next/link';
import { LightboxLink } from '@/components/LightboxLink';
import { LongArrow } from '@/components/icons';
import { photos, type ProgressStage } from '@/data/projects';


const STAGES: ProgressStage[] = [
  {
    photo: photos.structurePump,
    title: 'Floor by floor',
    text: 'A concrete pump feeds each new slab from the street as the frame climbs, one level at a time.',
  },
  {
    photo: photos.pour,
    title: 'Poured with precision',
    text: 'Ready-mix concrete is pumped, spread and vibrated across the slab by a dedicated crew for a solid, monolithic floor.',
  },
  {
    photo: photos.structure,
    title: 'Rising today',
    text: 'The latest view from site: the frame wrapped in scaffolding and green safety netting as it climbs.',
  },
];

export default function Progress() {
  return (
    <section id="Progress" className="project-progress relative z-1" aria-labelledby="home-progress-title">
      <div className="wrapper">
        <div className="project-progress__head">
          <div>
            <p className="project-eyebrow">
              <span>(On site)</span>
               Construction in progress
            </p>
            <h2 id="home-progress-title" className="project-progress__title project-heading">
              Progress <em>on site</em>
            </h2>
          </div>
          <div className="project-progress__aside">
            <p className="project-copy">
              Real photos from the site, not renderings. The Tower is rising floor by floor
              behind the British Embassy in Megenagna.
            </p>
            <Link href="/projects" className="project-text-link project-progress__link">
              See our projects
              <LongArrow />
            </Link>
          </div>
        </div>

        <div className="project-progress__stages">
          {STAGES.map((stage, index) => (
            <figure className="project-progress__stage" key={stage.title}>
              <LightboxLink photo={stage.photo} className="project-progress__frame progress-reveal">
                <Image
                  src={stage.photo.src}
                  alt={stage.photo.alt}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1120px) 46vw, 30vw"
                />
              </LightboxLink>
              <figcaption>
                <span className="project-progress__num">{String(index + 1).padStart(2, '0')}</span>
                <span className="project-progress__stage-copy">
                  <strong className="!text-[1.75rem]">{stage.title}</strong>
                  <span className="!text-[1.5rem]">{stage.text}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
