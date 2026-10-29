'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import front from '@/assets/home/footer/front.webp';
import treeRight from '@/assets/home/footer/tree-r.webp';
import { FLOORS } from '@/data/floors';
import { enquiryInterests, site, socialLinks } from '@/data/site';
import { useOptionalEnquiry } from '@/components/EnquiryContext';
import Link from 'next/link';
type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

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
      const subject = encodeURIComponent(`Enquiry — ${interest || 'General'}`);
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
    <footer id="contact" className="to-vanilla text-pine-green relative bg-linear-to-t from-[#8AB6D2]">
      <div className="scroller pointer-events-none absolute h-full w-full" />
      <div className="wrapper relative z-20 pt-25">
        <div className="content flex gap-5 max-2xl:gap-15 max-lg:flex-wrap max-lg:justify-start max-lg:gap-5 max-lg:gap-y-16 max-md:gap-y-12">
          <div className="w-1/3 max-2xl:w-1/2 max-lg:w-2/3 max-md:w-full">
            <p className="heading-2 leading-tight font-light uppercase">JOIN THE WORLD OF YOHART PROPERTIES</p>
            <p className="paragraph mt-4 max-md:mt-3">Subscribe to join our community and stay up to date.</p>
            <form className="mt-8 mb-10 flex w-3/4 flex-col items-start gap-5 max-md:mt-8 max-md:mb-8 max-md:w-full max-md:gap-4" onSubmit={handleSubmit}>
              <div className="flex w-full gap-4 max-md:flex-col max-md:gap-4">
                <div className="fadeElement w-1/2 max-md:w-full"><label htmlFor="footer-first-name" className="small mb-2 block text-golden uppercase">First name*</label><input id="footer-first-name" type="text" className="paragraph border-pine-green text-pine-green placeholder:text-pine-green focus:border-green w-full border-0 border-b bg-transparent pb-1 outline-none transition-colors" required name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" /></div>
                <div className="fadeElement w-1/2 max-md:w-full"><label htmlFor="footer-last-name" className="small mb-2 block text-golden uppercase">Last name*</label><input id="footer-last-name" type="text" className="paragraph border-pine-green text-pine-green placeholder:text-pine-green focus:border-green w-full border-0 border-b bg-transparent pb-1 outline-none transition-colors" required name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} autoComplete="family-name" /></div>
              </div>
              <div className="fadeElement w-full"><label htmlFor="footer-phone" className="small mb-2 block text-golden uppercase">Phone*</label><input id="footer-phone" type="tel" className="paragraph border-pine-green text-pine-green placeholder:text-pine-green focus:border-green w-full border-0 border-b bg-transparent pb-1 outline-none transition-colors" required name="phone" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" /></div>
              <div className="fadeElement flex w-full gap-4 max-md:flex-col max-md:gap-4"><label className="w-1/2 max-md:w-full"><span className="small mb-2 block text-golden uppercase">Interested in</span><select name="interest" value={interest} onChange={(event) => setInterest(event.target.value)} className="paragraph border-pine-green text-pine-green w-full border-0 border-b bg-transparent pb-1 outline-none"><option value="">General enquiry</option>{enquiryInterests.map((option) => <option key={option} value={option}>{option}</option>)}</select></label><label className="w-1/2 max-md:w-full"><span className="small mb-2 block text-golden uppercase">Preferred level</span><select name="floor" value={floor} onChange={(event) => setFloor(event.target.value)} className="paragraph border-pine-green text-pine-green w-full border-0 border-b bg-transparent pb-1 outline-none"><option value="">No preference</option>{FLOORS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></div>
              <label className="fadeElement w-full"><span className="small mb-2 block text-golden uppercase">Message</span><textarea name="message" rows={3} value={message} onChange={(event) => setMessage(event.target.value)} className="paragraph border-pine-green text-pine-green w-full resize-y border-0 border-b bg-transparent pb-1 outline-none" /></label>
              <label className="fadeElement my-2 flex cursor-pointer items-start gap-3"><input type="checkbox" name="consent" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 size-4 shrink-0 accent-pine-green max-md:size-5" /><span className="small text-golden">I consent to my information being collected in accordance with the Yohart Properties Privacy policy</span></label>
              <button className="link fadeElement max-md:self-start disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : "Let's begin"}</button>
              <p className={`${status === 'error' ? 'text-red-700' : status === 'sent' ? 'text-green-800' : 'text-pine-green'} small min-h-[1.3em]`} role="status">{note}</p>
            </form>
          </div>
          <div className="w-1/12 max-2xl:hidden" />
          <div className="w-1/6 max-lg:w-1/3 max-md:hidden max-md:order-4">
            <ul className="space-y-2 max-md:flex max-md:flex-wrap max-md:justify-center max-md:gap-x-4 max-md:gap-y-2">
              <li className="fadeElement max-md:text-center"><Link className="hover:text-green paragraph font-normal uppercase transition" href="/">Home</Link></li>
              <li className="fadeElement max-md:text-center"><Link className="hover:text-green paragraph font-normal uppercase transition" href="/projects">Projects</Link></li>
              <li className="fadeElement max-md:text-center"><Link className="hover:text-green paragraph font-normal uppercase transition" href="/#tower">The Tower</Link></li>
              <li className="fadeElement max-md:text-center"><Link className="hover:text-green paragraph font-normal uppercase transition" href="/#Residences">Residences</Link></li>
              <li className="fadeElement max-md:text-center"><Link className="hover:text-green paragraph font-normal uppercase transition" href="/#BusinessSpaces">Business</Link></li>
              <li className="fadeElement max-md:text-center"><Link className="hover:text-green paragraph font-normal uppercase transition" href="/#Location">Location</Link></li>
              <li className="fadeElement max-md:text-center"><Link className="hover:text-green paragraph font-normal uppercase transition" href="/#Amenities">Amenities</Link></li>
              <li className="fadeElement max-md:text-center"><Link className="hover:text-green paragraph font-normal uppercase transition" href="/#contact">Contact</Link></li>
              <li className="fadeElement max-md:text-center"><Link className="hover:text-green paragraph font-normal uppercase transition" href="/#about">About Yohartt</Link></li>
            </ul>
          </div>
          <div className="w-1/12 max-lg:w-1/6 max-md:w-full max-md:order-5">
            <ul className="space-y-2 max-md:flex max-md:flex-wrap max-md:justify-center max-md:gap-x-4 max-md:gap-y-2">
              {socialLinks.map((social) => (
                <li key={social.name} className="fadeElement">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green text-golden paragraph font-normal transition"
                    href={social.href}
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/12 max-2xl:hidden" />
          <div className="w-1/4 max-lg:w-5/12 max-md:w-full max-md:order-3"><p className="small">Disclaimer: Upon completion of the project&apos;s materialization, minor deviations in the appearance of the facade or architectural details may occur compared to the presented rendering.</p><div className="mt-4 flex flex-col max-md:w-full"><span className="small">For direct inquiries, our team is available at</span><p><a href={site.phone.href} className="text-golden detail">{site.phone.display}</a></p></div></div>
        </div>
      </div>
      <div className="pointer-events-none -mt-70 w-full overflow-clip select-none max-2xl:-mt-50 max-lg:-mt-30 max-lg:flex max-lg:items-center max-lg:justify-end max-md:mt-4 [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_100%)]">
        <Image
          src={front}
          alt="footer"
          loading="eager"
          className="front h-auto w-full max-w-none origin-bottom-right scale-110 lg:scale-115 2xl:scale-120 max-lg:min-w-400 max-lg:translate-x-25 max-lg:object-cover max-lg:object-right max-md:min-w-190 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 h-auto w-full">
          <Image
            src={treeRight}
            alt="footer"
            className="absolute right-0 bottom-0 h-auto w-[55vw] min-w-250 max-w-none origin-bottom-right scale-115 lg:scale-125 max-2xl:w-250 max-lg:w-[150%] max-md:hidden drop-shadow-md transition-transform duration-500"
          />
        </div>
      </div>
      <div className="absolute bottom-15 left-0 z-10 w-full max-md:bottom-6"><div className="wrapper flex items-end justify-between max-lg:flex-col-reverse max-lg:items-center max-lg:gap-4 max-md:gap-3"><div className="small text-cream w-1/6 max-lg:w-full max-lg:text-center max-md:w-full max-md:text-center max-md:text-[0.625rem]">©{new Date().getFullYear()}. All Rights Reserved.</div><div className="heading-1 text-cream w-7/12 text-right font-light uppercase max-xl:w-2/3 max-lg:w-full max-lg:text-center max-md:w-full max-md:text-center"><span>Yohart Properties</span></div></div></div>
    </footer>
  );
}
