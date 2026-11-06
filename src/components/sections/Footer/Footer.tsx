'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import front from '@/assets/home/footer/front.webp';
import logo from '@/assets/home/footer/logo.webp';
import { FLOORS } from '@/data/floors';
import { enquiryInterests, site, socialLinks } from '@/data/site';
import { useOptionalEnquiry } from '@/components/EnquiryContext';
import Link from 'next/link';
type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

const footerLinks = [
  ['Home', '/'],
  ['Projects', '/projects'],
  ['The Tower', '/#tower'],
  ['Residences', '/#Residences'],
  ['Business', '/#BusinessSpaces'],
  ['Location', '/#Location'],
  ['Amenities', '/#Amenities'],
  ['Contact', '/#contact'],
  ['About Yohartt', '/#about'],
] as const;

const fieldClass =
  'paragraph border-pine-green text-pine-green placeholder:text-pine-green focus:border-green w-full border-0 border-b bg-transparent pb-1 outline-none transition-colors';
const labelClass = 'small mb-2 block text-golden uppercase';
const bandLabelClass = 'small mb-4 uppercase tracking-[0.14em] text-cream-dark';

function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  const enquiry = useOptionalEnquiry();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [localInterest, setLocalInterest] = useState<string>(enquiryInterests[0]);
  const [localFloor, setLocalFloor] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [note, setNote] = useState('');

  const interest = enquiry ? enquiry.interest : localInterest;
  const setInterest = enquiry ? enquiry.setInterest : setLocalInterest;
  const floor = enquiry ? enquiry.floor : localFloor;
  const setFloor = enquiry ? enquiry.setFloor : setLocalFloor;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setStatus('error');
      setNote('Please agree to the privacy policy before submitting.');
      return;
    }

    setStatus('sending');
    setNote('Sending your enquiry…');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          phone,
          email,
          interest,
          floor,
          message,
          website: '',
        }),
      });

      if (!response.ok) throw new Error(`Enquiry endpoint responded ${response.status}`);

      setStatus('sent');
      setNote('Thank you , we have your enquiry and will be in touch shortly.');
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setFloor('');
      setMessage('');
      setConsent(false);
    } catch {
      const subject = encodeURIComponent(`Enquiry: ${interest || 'General'}`);
      const body = encodeURIComponent([
        `Name: ${firstName} ${lastName}`.trim(),
        `Phone: ${phone}`,
        email && `Email: ${email}`,
        interest && `Interested in: ${interest}`,
        floor && `Preferred level: ${floor}`,
        message,
      ].filter(Boolean).join('\n'));
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus('sent');
      setNote('We opened your email app with the enquiry ready to send.');
    }
  }

  return (
    <footer id="contact" className="text-pine-green relative z-1 overflow-clip">
      {/* Sky: logo, heading and form on the left, the tower on the right. */}
      <div className="relative bg-linear-to-b from-vanilla via-[#eef1ea] to-[#a9c7da]">
        <div className="scroller pointer-events-none absolute inset-0" />

        <div className="wrapper relative z-10 pt-28 pb-36 max-lg:pt-24 max-md:pt-20 max-md:pb-0">
          <div className="w-1/2 pr-10 max-lg:w-[54%] max-lg:pr-6 max-md:w-full max-md:pr-0">
            <Link href="/" aria-label="Yohart Properties home" className="fadeElement inline-block">
              <Image src={logo} alt="Yohart Properties" className="h-28 w-auto max-lg:h-24 max-md:h-20" sizes="160px" />
            </Link>
            <p className="heading-2 mt-12 leading-tight font-light uppercase max-md:mt-10">JOIN THE WORLD OF YOHART PROPERTIES</p>
            <p className="paragraph mt-4 max-md:mt-3">Subscribe to join our community and stay up to date.</p>
            <form className="mt-10 flex w-full max-w-[34rem] flex-col items-start gap-5 max-md:mt-8 max-md:gap-4" onSubmit={handleSubmit}>
              <div className="flex w-full gap-4 max-md:flex-col max-md:gap-4">
                <div className="fadeElement w-1/2 max-md:w-full"><label htmlFor="footer-first-name" className={labelClass}>First name*</label><input id="footer-first-name" type="text" className={fieldClass} required name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" /></div>
                <div className="fadeElement w-1/2 max-md:w-full"><label htmlFor="footer-last-name" className={labelClass}>Last name*</label><input id="footer-last-name" type="text" className={fieldClass} required name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} autoComplete="family-name" /></div>
              </div>
              <div className="fadeElement w-full"><label htmlFor="footer-phone" className={labelClass}>Phone*</label><input id="footer-phone" type="tel" className={fieldClass} required name="phone" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" /></div>
              <div className="fadeElement flex w-full gap-4 max-md:flex-col max-md:gap-4"><label className="w-1/2 max-md:w-full"><span className={labelClass}>Interested in</span><select name="interest" value={interest} onChange={(event) => setInterest(event.target.value)} className="paragraph border-pine-green text-pine-green w-full border-0 border-b bg-transparent pb-1 outline-none"><option value="">General enquiry</option>{enquiryInterests.map((option) => <option key={option} value={option}>{option}</option>)}</select></label><label className="w-1/2 max-md:w-full"><span className={labelClass}>Preferred level</span><select name="floor" value={floor} onChange={(event) => setFloor(event.target.value)} className="paragraph border-pine-green text-pine-green w-full border-0 border-b bg-transparent pb-1 outline-none"><option value="">No preference</option>{FLOORS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></div>
              <label className="fadeElement w-full"><span className={labelClass}>Message</span><textarea name="message" rows={3} value={message} onChange={(event) => setMessage(event.target.value)} className="paragraph border-pine-green text-pine-green w-full resize-y border-0 border-b bg-transparent pb-1 outline-none" /></label>
              <label className="fadeElement my-2 flex cursor-pointer items-start gap-3"><input type="checkbox" name="consent" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 size-4 shrink-0 accent-pine-green max-md:size-5" /><span className="small text-golden">I consent to my information being collected in accordance with the Yohart Properties Privacy policy</span></label>
              <button className="link fadeElement max-md:self-start disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : "Let's begin"}</button>
              <p className={`${status === 'error' ? 'text-red-700' : status === 'sent' ? 'text-green-800' : 'text-pine-green'} small min-h-[1.3em]`} role="status">{note}</p>
            </form>
          </div>
        </div>

        {/* The tower: right half on desktop and tablet, below the form on phones.
            Never taller than the screen, so it can be seen whole. The photo is
            cropped to fill the box, so it renders wider than the box: `sizes`
            reflects that to keep it sharp. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 aspect-[4/5] max-h-[min(calc(100svh-9rem),56rem)] w-1/2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_22%)] max-lg:aspect-[3/5] max-lg:w-[46%] max-md:relative max-md:mt-4 max-md:aspect-auto max-md:h-[28rem] max-md:max-h-none max-md:w-full max-md:[mask-image:linear-gradient(to_right,transparent,black_12%)]"
        >
          <Image
            src={front}
            alt=""
            fill
            sizes="(max-width: 600px) 200vw, (max-width: 1120px) 140vw, 100vw"
            className="front object-cover object-[74%_100%] max-md:object-[60%_100%]"
          />
        </div>

        {/* Ground: blends the base of the tower into the band below. */}
        <div aria-hidden="true" className="to-pine-green pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-24 bg-linear-to-b from-transparent max-md:h-16" />
      </div>

      {/* Band: links, socials, contact and legal. */}
      <div className="bg-pine-green text-cream relative z-20">
        <div className="wrapper grid grid-cols-12 gap-x-5 gap-y-10 pt-14 pb-10 max-md:pt-10">
          <nav aria-label="Footer" className="col-span-5 max-lg:col-span-7 max-md:col-span-12">
            <p className={bandLabelClass}>Explore</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {footerLinks.map(([label, href]) => (
                <li key={label}><Link className="paragraph hover:text-accent uppercase transition-colors" href={href}>{label}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="col-span-2 max-lg:col-span-5 max-md:col-span-12">
            <p className={bandLabelClass}>Follow</p>
            <ul className="space-y-2 max-md:flex max-md:flex-wrap max-md:gap-x-6 max-md:space-y-0">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a target="_blank" rel="noopener noreferrer" className="paragraph hover:text-accent transition-colors" href={social.href}>{social.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-5 max-lg:col-span-12">
            <p className={bandLabelClass}>Contact</p>
            <p className="paragraph">For direct inquiries, our team is available at</p>
            <a href={site.phone.href} className="heading-3 hover:text-accent mt-2 inline-block transition-colors">{site.phone.display}</a>
            <div className="mt-2 space-y-1 text-cream/70">
              {site.locations.map((loc) => (
                <p key={loc} className="paragraph">{loc}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="flex items-end justify-between gap-10 border-t border-cream/15 py-6 max-lg:flex-col max-lg:items-start max-lg:gap-4">
            <p className="small max-w-[46rem] text-cream/60">Disclaimer: Upon completion of the project&apos;s materialization, minor deviations in the appearance of the facade or architectural details may occur compared to the presented rendering.</p>
            <div className="flex shrink-0 items-center gap-8 max-lg:w-full max-lg:justify-between max-md:gap-4">
              <p className="small text-cream/70">©{new Date().getFullYear()} {site.name}. All Rights Reserved.</p>
              <button type="button" onClick={scrollToTop} className="small hover:text-accent cursor-pointer whitespace-nowrap uppercase tracking-[0.14em] transition-colors">Back to top ↑</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
