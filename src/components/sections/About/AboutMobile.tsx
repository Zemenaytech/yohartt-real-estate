import Image from "next/image"
import leafs from '@/assets/home/introduction/leafs.webp';
import tower from '@/assets/home/introduction/tower.webp';
import residence from '@/assets/home/introduction/residence.webp';
import craft from '@/assets/home/introduction/craft.webp';
import lobby from '@/assets/home/introduction/lobby.webp';
import Link from 'next/link'
export default function AboutMobile(){
return(
    <section id="about-mobile"
    className="introduction-mobile relative hidden max-md:block"
    >
    <div className="scroller-mobile text-cream relative h-[300vh] overflow-clip">
    <div className="sticky-mobile to-pine-green sticky top-0 left-0 flex h-screen w-full items-center overflow-clip bg-radial-[at_bottom_right] from-[#3E562E]">
    <Image
    src={leafs}
    alt="Background"
    className="leafs absolute top-0 right-[-10%] h-screen w-[120vw] max-w-none origin-top-right object-cover opacity-40 mix-blend-multiply"
    />
    <div className="screen1 absolute inset-0 h-full w-full">
    <div className="wrapper flex h-full flex-col justify-center">
    <p className="kicker mobile-preheading1 text-accent mb-5 uppercase">
    YOHART PROPERTIES VISION
    </p>
    <h2 className="heading-2 mobile-heading1 text-cream text-[2.25rem]">
        The visual identity of Yohart Properties is defined by architectural elegance and generous light,
         creating homes that elevate the skyline of Addis Ababa.
    </h2>
    </div>
    </div>
    <div className="screen2 absolute inset-0 h-full w-full">
    <div className="wrapper relative flex h-full justify-end">
    <div className="relative h-full w-full">
    <div className="mobile-image absolute top-1/2 right-0 w-64 -translate-y-1/2">
    <svg 
    viewBox="0 0 612 824" 
    preserveAspectRatio="xMidYMid meet" 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-full w-full overflow-visible">
    <defs>
     <clipPath id="introMobileClip1" clipPathUnits="userSpaceOnUse">
    <path d="M553.198 0.00122967L189.96 2.32976C163.484 2.49949 140.431 20.4481 133.781 46.0702L1.88108 554.296C-5.39412 582.328 8.9737 611.457 35.6469 622.752L499.834 819.32C537.355 835.208 579.21 808.786 580.992 768.087L611.943 60.9657C613.404 27.5877 586.616 -0.212979 553.198 0.00122967Z">
    </path>
    </clipPath>   
    </defs>
    <image
    href={tower.src}
    x="-20"
    y="-20"
    width="652"
    height="878"
    preserveAspectRatio="xMidYMid slice" 
    clipPath="url(#introMobileClip1)"
    />
    </svg>
    </div>
    <div className="mobile-image absolute top-1/2 left-0 w-46">
    <svg viewBox="0 0 563 559" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" 
    className="h-full w-full overflow-visible">
    <defs>
        <clipPath id="introMobileClip2" clipPathUnits="userSpaceOnUse">
            <path d="M0.00102513 662.73L1.39093e-10 67.2785C-8.67027e-05 23.7338 40.7156 -8.32866 82.9967 1.92087L291.561 52.4799C311.134 57.2245 327.547 70.5073 336.282 88.67L556.309 546.185C575.299 585.673 552.085 632.5 509.182 641.246L80.5926 728.624C38.9549 737.112 0.00109921 705.263 0.00102513 662.73Z">
                </path>
        </clipPath>
    </defs>
    <image
    href={craft.src}
    x="0"
    y="0"
    width="612"
    height="824"
    preserveAspectRatio="xMidYMid slice"
    clipPath="url(#introMobileClip2)"
    />
    </svg>
    </div>
    </div>
    </div>
    </div>
    <div className="screen3 absolute inset-0 h-full w-full">
    <div className="wrapper flex h-full items-center">
    <h2 className="heading-2 mobile-heading2 text-cream text-[2.25rem]">
        Yohart isn&#x27;t just building for the skyline; we engineer enduring homes designed around structural precision, quality materials, and transparent craftsmanship.
    </h2>

    </div>
    </div>
    <div className="screen4 absolute inset-0 h-full w-full">
    <div className="wrapper relative flex h-full justify-end">
        <div className="relative h-full w-full">
        <div className="mobile-image absolute top-1/6 right-0 w-46">
            <svg 
            viewBox="0 0 612 824" 
            preserveAspectRatio="xMidYMid meet" 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-full w-full overflow-visible"
            >
            <defs>
               <clipPath id="introMobileClip3" clipPathUnits="userSpaceOnUse">
                <path d="M612.999 748.068V103C612.999 53.8486 568.667 17.6575 522.631 29.2268L295.544 86.2962C274.234 91.6517 256.362 106.645 246.852 127.146L7.28559 616.516C-13.3912 661.088 11.8848 713.945 58.5972 723.818L525.25 822.446C570.586 832.028 612.999 796.077 612.999 748.068Z">
                    </path>
                </clipPath> 
            </defs>
            <image
            href={residence.src}
            x="-20"
            y="-20"
            width="652"
            height="878"
            preserveAspectRatio="xMidYMid slice" 
            clipPath="url(#introMobileClip3)"
            />
            </svg>
        </div>
        <div className="mobile-image absolute top-[40%] left-0 w-75">
            <svg viewBox="0 0 563 559" 
            preserveAspectRatio="xMidYMid meet" 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-full w-full overflow-visible">
                <defs>
                   <clipPath id="introMobileClip4" clipPathUnits="userSpaceOnUse">
                    <path d="M536.07 261.245L562.89 534.277C564.225 547.866 553.215 559.504 539.519 558.983L39.3218 539.961C27.4842 539.511 18.0011 530.038 17.5825 518.245L0.0149346 23.3565C-0.589468 6.32949 17.2665 -5.17794 32.6102 2.35034L523.555 243.229C530.574 246.673 535.308 253.488 536.07 261.245Z">
                    </path>
                    </clipPath> 
                </defs>
            <image
            href={lobby.src}
            x="0"
            y="0"
            width="612"
            height="824"
            preserveAspectRatio="xMidYMid slice" 
            clipPath="url(#introMobileClip4)"
            />
            </svg>
        </div>
        </div>
    </div>
    </div>
    <div className="screen5 absolute inset-0 h-full w-full">
    <div className="wrapper flex h-full flex-col justify-center gap-15 px-2">
    <h2 className="hero mobile-heading3 text-cream leading-[1.1] uppercase">A New Chapter in Prestigious Living</h2>
    <div className="w-3/4 self-end">
    <p className="paragraph mobile-paragraph1 text-cream">A clear architectural vision, prime Addis Ababa locations, and carefully engineered residences make Yohart Properties a destination where quality, comfort, and long-term value naturally converge.</p>
    <Link className="mobile-link link text-accent mt-10 inline-block uppercase" href="/#tower">Explore Yohart Tower</Link>
    </div>
    </div>
    </div>
    <div className="absolute top-23 left-6 flex items-center gap-5">
    <div className="bg-green relative h-px w-32">
    <div className="progress-fill bg-accent absolute top-0 left-0 h-full w-0" />

    </div>
    <div className="small text-green relative h-[1em] w-[2ch] leading-none">
    <span className="progress-num-1 absolute inset-0">01</span>
    <span className="progress-num-2 absolute inset-0">02</span>
    <span className="progress-num-3 absolute inset-0">03</span>
    <span className="progress-num-4 absolute inset-0">04</span>
    <span className="progress-num-5 absolute inset-0">05</span>
    </div>
    </div>
    </div>
    </div>
    </section>
)
}