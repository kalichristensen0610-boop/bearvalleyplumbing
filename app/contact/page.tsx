import Link from "../../components/ui/HardLink";
import { Breadcrumbs, PageHero } from "../../components/ui/SiteComponents";
import { site } from "../../data/site";

export const metadata = { title: "Contact", description: "Contact Bear River Plumbing about residential or commercial plumbing across Wyoming and Idaho." };

export default function Contact() {
  return <main>
    <div className="content-width"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} /></div>
    <PageHero eyebrow="Contact Bear River Plumbing" title="Tell us what you need help with." lead="For a repair, installation, remodel, or commercial project, send the property details and a short description so we can follow up." />
    <section className="contact-grid">
      <article><p className="eyebrow">Call</p><h2><a href={site.phoneHref}>{site.phone}</a></h2><p>Call to discuss your plumbing repair, installation, or project.</p></article>
      <article><p className="eyebrow">Email</p><h2><a href={`mailto:${site.email}`}>{site.email}</a></h2><p>Email the property location and a short description of what you need.</p></article>
      <article><p className="eyebrow">Hours</p><h2>Monday–Friday</h2><p>9:00 AM–5:00 PM</p></article>
      <article className="contact-action"><h2>Request service online</h2><p>Share the city, property type, service, and a few project details.</p><Link className="btn" href="/request-service" data-cta="contact-form-link">Open Request Form</Link></article>
    </section>
  </main>;
}
