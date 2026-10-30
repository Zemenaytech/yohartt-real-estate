import Image from 'next/image';
import amenities from "@/assets/home/amenities/amenities-bg.webp"
export default function Amenities() {
  return (
<section id="Amenities" className="relative z-1">
  <div className="trigger relative flex min-h-screen w-full items-stretch overflow-clip">
    <Image src={amenities}
    alt="Amenities"
    className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover max-md:object-[60%_50%]"
    />
    <div className="wrapper relative z-1 flex items-stretch max-lg:flex-col-reverse max-md:flex-col">
      <div className="flex w-1/3 flex-col items-start justify-between py-30 max-lg:w-2/3 max-lg:flex-col-reverse max-lg:pt-0 max-lg:pb-15 max-md:w-3/4 max-md:pt-10 max-md:pb-5">
      <div className="videoWrap relative aspect-[1.43/1] w-full overflow-hidden rounded-[1.25rem]">
      <video muted loop playsInline preload="none" className="portrait absolute -top-35 left-1/2 h-auto w-[200%] max-w-none -translate-x-1/2 object-cover"></video>
      </div>
      <p className="paragraph text-sand w-3/4 max-xl:w-full max-lg:mb-40 max-md:hidden">
      Belgrade Arbor is more than a residence. It features two private gyms, two exclusive rooftop parks for residents and their guests, and a top-floor café-restaurant. These are curated spaces for unwinding and socializing a true sanctuary from the urban hustle, right at your doorstep.
      </p>
      </div>
      <div className="flex w-2/3 flex-col items-end justify-end gap-5 py-30 max-lg:items-start max-lg:pt-55 max-lg:pb-8 max-md:w-full max-md:flex-1 max-md:pt-0">
      <h2 className="hero text-cream-dark whitespace-nowrap uppercase max-xl:text-[8rem] max-lg:text-[6.5rem] max-md:text-[3rem]">
        Amenities
        </h2>
        <p className="paragraph text-sand mt-auto hidden w-3/4 pt-10 max-md:block">
        Belgrade Arbor is more than a residence. It features two private gyms, two exclusive rooftop parks for residents and their guests, and a top-floor café-restaurant. These are curated spaces for unwinding and socializing a true sanctuary from the urban hustle, right at your doorstep.
        </p>
        </div>
        </div>
        </div>
        </section>
  );
}
