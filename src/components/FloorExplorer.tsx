'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import towerRender from '@/assets/img/tower-render.png';
import {
  DEFAULT_FLOOR,
  FACADE_RIGHT_X,
  FLOORS,
  TOWER_VIEWBOX,
  getFloor,
  type Floor,
  type Point,
} from '@/data/floors';
import { useEnquiry } from './EnquiryContext';
import { ArrowRight } from './icons';

const { width: VW, height: VH } = TOWER_VIEWBOX;
const toAttr = (pts: Point[]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const floorOf = (id: string) => getFloor(id) as Floor;
const INITIAL_POINTS = toAttr(floorOf(DEFAULT_FLOOR).points);

/**
 * Hover/tap a floor on the rendering (or use the elevator buttons) to spotlight it.
 * "Enquire" hands the chosen floor to the contact form via EnquiryContext.
 */
export function FloorExplorer({ interest = 'Yohartt Tower', children }: { interest?: string; children?: ReactNode }) {
  const { setFloor, setInterest } = useEnquiry();
  const [selected, setSelected] = useState(DEFAULT_FLOOR);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const cutRef = useRef<SVGPolygonElement>(null);
  const highlightRef = useRef<SVGPolygonElement>(null);
  const pointsRef = useRef<Point[]>(floorOf(DEFAULT_FLOOR).points.map(([x, y]) => [x, y]));
  const pulseTimer = useRef(0);

  const shownId = hovered ?? selected;
  const shown = floorOf(shownId);

  // glide the spotlight (mask cut-out + outline) to the shown floor
  useEffect(() => {
    const target = floorOf(shownId).points;
    const from = pointsRef.current.map(([x, y]) => [x, y] as Point);
    const apply = (pts: Point[]) => {
      pointsRef.current = pts;
      const attr = toAttr(pts);
      cutRef.current?.setAttribute('points', attr);
      highlightRef.current?.setAttribute('points', attr);
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = 1 - Math.pow(1 - Math.min(1, (now - start) / 420), 3);
      apply(from.map(([x, y], i) => [x + (target[i][0] - x) * t, y + (target[i][1] - y) * t]));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shownId]);

  useEffect(() => () => clearTimeout(pulseTimer.current), []);

  const select = (id: string) => {
    setSelected(id);
    setActive(true);
    clearTimeout(pulseTimer.current);
    pulseTimer.current = window.setTimeout(() => {
      if (!frameRef.current?.matches(':hover')) setActive(false);
    }, 1600);
  };

  const tagTop = (((shown.points[1][1] + shown.points[2][1]) / 2 / VH) * 100).toFixed(2);
  const selectedFloor = floorOf(selected);

  return (
    <div className="explorer">
      <div className="explorer__stage" data-reveal="clip">
        <div
          ref={frameRef}
          className={active ? 'explorer__frame is-active' : 'explorer__frame'}
          onPointerEnter={() => setActive(true)}
          onPointerLeave={() => {
            setActive(false);
            setHovered(null);
          }}
        >
          <Image
            src={towerRender}
            alt="Yohartt Tower rendering with each floor selectable"
            sizes="(max-width: 899px) 90vw, (max-width: 1440px) 560px, 680px"
            priority
          />
          <svg className="explorer__svg" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none" role="group" aria-label="Tower floors">
            <defs>
              <mask id="floorMask">
                <polygon points="104,181 300,59 394,175 519,290 519,700 575,750 575,985 104,985" fill="#fff" />
                <polygon ref={cutRef} points={INITIAL_POINTS} fill="#000" />
              </mask>
            </defs>
            <polygon className="explorer__dim" points="104,181 300,59 394,175 519,290 519,700 575,750 575,985 104,985" mask="url(#floorMask)" />
            <g>
              {FLOORS.map((f) => (
                <polygon
                  key={f.id}
                  className="floor"
                  points={toAttr(f.points)}
                  onPointerEnter={() => setHovered(f.id)}
                  onClick={() => select(f.id)}
                >
                  <title>{`${f.label} — ${f.zone.name}`}</title>
                </polygon>
              ))}
              <polygon ref={highlightRef} className="explorer__hl" points={INITIAL_POINTS} />
            </g>
          </svg>
          <div
            className="explorer__tag"
            style={{ top: `${tagTop}%`, left: `${((FACADE_RIGHT_X / VW) * 100).toFixed(2)}%` }}
          >
            <b>{shown.short}</b>
            <span>{shown.zone.name}</span>
          </div>
        </div>
      </div>

      <div className="explorer__panel">
        <div className="elevator" data-reveal>
          <p className="elevator__label">Select a level</p>
          <div
            className="elevator__grid"
            role="group"
            aria-label="Floors"
            onPointerLeave={() => {
              setHovered(null);
              setActive(false);
            }}
          >
            {FLOORS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={hovered === f.id && f.id !== selected ? 'elevator__btn is-hover' : 'elevator__btn'}
                aria-pressed={f.id === selected}
                aria-label={`${f.label}, ${f.zone.name}`}
                onPointerEnter={() => {
                  setHovered(f.id);
                  setActive(true);
                }}
                onFocus={() => setHovered(f.id)}
                onBlur={() => setHovered(null)}
                onClick={() => select(f.id)}
              >
                {f.id}
              </button>
            ))}
          </div>
        </div>

        <article className="floor-card" data-reveal aria-live="polite">
          <div className="floor-card__top">
            <span>{shown.id === 'G' ? 'Ground' : 'Level'}</span>
            <span className="floor-card__status">
              <span className="live-dot" />
              Enquire for availability
            </span>
          </div>
          <div className="floor-card__swap" key={shownId}>
            <div className="floor-card__num">{shown.num}</div>
            <h3 className="floor-card__zone">{shown.zone.name}</h3>
            <p className="floor-card__desc">{shown.zone.desc}</p>
            <ul className="chips">
              {shown.zone.chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <a
            href="#contact"
            className="btn btn--accent btn--block magnetic"
            onClick={() => {
              setFloor(selected);
              setInterest(interest);
            }}
          >
            <span>{selected === 'G' ? 'Ask about the arrival level' : `Enquire about ${selectedFloor.label}`}</span>
            <ArrowRight />
          </a>
        </article>

        {children}
      </div>
    </div>
  );
}
