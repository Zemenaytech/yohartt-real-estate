import Image from 'next/image';
import residenceBg from "@/assets/home/residences/residences-hero.webp";
import { FloorExplorer } from '../../FloorExplorer';

export function TowerFacts() {
  return (
    <dl className="facts" data-reveal="">
      <div><dt><span data-count="14">14</span></dt><dd>Levels of homes</dd></div>
      <div><dt>G</dt><dd>Covered parking &amp; arrival</dd></div>
      <div><dt>Glass</dt><dd>Full-width glazing</dd></div>
      <div><dt>AA</dt><dd>Addis Ababa, Ethiopia</dd></div>
    </dl>
  );
}

export function TowerSection() {
  return (
    <section className="tower-explorer relative z-1" id="tower" aria-labelledby="tower-title">
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
        <Image
          src={residenceBg}
          alt=""
          aria-hidden="true"
          className="background absolute inset-0 h-full w-full object-cover scale-x-[-1]"
          priority
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36"
          style={{
            background: 'linear-gradient(to bottom, rgba(244, 236, 213, 0.7) 0%, transparent 100%)',
          }}
        />
      </div>
      <div className="tower-explorer__right relative z-1">
        <FloorExplorer><TowerFacts /></FloorExplorer>
      </div>
    </section>
  );
}
