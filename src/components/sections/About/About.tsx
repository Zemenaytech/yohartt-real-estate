import Image from "next/image"
import leafs from '@/assets/home/introduction/leafs.webp';
import tower from '@/assets/home/introduction/tower.webp';
import residence from '@/assets/home/introduction/residence.webp';
import craft from '@/assets/home/introduction/craft.webp';
import lobby from '@/assets/home/introduction/lobby.webp';
import Link from 'next/link'
export function About(){
    return (
        <section id="about"
        className="relative max-md:hidden">
        <div
        className="scroller text-cream relative h-[420vh] overflow-clip"
        >
        <div
        className="to-pine-green isolate sticky top-0 left-0 flex h-screen w-full items-center overflow-clip bg-radial-[at_bottom_right] from-[#3E562E]"
        >
    <Image
        src={leafs}
        alt="Background"
        width={1921}
        height={1280}
        loading="lazy"
        className="leafs pointer-events-none absolute top-0 right-[-10%] h-screen w-screen origin-top-right scale-120 object-cover object-center opacity-40 mix-blend-multiply"
        />
        <div
        className="intro-parallax absolute inset-0"
        >
            <div className="morphs absolute inset-0 h-full w-full" >
            <div className="wrapper relative flex h-full justify-end">
            <div className="morphWrapper relative h-full w-1/2 max-lg:w-full">
            <div id="frame1" style={{"position":"absolute"}}
            className="absolute top-0 right-0 z-1 h-full w-150 max-xl:w-103 max-lg:h-[50vh] max-lg:top-auto max-lg:bottom-10 max-lg:-right-10"
            >
            <svg viewBox="0 0 612 824" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
            style={{"width":"100%","height":"100%","overflow":"visible"}}
            >
            <defs>
                <clipPath
                id="morphClip1"
                clipPathUnits={"userSpaceOnUse"}
                >
                <path d="M553.198 0.00122967L189.96 2.32976C163.484 2.49949 140.431 20.4481 133.781 46.0702L1.88108 554.296C-5.39412 582.328 8.9737 611.457 35.6469 622.752L499.834 819.32C537.355 835.208 579.21 808.786 580.992 768.087L611.943 60.9657C613.404 27.5877 586.616 -0.212979 553.198 0.00122967Z"></path>

                </clipPath>
            </defs>
            
  <image
    className="morph1ImgA"
    href={tower.src}
    x="-20"
    y="-20"
    width="652"
    height="878"
    preserveAspectRatio="xMidYMid slice"
    clipPath="url(#morphClip1)"
  />
  <image
  className="morph1ImgB"
  href={residence.src}
  x="-20"
  y="-20"
  width="652"
  height="878"
  preserveAspectRatio="xMidYMid slice"
  clipPath="url(#morphClip1)"
  style={{"opacity":"0"}}
  />
            </svg>
            </div>
        <div id="frame2"
        style={{"position":"absolute"}} className="absolute bottom-25 -left-10 h-108 w-82 max-xl:w-56 max-lg:bottom-10 max-lg:left-0"
        >
            <svg
            viewBox="0 0 563 559" 
            preserveAspectRatio="xMidYMid meet" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{"width":"100%","height":"100%","overflow":"visible"}}
            >
            <defs>
             <clipPath id="morphClip2" 
             clipPathUnits="userSpaceOnUse">
            <path d="M0.00102513 662.73L1.39093e-10 67.2785C-8.67027e-05 23.7338 40.7156 -8.32866 82.9967 1.92087L291.561 52.4799C311.134 57.2245 327.547 70.5073 336.282 88.67L556.309 546.185C575.299 585.673 552.085 632.5 509.182 641.246L80.5926 728.624C38.9549 737.112 0.00109921 705.263 0.00102513 662.73Z">
            </path>
            </clipPath> 
            </defs> 
            <image
            className="morph2ImgA"
            href={lobby.src}
            x="-10"
            y="-10"
            width="583"
            height="755"
            preserveAspectRatio="xMidYMid slice" 
            clipPath="url(#morphClip2)" 
            style={{"opacity":"1"}}
            />
            <image
            className="morph2ImgB"
            href={craft.src}
            x="-10"
            y="-10"
            width="583"
            height="755"
            preserveAspectRatio="xMidYMid slice" 
            clipPath="url(#morphClip2)" 
            style={{"opacity":"0"}}
            />             
            </svg>
        </div>

            </div>
            </div>
            </div>
        <div
        className="screen1 absolute inset-0 h-full w-full pt-20"
        >
            <div className="wrapper">
            <div className="w-5/12 space-y-10 max-xl:w-1/2 max-lg:w-full">
                <p className="kicker preheading1 text-accent uppercase">
                    YOHART PROPERTIES VISION
                </p>
                <h2 className="heading-2 heading1" >
                  The visual identity of Yohart Properties is defined by architectural elegance and generous light, creating homes that elevate the skyline of Addis Ababa.  
                </h2>
                <div className="button1Wrap mt-20 max-xl:mt-10">
                  <Link href="/#tower">
                    <button
                      data-slot="button"
                      data-variant="darkOutline"
                      data-size="default"
                      className="inline-flex menu cursor-pointer border shrink-0 min-w-55 items-center justify-center gap-2 uppercase whitespace-nowrap [&_svg]:transition-all transition-all outline-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none bg-transparent border-green hover:bg-green/40 [&_svg]:text-green text-cream active:[&_svg]:text-cream-dark active:border-cream-dark active:bg-green h-14 px-5 py-5 has-[>svg]:px-5 rounded-full max-md:h-12 max-md:py-3 group relative"
                    >
                      <span className="relative z-1 block w-full overflow-hidden">
                        <span className="flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:-translate-y-full has-[>svg]:justify-between">
                          Explore The Tower
                          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                            <path d="M15.1939 4.70031L7.95751 8.66988C7.48423 8.9295 7.19067 9.42216 7.19067 9.95675V18.2779C7.19067 18.8125 7.48423 19.3051 7.95751 19.5648L15.1939 23.5343C15.6442 23.7814 16.1917 23.7814 16.6419 23.5343L23.8783 19.5648C24.3517 19.3051 24.6452 18.8125 24.6452 18.2779V9.95675C24.6452 9.42216 24.3517 8.9295 23.8783 8.66988L16.6419 4.70031C16.1917 4.45331 15.6442 4.45331 15.1939 4.70031Z" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.64526 10.3409L15.918 14.7727L23.1907 10.3409" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.918 22.1591V14.7727" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M26.0996 14.856C28.7957 16.1064 30.4632 17.8338 30.4632 19.7418C30.4632 21.2227 29.4587 22.5949 27.7483 23.7196" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24.6453 25.1752C22.1962 26.1136 19.0982 26.6742 15.7291 26.6742C7.80017 26.6742 1.37256 23.5699 1.37256 19.7406C1.37256 17.8352 2.96402 16.1093 5.53999 14.856" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21.7361 25.1969L26.0997 25.579L22.6749 28.1515" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="absolute top-full left-0 flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:top-0 has-[>svg]:justify-between">
                          Explore The Tower
                          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                            <path d="M15.1939 4.70031L7.95751 8.66988C7.48423 8.9295 7.19067 9.42216 7.19067 9.95675V18.2779C7.19067 18.8125 7.48423 19.3051 7.95751 19.5648L15.1939 23.5343C15.6442 23.7814 16.1917 23.7814 16.6419 23.5343L23.8783 19.5648C24.3517 19.3051 24.6452 18.8125 24.6452 18.2779V9.95675C24.6452 9.42216 24.3517 8.9295 23.8783 8.66988L16.6419 4.70031C16.1917 4.45331 15.6442 4.45331 15.1939 4.70031Z" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.64526 10.3409L15.918 14.7727L23.1907 10.3409" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.918 22.1591V14.7727" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M26.0996 14.856C28.7957 16.1064 30.4632 17.8338 30.4632 19.7418C30.4632 21.2227 29.4587 22.5949 27.7483 23.7196" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24.6453 25.1752C22.1962 26.1136 19.0982 26.6742 15.7291 26.6742C7.80017 26.6742 1.37256 23.5699 1.37256 19.7406C1.37256 17.8352 2.96402 16.1093 5.53999 14.856" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21.7361 25.1969L26.0997 25.579L22.6749 28.1515" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  </Link>
                </div>
            </div>
            </div>

        </div>
        <div className="screen2 absolute inset-0 h-full w-full pt-20">
        <div className="wrapper max flex justify-end">
        <div className="w-1/2 pt-15 max-lg:w-full max-lg:pt-[40vh]">
        <h2 className="heading-2 heading2">Yohart isn&#x27;t just building for the skyline; we engineer enduring homes designed around structural precision, quality materials, and transparent craftsmanship.</h2>
        <div className="button2Wrap mt-30 max-xl:mt-20 max-lg:mt-10">
          <Link href="/projects">
            <button
              data-slot="button"
              data-variant="darkOutline"
              data-size="default"
              className="inline-flex menu cursor-pointer border shrink-0 min-w-55 items-center justify-center gap-2 uppercase whitespace-nowrap [&_svg]:transition-all transition-all outline-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none bg-transparent border-green hover:bg-green/40 [&_svg]:text-green text-cream active:[&_svg]:text-cream-dark active:border-cream-dark active:bg-green h-14 px-5 py-5 has-[>svg]:px-5 rounded-full max-md:h-12 max-md:py-3 group relative"
            >
              <span className="relative z-1 block w-full overflow-hidden">
                <span className="flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:-translate-y-full has-[>svg]:justify-between">
                  View Projects
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                    <path d="M15.1939 4.70031L7.95751 8.66988C7.48423 8.9295 7.19067 9.42216 7.19067 9.95675V18.2779C7.19067 18.8125 7.48423 19.3051 7.95751 19.5648L15.1939 23.5343C15.6442 23.7814 16.1917 23.7814 16.6419 23.5343L23.8783 19.5648C24.3517 19.3051 24.6452 18.8125 24.6452 18.2779V9.95675C24.6452 9.42216 24.3517 8.9295 23.8783 8.66988L16.6419 4.70031C16.1917 4.45331 15.6442 4.45331 15.1939 4.70031Z" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.64526 10.3409L15.918 14.7727L23.1907 10.3409" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.918 22.1591V14.7727" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M26.0996 14.856C28.7957 16.1064 30.4632 17.8338 30.4632 19.7418C30.4632 21.2227 29.4587 22.5949 27.7483 23.7196" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24.6453 25.1752C22.1962 26.1136 19.0982 26.6742 15.7291 26.6742C7.80017 26.6742 1.37256 23.5699 1.37256 19.7406C1.37256 17.8352 2.96402 16.1093 5.53999 14.856" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21.7361 25.1969L26.0997 25.579L22.6749 28.1515" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="absolute top-full left-0 flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:top-0 has-[>svg]:justify-between">
                  View Projects
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                    <path d="M15.1939 4.70031L7.95751 8.66988C7.48423 8.9295 7.19067 9.42216 7.19067 9.95675V18.2779C7.19067 18.8125 7.48423 19.3051 7.95751 19.5648L15.1939 23.5343C15.6442 23.7814 16.1917 23.7814 16.6419 23.5343L23.8783 19.5648C24.3517 19.3051 24.6452 18.8125 24.6452 18.2779V9.95675C24.6452 9.42216 24.3517 8.9295 23.8783 8.66988L16.6419 4.70031C16.1917 4.45331 15.6442 4.45331 15.1939 4.70031Z" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.64526 10.3409L15.918 14.7727L23.1907 10.3409" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.918 22.1591V14.7727" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M26.0996 14.856C28.7957 16.1064 30.4632 17.8338 30.4632 19.7418C30.4632 21.2227 29.4587 22.5949 27.7483 23.7196" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24.6453 25.1752C22.1962 26.1136 19.0982 26.6742 15.7291 26.6742C7.80017 26.6742 1.37256 23.5699 1.37256 19.7406C1.37256 17.8352 2.96402 16.1093 5.53999 14.856" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21.7361 25.1969L26.0997 25.579L22.6749 28.1515" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </button>
          </Link>
        </div>

        </div>
        </div>
        </div>
        <div className="screen3 absolute inset-0 h-full w-full pt-20">
        <div className="wrapper flex flex-col pt-15 max-lg:pt-2">
        <h2 className="hero heading3 w-full uppercase max-xl:text-[7.5rem] max-lg:text-[5.375rem]">A New Chapter in Prestigious Living</h2>
        <div className="w-1/2 self-end pt-25 max-xl:w-5/12 max-xl:pt-0 max-lg:w-1/2 max-lg:pt-20" >
        <p className="paragraph1 paragraph w-1/2 max-xl:w-3/5 max-lg:w-full">
        A clear architectural vision, prime Addis Ababa locations, and carefully engineered residences make Yohart Properties a destination where quality, comfort, and long-term value naturally converge.
        </p>
        <Link className="link text-accent mt-10 inline-block" href="/#tower">
        Explore Yohart Tower
        </Link>
        </div>
        </div>
        </div>
        <div className="absolute bottom-20 left-20 flex items-center gap-5 max-lg:bottom-10 max-lg:left-10">
        <div className="bg-green relative h-px w-70">
        <div className="progress-fill bg-accent absolute top-0 left-0 h-full w-0"/> 
        </div>
        <div className="small text-green relative h-[1em] w-[2ch] leading-none">
        <span className="progress-num-1 absolute inset-0">01</span>
        <span className="progress-num-2 absolute inset-0">02</span>
        <span className="progress-num-3 absolute inset-0">03</span>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
    )
}

export default About;