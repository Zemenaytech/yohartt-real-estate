import Image from 'next/image';
import Link from 'next/link';
import finishedBuilding from '@/assets/img/completed-residence.jpg';

export default function RootsMobile() {
  return (
    <section id="RootsMobile" className="relative z-1 hidden overflow-clip bg-navy max-md:block">
      <div className="roots-scroller relative h-[400vh]">
        <div className="sticky top-0 left-0 flex h-screen w-full flex-col justify-center overflow-clip">
          <div className="pointer-events-none absolute top-36 left-0 z-20 w-full px-6">
            <p className="kicker text-accent uppercase">The way of living</p>
          </div>

          <div className="roots-screen1 absolute inset-0 h-full w-full">
            <div className="relative z-1 mt-54 flex justify-center px-6">
              <h2 className="roots-huge huge text-left text-[6rem] leading-[0.8] whitespace-normal text-cream-dark uppercase">Your roots</h2>
            </div>

            {/* Two matching cards: footage from inside a finished home, and the building itself. */}
            <div className="absolute right-6 bottom-24 left-6 grid grid-cols-2 items-start gap-4">
              <div className="roots-image relative aspect-[3/4] overflow-hidden rounded-2xl bg-black/20">
                <video src="/media/projects/completed-residence-walkthrough.mp4" poster="/media/projects/poster.webp" muted loop playsInline autoPlay preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-label="Walkthrough of a finished Yohart apartment" />
              </div>
              <div className="roots-image relative mt-10 aspect-[3/4] overflow-hidden rounded-2xl bg-black/20">
                <Image src={finishedBuilding} alt="A finished Yohart residential building with stone-look cladding and large black-framed windows" fill className="object-cover" sizes="45vw" />
              </div>
            </div>
          </div>

          <div className="roots-screen2 pointer-events-none absolute inset-0 z-10 flex h-full w-full items-end px-6 pb-30">
            <div className="w-full">
              <p className="roots-paragraph heading-2 text-[2.5rem] text-sand">At Yohart Tower, each residence is crafted not merely for living, but as a space that evolves alongside you</p>
              <Link href="#Residences" className="roots-button pointer-events-auto mt-10 inline-block w-full">
                <span className="menu inline-flex h-14 w-full items-center justify-center rounded-full border border-green bg-transparent px-5 py-5 uppercase text-cream transition-colors hover:bg-green/40">Explore residences <span aria-hidden="true" className="ml-4">→</span></span>
              </Link>
            </div>
          </div>

          <div className="absolute top-23 left-6 flex items-center gap-5">
            <div className="relative h-px w-32 bg-green"><div className="progress-fill absolute top-0 left-0 h-full w-0 bg-accent" /></div>
            <div className="small relative h-[1em] w-[2ch] leading-none text-green"><span className="progress-num-1 absolute inset-0">01</span><span className="progress-num-2 absolute inset-0">02</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
