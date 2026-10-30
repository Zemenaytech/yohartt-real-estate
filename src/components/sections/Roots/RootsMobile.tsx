import Image from 'next/image';
import Link from 'next/link';
import image2 from '@/assets/home/roots/image2.webp';
import image3 from '@/assets/home/roots/image3.webp';

export default function RootsMobile() {
  return (
    <section id="RootsMobile" className="relative z-1 hidden overflow-clip bg-navy max-md:block">
      <div className="roots-scroller relative h-[400vh]">
        <div className="sticky top-0 left-0 flex h-screen w-full flex-col justify-center overflow-clip">
          <div className="pointer-events-none absolute top-36 left-0 z-20 w-full px-6">
            <p className="kicker text-accent uppercase">The way of living</p>
          </div>

          <div className="roots-screen1 absolute inset-0 h-full w-full">
            <div className="roots-image absolute right-6 bottom-0 z-1 w-90 max-w-none">
              <Image src={image3} alt="Contemporary residence exterior" className="h-auto w-full mask-[url('/home/roots/mask3.svg')] mask-size-[100%] mask-center mask-no-repeat [-webkit-mask-image:url('/home/roots/mask3.svg')] [-webkit-mask-size:100%]" sizes="360px" />
            </div>

            <div className="relative z-1 mt-54 flex justify-center px-6">
              <h2 className="roots-huge huge text-left text-[6rem] leading-[0.8] whitespace-normal text-cream-dark uppercase">Your roots</h2>
            </div>

            <div className="roots-image absolute top-[58%] right-6 z-2 w-70 max-w-none">
              <Image src={image2} alt="Warm residential interior" className="h-auto w-full -translate-y-1/2 mask-[url('/home/roots/mask2.svg')] mask-size-[100%] mask-center mask-no-repeat [-webkit-mask-image:url('/home/roots/mask2.svg')] [-webkit-mask-size:100%]" sizes="280px" />
            </div>

            <div className="roots-image absolute bottom-0 left-6 z-2 w-70 max-w-none">
              <div className="h-auto w-full mask-[url('/home/roots/mask1.svg')] mask-size-[95%] mask-center mask-no-repeat [-webkit-mask-image:url('/home/roots/mask1.svg')] [-webkit-mask-size:95%]">
                <video src="/media/home/roots/image1.mp4" muted loop playsInline autoPlay preload="none" className="h-full w-full translate-y-1/10 scale-130 object-cover" aria-label="A calm residential living scene" />
              </div>
            </div>
          </div>

          <div className="roots-screen2 pointer-events-none absolute inset-0 z-10 flex h-full w-full items-end px-6 pb-30">
            <div className="w-full">
              <p className="roots-paragraph heading-2 text-[2.5rem] text-sand">In Belgrade Arbor, each residence is crafted not merely for living, but as a space that evolves alongside you</p>
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
