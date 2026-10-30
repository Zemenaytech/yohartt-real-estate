import Image from "next/image"
import location from "@/assets/home/location/location.webp"
export default function Location(){
    return(
        <section id="Location" className="relative z-1">
            <div className="trigger relative flex min-h-screen w-full items-stretch overflow-clip">
                <Image
                src={location}
                alt="Location"
                className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover object-[20%_50%]"

                />
                <div className="pointer-events-none absolute inset-0 bg-black/20"/>
                <div className="wrapper relative z-1 flex items-stretch max-lg:flex-col">
                <div className="w-1/12 max-2xl:hidden"/>
                <div className="w-1/3 pt-30 max-lg:w-2/3 max-lg:pt-10 max-md:w-3/4 max-md:self-end max-md:pt-20">
                <div className="videoWrap relative aspect-[1.43/1] w-full overflow-hidden rounded-[1.25rem]">
                <video
                muted
                loop
                playsInline
                preload="none"
                className="portrait absolute -top-25 left-1/2 h-auto w-[150%] max-w-none -translate-x-1/2 object-cover"
                />
                </div>

                </div>
                <div className="flex w-7/12 flex-col items-end justify-between py-30 max-2xl:w-2/3 max-lg:h-full max-lg:w-full max-lg:pt-50 max-lg:pb-10 max-md:items-start max-md:gap-10 max-md:pt-23">
                <p className="paragraph text-sand w-3/7 max-2xl:w-1/2 max-md:w-3/4">
                At one of New Belgrade&#x27;s most dynamic locations,
                on Bulevar heroja sa Košara, Belgrade Arbor is taking shape
                 as a contemporary residential and commercial development that seamlessly brings
                  together refined architecture, everyday comfort, and enduring value.
                </p>
                <h2 className="hero text-cream-dark uppercase max-lg:mt-50 max-md:mt-0">
                Location
                </h2>
                </div>
                </div>

            </div>
        </section>
    )
}
