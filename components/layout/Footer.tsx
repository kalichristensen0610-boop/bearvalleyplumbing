import Image from "next/image";
import Link from "../ui/HardLink";
import { services } from "../../data/services";
import { locations } from "../../data/locations";
import { site } from "../../data/site";

export function Footer() {
  return <>
    <footer className="footer" id="contact">
      <div className="footer-brand"><Image src="/bear-river-logo-transparent.png" width={190} height={190} alt="Bear River Plumbing LLC" /><p>Local, family-owned plumbing professionals serving homes, businesses, and projects across the communities we call home.</p></div>
      <div><h2>Plumbing</h2>{services.slice(0, 5).map(service => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}<Link href="/commercial-plumbing">Commercial Plumbing</Link></div>
      <div><h2>Service Areas</h2>{locations.slice(0, 5).map(location => <Link key={location.slug} href={`/service-areas/${location.slug}`}>{location.name}</Link>)}<Link href="/service-areas">View all areas</Link></div>
      <div><h2>Contact</h2><p><a href={site.phoneHref}>{site.phone}</a><br /><a href={`mailto:${site.email}`}>{site.email}</a></p><p>{site.hours}</p><Link className="btn btn-light" href="/request-service">Request Service</Link></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Bear River Plumbing LLC</span><span>Local service. Straight answers. Quality work.</span></div>
    </footer>
    <div className="mobile-cta"><a href={site.phoneHref} data-cta="mobile-call">Call</a><Link href="/request-service" data-cta="mobile-request">Request Service</Link></div>
  </>;
}
