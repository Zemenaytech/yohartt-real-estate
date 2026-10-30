'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import front from '@/assets/home/footer/front.webp';
import treeLeft from '@/assets/home/footer/tree-l.webp';
import treeRight from '@/assets/home/footer/tree-r.webp';
import { FLOORS } from '@/data/floors';
import { enquiryInterests, site } from '@/data/site';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function Footer() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<string>(enquiryInterests[0]);
  const [floor, setFloor] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [note, setNote] = useState('');

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
      setNote('Thank you — we have your enquiry and will be in touch shortly.');
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
      <div className="wrapper pt-25">
        <div className="content flex gap-5 max-2xl:gap-15 max-lg:flex-wrap max-lg:justify-start max-lg:gap-5 max-lg:gap-y-22 max-md:gap-y-12!">
          <div className="w-1/3 max-2xl:w-1/2 max-lg:w-2/3 max-md:w-full">
            <p className="heading-2 leading-tight font-light uppercase">JOIN THE WORLD OF BELGRADE ARBOR</p>
            <p className="paragraph mt-6">Subscribe to join our community and stay up to date.</p>
            <form className="mt-10 flex w-3/4 flex-col items-start gap-6 max-md:mt-15 max-md:w-full" onSubmit={handleSubmit}>
              <div className="flex w-full gap-4 max-md:flex-wrap max-md:gap-6">
                <div className="fadeElement w-1/2 max-md:w-full"><label htmlFor="footer-first-name" className="small mb-2 block text-golden uppercase">First name*</label><input id="footer-first-name" type="text" className="paragraph border-pine-green text-pine-green placeholder:text-pine-green focus:border-green w-full border-0 border-b bg-transparent pb-1 outline-none transition-colors" required name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" /></div>
                <div className="fadeElement w-1/2 max-md:w-full"><label htmlFor="footer-last-name" className="small mb-2 block text-golden uppercase">Last name*</label><input id="footer-last-name" type="text" className="paragraph border-pine-green text-pine-green placeholder:text-pine-green focus:border-green w-full border-0 border-b bg-transparent pb-1 outline-none transition-colors" required name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} autoComplete="family-name" /></div>
              </div>
              <div className="fadeElement w-full"><label htmlFor="footer-phone" className="small mb-2 block text-golden uppercase">Phone*</label><input id="footer-phone" type="tel" className="paragraph border-pine-green text-pine-green placeholder:text-pine-green focus:border-green w-full border-0 border-b bg-transparent pb-1 outline-none transition-colors" required name="phone" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" /></div>
              <div className="fadeElement flex w-full gap-4 max-md:flex-wrap max-md:gap-6"><label className="w-1/2 max-md:w-full"><span className="small mb-2 block text-golden uppercase">Interested in</span><select name="interest" value={interest} onChange={(event) => setInterest(event.target.value)} className="paragraph border-pine-green text-pine-green w-full border-0 border-b bg-transparent pb-1 outline-none"><option value="">General enquiry</option>{enquiryInterests.map((option) => <option key={option} value={option}>{option}</option>)}</select></label><label className="w-1/2 max-md:w-full"><span className="small mb-2 block text-golden uppercase">Preferred level</span><select name="floor" value={floor} onChange={(event) => setFloor(event.target.value)} className="paragraph border-pine-green text-pine-green w-full border-0 border-b bg-transparent pb-1 outline-none"><option value="">No preference</option>{FLOORS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></div>
              <label className="fadeElement w-full"><span className="small mb-2 block text-golden uppercase">Message</span><textarea name="message" rows={3} value={message} onChange={(event) => setMessage(event.target.value)} className="paragraph border-pine-green text-pine-green w-full resize-y border-0 border-b bg-transparent pb-1 outline-none" /></label>
              <label className="fadeElement my-4 flex cursor-pointer items-start gap-3"><input type="checkbox" name="consent" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 size-4 shrink-0 accent-pine-green max-md:size-6" /><span className="small text-golden">I consent to my information being collected in accordance with the Belgrade Arbor Privacy policy</span></label>
              <button className="link fadeElement max-md:mx-auto disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Let&apos;s begin'}</button>
              <p className={`${status === 'error' ? 'text-red-700' : status === 'sent' ? 'text-green-800' : 'text-pine-green'} small min-h-[1.3em]`} role="status">{note}</p>
            </form>
          </div>
          <div className="w-1/12 max-2xl:hidden" />
          <div className="w-1/6 max-lg:w-1/3 max-md:flex max-md:w-full max-md:flex-col max-md:items-center"><ul className="space-y-3"><li className="fadeElement max-md:text-center"><a className="hover:text-green paragraph font-normal uppercase transition" href="/en">Home</a></li><li className="fadeElement max-md:text-center"><a className="hover:text-green paragraph font-normal uppercase transition" href="/en/3d">3D Experience</a></li><li className="fadeElement max-md:text-center"><a className="hover:text-green paragraph font-normal uppercase transition" href="/en/residences">Residences</a></li><li className="fadeElement max-md:text-center"><a className="hover:text-green paragraph font-normal uppercase transition" href="/en/business">Business</a></li><li className="fadeElement max-md:text-center"><a className="hover:text-green paragraph font-normal uppercase transition" href="/en/retail-spaces">Retail Spaces</a></li><li className="fadeElement max-md:text-center"><a className="hover:text-green paragraph font-normal uppercase transition" href="/en#Around">Location</a></li><li className="fadeElement max-md:text-center"><a className="hover:text-green paragraph font-normal uppercase transition" href="/en#Amenities">Amenities</a></li><li className="fadeElement max-md:text-center"><a className="hover:text-green paragraph font-normal uppercase transition" href="/en/contact">Contact</a></li><li className="fadeElement max-md:text-center"><a className="hover:text-green paragraph font-normal uppercase transition" href="/en/about-the-investor">About the investor</a></li></ul><a className="paragraph fadeElement hover:text-green transitionfont-normal mt-10 inline-block max-md:mt-4" href="/en/privacy-policy">Privacy policy</a></div>
          <div className="w-1/12 max-lg:w-1/6 max-md:w-full"><ul className="space-y-3 max-md:flex max-md:flex-col max-md:items-center"><li className="fadeElement"><a target="_blank" rel="noopener noreferrer" className="hover:text-green text-golden paragraph font-normal transition" href="https://www.instagram.com/belgradearbor/">Instagram</a></li><li className="fadeElement"><a target="_blank" rel="noopener noreferrer" className="hover:text-green text-golden paragraph font-normal transition" href="https://www.linkedin.com/company/belgrade-arbor">Linkedin</a></li><li className="fadeElement"><a target="_blank" rel="noopener noreferrer" className="hover:text-green text-golden paragraph font-normal transition" href="https://www.facebook.com/belgradearbor/">Facebook</a></li></ul></div>
          <div className="w-1/12 max-2xl:hidden" />
          <div className="w-1/4 max-lg:w-5/12 max-md:w-full"><p className="small">Disclaimer: Upon completion of the project&apos;s materialization, minor deviations in the appearance of the facade or architectural details may occur compared to the presented renderings. The room numbering has been carried out in accordance with the property registration system of the Republic of Serbia.</p><div className="mt-6 flex flex-col max-sm:w-2/3"><span>For direct inquiries, our team is available at</span><p><a href="tel:+38169684444" className="text-golden detail">+381 69 68 44 44</a></p></div></div>
        </div>
      </div>
      <div className="pointer-events-none -mt-200 w-full overflow-clip select-none max-2xl:-mt-150 max-lg:-mt-120 max-lg:flex max-lg:items-center max-lg:justify-end max-md:-mt-70"><Image src={front} alt="footer"  className="front h-auto w-full max-w-none max-lg:min-w-400 max-lg:translate-x-25 max-lg:object-cover max-lg:object-right max-md:min-w-210" /><div className="absolute bottom-0 left-0 h-auto w-full"><Image src={treeLeft} alt="footer" className="absolute bottom-0 left-0 h-auto w-96 max-w-none max-2xl:w-75 max-lg:hidden" /><Image src={treeRight} alt="footer" className="absolute right-0 bottom-0 h-auto w-335 max-w-none max-2xl:w-250 max-lg:w-[150%] max-md:w-150" /></div></div>
      <div className="absolute bottom-15 left-0 z-10 w-full max-md:bottom-10"><div className="wrapper flex items-end justify-between max-lg:flex-col-reverse max-lg:items-center max-lg:gap-5"><div className="small text-cream w-1/6 max-lg:w-full max-lg:text-center max-md:text-[0.625rem]">©2026. All Rights Reserved.</div><div className="heading-1 text-cream w-7/12 text-right font-light uppercase max-xl:w-2/3 max-lg:w-full max-lg:text-center"><span>Belgrade Arbor</span></div></div></div>
    </footer>
  );
}
