import { ContactForm } from '@/components/ContactForm';
import { site } from '@/data/site';

export function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__grid">
        <div>
          <p className="eyebrow" data-reveal="">
            <span>(04)</span> Start a conversation
          </p>
          <h2 className="display" data-reveal="">
            Find your <em>place.</em>
          </h2>
          <p className="contact__lead" data-reveal="">
            Tell us what you are looking for and our team will help you find the right Yohart opportunity.
          </p>
          <ul className="contact__list" data-reveal="">
            <li>
              <span>Phone</span>
              <a href={site.phone.href}>{site.phone.display}</a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <span>Based in</span>
              <p>{site.city}, {site.country}</p>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
