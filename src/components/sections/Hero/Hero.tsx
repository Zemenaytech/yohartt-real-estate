'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-svh bg-[#F7F1E4]">
      <video
        muted
        playsInline
        preload="auto"
        className="block h-full w-full object-cover"
      ></video>

      <div
        className="loader fixed inset-0 z-1000 flex flex-col items-center justify-center gap-10 text-[#AD824B]"
        style={{
          background:
            'linear-gradient(135deg, #FDFBEF 0%, #F8F2E7 55%, #EFE7D8 100%)',
        }}
      >
        <Image
          src="/media/home/yohartload.png"
          alt="Yoha Logo"
          width={200}
          height={200}
          className="h-50 w-auto object-contain"
          priority
        />

        <div className="h-0.5 w-75 overflow-hidden rounded-full bg-[#AD824B]/20">
          <div
            className="loader-bar h-0.5 rounded-full bg-[#AD824B] shadow-[0_0_12px_rgba(173,130,75,0.5)]"
            style={{ width: "0%" }}
          ></div>
        </div>

        <p className="heading-3 mt-4 text-[#AD824B]">0%</p>
      </div>

      <div className="absolute inset-0 flex items-end justify-center bg-transparent py-15 opacity-0 max-md:py-10">
   <h1 className="heading huge bg-gradient-to-r from-[#87622F] via-[#AD824B] to-[#D9B87F] bg-clip-text text-transparent text-center text-[9.5vw] font-normal uppercase max-md:text-[17vw]">
  YOHART PROPERTIES
</h1>
      </div>
    </div>
  );
}
