import Image from "next/image";
import Link from "../components/ui/HardLink";
import { services } from "../data/services";
import { locations } from "../data/locations";
import { generalFaqs, site } from "../data/site";
import { CTA, FAQList, LocationGrid, SectionHead, ServiceGrid, TrustBar } from "../components/ui/SiteComponents";

export const metadata = {
  title: "Wyoming & Idaho Plumbing",
  description: "Dependable residential and commercial plumbing across Star Valley, Jackson Hole, Bear Lake County, Idaho Falls, Rexburg, and nearby communities.",
};

const mapUrl = (name: string, state: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(`${name}, ${state}`)}&output=embed`;

export default function Home() {
  return <main>
    <section className="home-hero">
      <Image className="hero-background" src="/hero-bear-river.png" alt="Grizzly bear emerging from a mountain river in the Bear River Plumbing service region" fill priority sizes="100vw" />
      <div className="home-hero-copy">
        <Image className="hero-logo" src="/bear-river-logo.png" alt="Bear River Plumbing LLC" width={148} height={148} priority />
        <p className="eyebrow">Local · Family Owned · Wyoming & Idaho</p>
        <h1>Built for hard work. Rooted in the community.</h1>
        <p className="lead">Dependable residential and commercial plumbing across Star Valley, Jackson Hole, Bear Lake County, Idaho Falls, Rexburg, and nearby communities.</p>
        <div className="hero-actions"><Link className="btn" href="/request-service" data-cta="hero-request-service">Request Service</Link><a className="inline-link light" href={site.phoneHref} data-cta="hero-call">Call {site.phone} →</a></div>
      </div>
    </section>
    <TrustBar />
    <section className="section"><SectionHead eyebrow="What we do" title="Plumbing help for the whole property." lead="From a leaking fixture to a full commercial project, start with the service that best matches what you need." /><ServiceGrid items={services} /></section>
    <section className="split-section">
      <article><p className="eyebrow">Residential plumbing</p><h2>Take care of the plumbing that keeps home running.</h2><p>Plumbing problems are disruptive enough. Bear River Plumbing makes the next step simple with clear communication and practical help for repairs, water heaters, drains, piping, remodels, and water quality.</p><Link className="inline-link" href="/residential-plumbing">Explore residential plumbing →</Link></article>
      <article className="dark"><p className="eyebrow">Commercial plumbing</p><h2>A dependable resource for properties and projects.</h2><p>Businesses, contractors, developers, and property managers need plumbing work that is coordinated and communicated clearly. Tell us about the facility, repair, remodel, or installation.</p><Link className="inline-link light" href="/commercial-plumbing">Discuss a commercial project →</Link></article>
    </section>
    <section className="section why"><div><p className="eyebrow">Why Bear River</p><h2>Local service should feel personal.</h2></div><div className="why-list"><article><span>01</span><h3>Community minded</h3><p>We live and work in the mountain communities we serve.</p></article><article><span>02</span><h3>Straight answers</h3><p>Clear conversations about the problem, the work, and the next step.</p></article><article><span>03</span><h3>Property respect</h3><p>Thoughtful work in homes, businesses, and active project sites.</p></article><article><span>04</span><h3>Broad capability</h3><p>Residential service and meaningful commercial plumbing support.</p></article></div></section>
    <section className="section areas-section">
      <SectionHead eyebrow="Service areas" title="Wyoming roots. Regional reach." lead="Choose a community to explore the map and see locally relevant plumbing information." />
      <div className="service-map-layout">
        <div className="service-map-frame"><iframe name="service-area-map" title="Interactive Bear River Plumbing service area map" src={mapUrl("Star Valley", "Wyoming")} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><p>Use the map controls to zoom and move around the region.</p></div>
        <div className="map-areas" aria-label="Choose a service area on the map">{locations.map(location => <div className="map-area" key={location.slug}><a className="map-pin" href={mapUrl(location.name, location.state)} target="service-area-map" aria-label={`Show ${location.name}, ${location.state} on map`}><span aria-hidden="true">●</span>{location.name}</a><Link href={`/service-areas/${location.slug}`}>Area details →</Link></div>)}</div>
      </div>
      <div className="areas-list"><LocationGrid items={locations} /></div>
    </section>
    <section className="family-section"><div><p className="eyebrow">Family owned</p><h2>Work that carries our name.</h2><p>Bear River Plumbing is a local family-owned company built around dependable service, quality workmanship, and long-term relationships in the communities we call home.</p><p className="placeholder">Company story placeholder: [OWNER NAME] · [YEAR FOUNDED] · [FAMILY STORY]</p><Link className="inline-link" href="/about">Meet Bear River Plumbing →</Link></div><div className="photo-placeholder"><span>Owner / family / team photo</span></div></section>
    <section className="section faq-section"><SectionHead eyebrow="Common questions" title="Start with the basics." /><FAQList items={generalFaqs} /></section>
    <CTA title="Have a plumbing problem or project? Let’s talk." id="home-final-request" />
  </main>;
}
