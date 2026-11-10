import Image from "next/image"
import location from "@/assets/home/location/location.webp"
export default function Location(){
    return(
        <section id="Location" className="relative z-1">
            <div className="trigger relative flex min-h-screen w-full items-stretch overflow-clip">
                <Image
                src={location}
                alt="The Addis Ababa skyline from the Yohart Tower site in Megenagna, above a reinforced slab"
                className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover object-[50%_40%]"
                loading="eager"
                sizes="100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/20"/>
                {/* The photo is brightest on the right, where the text sits:
                    shade that side so the paragraph reads clearly. */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,rgba(20,27,16,0.62)_0%,rgba(20,27,16,0.38)_45%,rgba(20,27,16,0)_75%)] max-md:bg-[rgba(20,27,16,0.4)]"/>
                <div className="wrapper relative z-1 flex items-stretch max-lg:flex-col">
                <div className="w-1/12 max-2xl:hidden"/>
                <div className="w-1/3 pt-24 max-2xl:pt-12 max-lg:w-2/3 max-lg:pt-10 max-md:w-3/4 max-md:self-end max-md:pt-16">
                <figure className="w-full max-w-[22rem] lg:w-[18vw]">
                  <div className="videoWrap relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] bg-black/20">
                    <video
                      src="/media/home/location/location.mp4"
                      poster="/media/home/location/poster.webp"
                      autoPlay
                      muted 
                      loop
                      playsInline
                      preload="metadata"
                      className="location-video absolute inset-0 h-full w-full object-cover object-center"
                    />
                  </div>
                  <figcaption className="small text-cream/70 mt-3 tracking-[0.08em] uppercase">
                    Site overlooking Megenagna
                  </figcaption>
                </figure>
                </div>
                <div className="flex w-7/12 flex-col items-end justify-between py-24 max-2xl:w-2/3 max-2xl:py-16 max-lg:h-full max-lg:w-full max-lg:pt-20 max-lg:pb-10 max-md:items-start max-md:gap-10 max-md:pt-16">
                <p className="paragraph text-cream max-w-lg text-[max(1.25rem,16px)] leading-[1.45] [text-shadow:0_1px_14px_rgba(0,0,0,0.35)] max-2xl:max-w-md max-md:w-full">
                At one of Addis Ababa&#x27;s most dynamic and prestigious locations, 
                behind the British Embassy in Megenagna, Yohart Tower is taking shape
                 as a contemporary residential and commercial development that seamlessly brings
                  together refined architecture, everyday comfort, and enduring value.
                </p>
                <h2 className="hero text-cream-dark uppercase max-lg:mt-32 max-md:mt-0">
                Location
                </h2>
                </div>
                </div>
               
            </div>
        </section>
    )
}
