import Image from 'next/image';
import residence from "@/assets/home/residences/residences-hero.webp"
export default function Residences() {
  return (
<section id="Residences" className="relative z-1">
    <div className="trigger relative flex min-h-screen w-full flex-col items-stretch justify-between gap-25 overflow-clip pb-16 max-2xl:gap-20 max-2xl:pb-10 max-md:gap-20 max-md:pb-12">
        <Image 
        src={residence}
        alt="Residences background" 
        className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover object-top max-2xl:object-[50%_70%] max-lg:object-[70%_80%]" 
        loading="eager"
        />
        <div className="wrapper relative z-1 flex items-stretch gap-5 max-lg:flex-col max-md:items-end">
            <div className="w-1/12 max-2xl:hidden"/>
            <div className="w-1/3 pt-50 max-2xl:pt-15 max-lg:w-2/3 max-lg:pt-60 max-md:w-3/4 max-md:pt-30">
            <div className="videoWrap relative aspect-[1.43/1] w-full overflow-hidden rounded-[1.25rem]">
            <video 
            muted 
            loop 
            playsInline 
            preload="none" 
            className="portrait absolute -top-35 left-1/2 h-auto w-[160%] max-w-none -translate-x-1/2 object-cover">
            </video>
            </div>
            </div>
           <div className="ml-auto flex w-2/7 items-center self-stretch max-2xl:w-1/2 max-lg:w-full relative left-0.5">
  <p className="paragraph text-golden max-lg:w-full">
    Designed with contemporary living in mind, each apartment at Belgrade Arbor balances functionality, comfort, and aesthetics. Open-plan layouts, excellent natural light, refined materials, and carefully considered details create spaces that feel both welcoming and enduring.
  </p>
</div>
            </div>
            <div className="wrapper flex items-end gap-5 max-2xl:flex-1 max-2xl:flex-col max-2xl:items-start max-2xl:justify-between max-lg:gap-35">
                <div className="w-7/12 max-2xl:mb-10 max-2xl:w-full">
                <h2 className="hero text-golden uppercase">Residences</h2>
                </div>
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-36 z-1"
              style={{
                background: 'linear-gradient(to top, rgba(244, 236, 213, 0.7) 0%, transparent 100%)',
              }}
            />
                </div>
            </section>
  );
}
