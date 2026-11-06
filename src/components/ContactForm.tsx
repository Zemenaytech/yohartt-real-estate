'use client';

import { useRef, useState, type FormEvent } from 'react';
import { FLOORS } from '@/data/floors';
import { enquiryInterests, site } from '@/data/site';
import { enquirySubject, enquiryText, parseEnquiry, type Enquiry, type EnquiryField } from '@/lib/enquiry';
import { useEnquiry } from './EnquiryContext';
import { ArrowRight, WhatsAppIcon } from './icons';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD_HINT = 'Please add your name and a phone number (and a valid email, if you include one).';

function openEmailApp(e: Enquiry) {
  const subject = encodeURIComponent(enquirySubject(e));
  const body = encodeURIComponent(enquiryText(e));
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
}

function openWhatsApp(e: Enquiry) {
  const text = encodeURIComponent(`Hello Yohart, I'd like to make an enquiry.\n\n${enquiryText(e)}`);
  window.open(`https://wa.me/${site.whatsapp}?text=${text}`, '_blank', 'noopener');
}

export function ContactForm() {
  const { floor, setFloor, interest, setInterest } = useEnquiry();
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');
  const [invalid, setInvalid] = useState<EnquiryField[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const fieldClass = (name: EnquiryField, extra = '') =>
    ['field', extra, invalid.includes(name) && 'is-invalid'].filter(Boolean).join(' ');

  const clearInvalid = (name: EnquiryField) => {
    if (invalid.includes(name)) setInvalid((list) => list.filter((f) => f !== name));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const via = submitter?.getAttribute('data-send') ?? 'send';
    const parsed = parseEnquiry(Object.fromEntries(new FormData(event.currentTarget)));

    if (!parsed.ok) {
      setInvalid(parsed.fields);
      setStatus('error');
      setNote(FIELD_HINT);
      return;
    }
    setInvalid([]);

    if (via === 'whatsapp') {
      openWhatsApp(parsed.data);
      setStatus('sent');
      setNote('Opening WhatsApp with your message ready to send…');
      return;
    }

    setStatus('sending');
    setNote('Sending your enquiry…');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setStatus('sent');
        setNote('Thank you, we have your enquiry and will be in touch shortly.');
        formRef.current?.reset();
        setFloor('');
        return;
      }
      if (res.status === 400) {
        const json = (await res.json().catch(() => ({}))) as { fields?: EnquiryField[] };
        setInvalid(json.fields ?? []);
        setStatus('error');
        setNote(FIELD_HINT);
        return;
      }
      if (res.status === 429) {
        setStatus('error');
        setNote(`Too many enquiries in a short time. Please try again shortly, or call ${site.phone.display}.`);
        return;
      }
      throw new Error(`Enquiry endpoint responded ${res.status}`);
    } catch {
      // Delivery isn't configured or failed — hand the enquiry to the visitor's email app instead.
      openEmailApp(parsed.data);
      setStatus('sent');
      setNote('We opened your email app with the enquiry ready to send.');
    }
  }

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} noValidate data-reveal>
      <div className="form__row">
        <label className={fieldClass('name')}>
          <input type="text" name="name" placeholder=" " autoComplete="name" required onInput={() => clearInvalid('name')} />
          <span>Full name</span>
        </label>
        <label className={fieldClass('phone')}>
          <input type="tel" name="phone" placeholder=" " autoComplete="tel" required onInput={() => clearInvalid('phone')} />
          <span>Phone</span>
        </label>
      </div>
      <label className={fieldClass('email')}>
        <input type="email" name="email" placeholder=" " autoComplete="email" onInput={() => clearInvalid('email')} />
        <span>Email (optional)</span>
      </label>
      <div className="form__row">
        <label className={fieldClass('interest', 'field--select')}>
          <select name="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
            {enquiryInterests.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <span>Interested in</span>
        </label>
        <label className={fieldClass('floor', 'field--select')}>
          <select name="floor" value={floor} onChange={(e) => setFloor(e.target.value)}>
            <option value="">No preference</option>
            {FLOORS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label} · {f.zone.name}
              </option>
            ))}
          </select>
          <span>Preferred level (Yohartt Tower)</span>
        </label>
      </div>
      <label className="field">
        <textarea name="message" rows={3} placeholder=" " />
        <span>Message</span>
      </label>

      {/* honeypot: hidden from people, irresistible to bots */}
      <div className="form__hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--accent magnetic" data-send="send" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          <ArrowRight />
        </button>
        <button type="submit" className="btn btn--ghost magnetic" data-send="whatsapp" disabled={status === 'sending'}>
          <WhatsAppIcon />
          WhatsApp
        </button>
      </div>
      <p className={status === 'error' ? 'form__note is-error' : status === 'sent' ? 'form__note is-success' : 'form__note'} role="status">
        {note}
      </p>
    </form>
  );
}
