import Image from 'next/image';
import residence from "@/assets/home/residences/residences-hero.webp"
export default function Residences() {
  // -mt-px: overlaps the section above by a pixel so no hairline shows between them.
  return (
<section id="Residences" className="relative z-1 -mt-px">
    <div className="trigger relative flex min-h-screen w-full flex-col items-stretch justify-between gap-25 overflow-clip pb-16 max-2xl:gap-20 max-2xl:pb-10 max-md:gap-20 max-md:pb-12">
        <Image 
        src={residence}
        alt="Residences background" 
        className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover object-top max-2xl:object-[50%_70%] max-lg:object-[70%_80%]" 
        loading="eager"
        />
        {/* Fades in from the cream "What's around" section above. */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-px z-1 h-40"
          style={{ background: 'linear-gradient(to bottom, #fcfaf0 0%, rgba(252, 250, 240, 0) 100%)' }}
        />
        <div className="wrapper relative z-1 flex items-stretch gap-5 max-lg:flex-col max-md:items-end">
            <div className="w-1/12 max-2xl:hidden"/>
            <div className="w-1/3 pt-32 max-2xl:pt-12 max-lg:w-2/3 max-lg:pt-40 max-md:w-3/4 max-md:pt-20">
            <figure className="w-full max-w-[22rem] lg:w-[18vw]">
              <div className="videoWrap relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] bg-black/20">
                <video 
                  src="/media/home/residences/interior.mp4"
                  muted 
                  loop 
                  playsInline 
                  preload="metadata" 
                  poster="/media/home/residences/poster.webp"
                  className="residences-video absolute inset-0 h-full w-full object-cover object-[center_60%]">
                </video>
              </div>
              <figcaption className="small text-golden/70 mt-3 tracking-[0.08em] uppercase">
                Interior living &amp; balconies
              </figcaption>
            </figure>
            </div>
           <div className="ml-auto flex max-w-lg items-center self-stretch max-2xl:max-w-md max-lg:w-full">
  <p className="paragraph text-golden max-lg:w-full">
    Designed with contemporary living in mind, each apartment at Yohart Tower balances functionality, comfort, and aesthetics. Open-plan layouts, excellent natural light, refined materials, and carefully considered details create spaces that feel both welcoming and enduring.
  </p>
</div>
            </div>
            <div className="wrapper relative z-2 flex items-end gap-5 max-2xl:flex-1 max-2xl:flex-col max-2xl:items-start max-2xl:justify-between max-lg:gap-35">
                <div className="w-7/12 max-2xl:mb-10 max-2xl:w-full">
                <h2 className="hero text-golden uppercase">Residences</h2>
                </div>
            </div>
            {/* Ends on the tower section's solid colour so the two join without a seam. */}
            <div
              className="pointer-events-none absolute inset-x-0 -bottom-px h-48 z-1"
              style={{
                background: 'linear-gradient(to top, #f4ecd5 0%, rgba(244, 236, 213, 0) 100%)',
              }}
            />
                </div>
            </section>
  );
}
