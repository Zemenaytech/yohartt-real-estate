import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer/Footer';
import { Lightbox } from '@/components/Lightbox';
import { LightboxLink } from '@/components/LightboxLink';
import { PointerFx } from '@/components/PointerFx';
import { EnquiryProvider } from '@/components/EnquiryContext';
import ProjectScrollAnimations from '@/components/ProjectScrollAnimations';
import { ArrowLeft, LongArrow } from '@/components/icons';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Explore our residential developments and completed projects across Addis Ababa.`,
};

export default function ProjectsPage() {
  const introCover = projects[0].cover;

  return (
    <EnquiryProvider>
      <Header />
      <PointerFx />
      <ProjectScrollAnimations />
      <main className="min-h-screen bg-pine-green text-cream selection:bg-accent selection:text-pine-green overflow-x-clip">
        {/* Opening scene */}
        <section className="project-intro" aria-labelledby="projects-title">
          <div className="project-intro__backdrop">
            <Image
              src={introCover.src}
              alt={introCover.alt}
              fill
              priority
              sizes="100vw"
              className="project-bg"
            />
            <div className="project-intro__veil" />
          </div>

          <div className="wrapper project-intro__inner">
            <div className="project-topline project-fade">
              <Link href="/" className="project-back">
                <ArrowLeft />
                Back to home
              </Link>
              <span className="project-topline__label">Addis Ababa / Ethiopia</span>
            </div>

            <div className="project-intro__bottom">
              <div>

                <h1 id="projects-title" className="hero project-intro__title project-heading">
                  Our <em>Projects</em>
                </h1>
              </div>

              <div className="project-intro__aside">
                <p className="project-copy">
                  Explore our residential developments across Addis Ababa. Built with structural
                  engineering precision, refined modern architecture, and enduring living value.
                </p>
                <div className="project-intro__count project-fade">
                  <span>{String(projects.length).padStart(2, '0')}</span>
                  <span>Developments in the portfolio</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial index */}
        <section className="project-index" aria-labelledby="portfolio-index-title">
          <div className="wrapper">
            <div className="project-index__head">
              <div>
                <p className="project-eyebrow">The index</p>
                <h2 id="portfolio-index-title" className="project-index__title">
                  A growing <em>portfolio</em>
                </h2>
              </div>
              <p className="project-index__lead">
                Two developments, one standard: considered architecture, generous light, and
                spaces made to be lived in for years.
              </p>
            </div>

            <div className="project-index__rows">
              {projects.map((project, index) => (
                <a
                  key={project.slug}
                  href={`#${project.slug}`}
                  className="project-index__row project-fade"
                >
                  <span className="project-index__num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="project-index__name">{project.name}</span>
                  <span className="project-index__type">{project.type}</span>
                  <span className="project-index__status">
                    <i aria-hidden="true" />
                    {project.status}
                  </span>
                  <span className="project-index__arrow" aria-hidden="true">
                    <LongArrow />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Full-view project scenes */}
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const [firstWord, ...restWords] = project.name.split(' ');
          const rest = restWords.join(' ');
          const longestWord = Math.max(...project.name.split(' ').map((word) => word.length));
          const detailPhoto = project.gallery[1] || project.gallery[0];
          const progressStages = project.progress;

          return (
            <Fragment key={project.slug}>
              <section
                id={project.slug}
                className={`project-stage${isEven ? '' : ' project-stage--reverse'}`}
                aria-labelledby={`project-${project.slug}`}
              >
              <div className="project-stage__backdrop">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="100vw"
                  className="project-bg"
                />
                <div className="project-stage__veil" />
              </div>

              <div className="wrapper project-stage__inner">
                <div className="project-stage__grid">
                  <div className="project-stage__copy">
                    <div className="project-meta project-fade">
                      <span className="project-meta__num">
                        ({String(index + 1).padStart(2, '0')})
                      </span>
                      <span>{project.type}</span>
                      {/* <span
                        className={`project-meta__dot${
                          project.status === 'Completed' ? ' project-meta__dot--done' : ''
                        }`}
                        aria-hidden="true"
                      /> */}
                      <span>{project.status}</span>
                      <span>{project.location}</span>
                    </div>

                    <h2
                      id={`project-${project.slug}`}
                      className={`hero project-stage__title project-heading${
                        longestWord > 7 ? ' project-stage__title--long' : ''
                      }`}
                    >
                      {firstWord}
                      {rest && (
                        <>
                          {' '}
                          <em>{rest}</em>
                        </>
                      )}
                    </h2>

                    <p className="project-stage__tagline project-copy">{project.tagline}</p>
                    <p className="project-stage__summary project-copy">{project.summary}</p>

                    <div className="project-actions project-fade">
                      <Link href={`/projects/${project.slug}`} className="project-cta">
                        Explore project
                        <LongArrow />
                      </Link>
                      {project.floorExplorer && (
                        <Link
                          href={`/projects/${project.slug}#tower`}
                          className="project-text-link"
                        >
                          Floor explorer
                        </Link>
                      )}
                    </div>
                  </div>

                  {project.walkthrough ? (
                    // Real footage from inside beats a rendered interior.
                    <figure className="project-stage__media project-stage__media--video project-media project-media-reveal">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="project-media__frame project-media__frame--portrait"
                        data-cursor="View"
                      >
                        <video
                          src={project.walkthrough.src}
                          poster="/media/projects/poster.webp"
                          aria-label={project.walkthrough.label}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      </Link>
                      <figcaption>{project.walkthrough.caption}</figcaption>
                    </figure>
                  ) : (
                    <figure className="project-stage__media project-media project-media-reveal">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="project-media__frame"
                        data-cursor="View"
                      >
                        <Image
                          src={detailPhoto.src}
                          alt={detailPhoto.alt}
                          fill
                          sizes="(max-width: 1120px) 80vw, 35vw"
                        />
                      </Link>
                      <figcaption>{detailPhoto.caption}</figcaption>
                    </figure>
                  )}
                </div>
              </div>
              </section>

              {progressStages && progressStages.length > 0 && (
                <section
                  className="project-progress"
                  aria-labelledby={`progress-${project.slug}-title`}
                >
                  <div className="wrapper">
                    <div className="project-progress__head">
                      <div>
                        <p className="project-eyebrow project-fade">
                          <span>(On site)</span>
                          {project.name} / construction in progress
                        </p>
                        <h2
                          id={`progress-${project.slug}-title`}
                          className="project-progress__title project-heading"
                        >
                          Progress <em>on site</em>
                        </h2>
                      </div>
                      <div className="project-progress__aside">
                        <p className="project-copy">
                          {project.name} is still rising. These are recent moments from the site:
                          the structure, the reinforcement, and the concrete pour that carries each
                          new floor.
                        </p>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="project-text-link project-progress__link project-fade"
                        >
                          View {project.name}
                          <LongArrow />
                        </Link>
                      </div>
                    </div>

                    <div className="project-progress__stages">
                      {progressStages.map((stage, stageIndex) => (
                        <figure className="project-progress__stage" key={stage.title}>
                          <LightboxLink
                            photo={stage.photo}
                            className="project-progress__frame project-media-reveal"
                          >
                            <Image
                              src={stage.photo.src}
                              alt={stage.photo.alt}
                              fill
                              sizes="(max-width: 600px) 100vw, (max-width: 1120px) 46vw, 30vw"
                            />
                          </LightboxLink>
                          <figcaption className="project-fade">
                            <span className="project-progress__num">
                              {String(stageIndex + 1).padStart(2, '0')}
                            </span>
                            <span className="project-progress__stage-copy">
                              <strong>{stage.title}</strong>
                              <span>{stage.text}</span>
                            </span>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </Fragment>
          );
        })}

        <Footer />
      </main>
      <Lightbox />
    </EnquiryProvider>
  );
}
