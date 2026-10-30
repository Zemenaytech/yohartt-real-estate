import Image from 'next/image';
import business from "@/assets/home/business/business.webp"
export default function BusinessSpaces() {
  return (
<section id="BusinessSpaces" className="relative z-1">
  <div className="trigger relative flex min-h-screen w-full items-stretch overflow-clip py-30 max-xl:py-20 max-lg:pt-40 max-lg:pb-30">
    <Image src={business}
    alt="Location"
    className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover"
    
    />
    <div className="wrapper relative z-1 flex flex-col justify-between max-lg:gap-30 max-md:gap-12">
      <h2 className="hero text-cream-dark uppercase max-xl:w-full max-lg:whitespace-normal w-3/4 max-md:w-3/4">Office spaces and retails</h2>
      <div className="flex items-end justify-between gap-5 max-lg:flex-col max-lg:items-start">
        <div className="flex w-1/4 flex-col items-end justify-between max-xl:w-1/3 max-lg:w-2/3 max-md:w-full">
        <div className="hidden w-1/4 max-lg:block"/>
        <p className="paragraph text-sand max-lg:w-3/4">
        Business spaces and retail units at Belgrade Arbor are designed for companies of all sizes that see their business address as more than just a location—it is a reflection of their identity, reputation, and long-term vision.
        </p>
        </div>
        <div className="w-5/12 pt-30 max-xl:w-1/3 max-lg:w-2/3 max-lg:self-end max-lg:pt-10 max-md:w-3/4 max-md:pt-30">
        <div className="videoWrap relative aspect-[1.43/1] w-4/5 overflow-hidden rounded-[1.25rem] max-xl:w-full">
        <video muted loop playsInline preload="none" className="portrait absolute -top-35 left-1/2 h-auto w-[180%] max-w-none -translate-x-1/2 object-cover"></video>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
  );
}
