import Image from "next/image";
import image from "@/assets/home/footer/front.webp";
import imageMobile from "@/assets/home/footer/front.webp";
export default function Installment() {
  return (
    <section id="Installment">
      <div className="installment-trigger trigger relative flex min-h-screen items-stretch overflow-clip max-md:min-h-auto max-md:flex-col">
        <div className="installment-reveal-image absolute top-0 left-0 z-0 h-full w-[55vw] max-xl:w-1/2 max-lg:w-full max-md:hidden max-md:h-[34rem] max-md:w-full bg-[linear-gradient(180deg,#8AB6D2_0%,#7aa9c9_100%)]">
          <div className="relative h-full w-full">
            <div className="reveal-image-zoom relative h-full w-full overflow-hidden">
              <Image
                src={image}
                alt="Installment plan"
                loading="lazy"
                decoding="async"
                fill
                className="installment-parallax object-cover object-center max-lg:hidden"
              />
              <Image
                src={imageMobile}
                alt="Installment plan"
                loading="lazy"
                decoding="async"
                fill
                className="installment-parallax object-cover object-center hidden max-lg:block"
              />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-[45vw] bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] max-xl:w-1/2 max-lg:hidden" />
        <div className="installment-reveal-content relative z-1 flex w-full justify-end max-lg:px-10 max-md:hidden">
          <div className="wrapper flex justify-end py-20 max-xl:py-15 max-lg:px-0 max-lg:py-15">
            <div className="flex w-5/12 flex-col max-xl:w-1/2 max-lg:mt-120 max-lg:w-full max-lg:rounded-2xl max-lg:bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] max-lg:px-8 max-lg:py-8">
              <div className="flex h-full flex-col justify-between gap-16 pl-10 max-xl:pl-17 max-lg:relative max-lg:pl-0 max-md:gap-4 ">
                <div className="max-lg:flex max-lg:gap-15 max-md:flex-col max-md:gap-3">
                  <p className="heading-2 text-cream-dark mb-15 max-md:mb-0">
                    Installment plan
                  </p>
                  <ul className="divide-cream-dark/40 divide-y">
                    <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                      <p className="heading-2 text-accent w-[2em] shrink-0 translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                        40%
                      </p>
                      <p className="detail text-sand">Prepayment</p>
                    </li>
                    <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                      <p className="heading-2 text-accent w-[2em] shrink-0 translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                        20%
                      </p>
                      <p className="detail text-sand">12 floor</p>
                    </li>
                    <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                      <p className="heading-2 text-accent w-[2em] shrink-0 translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                        20%
                      </p>
                      <p className="detail text-sand">15 floor</p>
                    </li>
                    <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                      <p className="heading-2 text-accent w-[2em] shrink-0 translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                        5%
                      </p>
                      <p className="detail text-sand">Blocks and Plastering</p>
                    </li>
                    <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                      <p className="heading-2 text-accent w-[2em] shrink-0 translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                        5%
                      </p>
                      <p className="detail text-sand">Handover</p>
                    </li>
                  </ul>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        <div className="installment-reveal-content hidden w-full max-md:block" />
      </div>
    </section>
  );
}
