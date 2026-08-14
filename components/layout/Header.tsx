"use client";
import Image from "next/image";
import Link from "../ui/HardLink";
import { useState } from "react";
import { services } from "../../data/services";
import { locations } from "../../data/locations";
import { site } from "../../data/site";

export function Header(){
  const [open,setOpen]=useState(false);
  return <>
    <div className="utility"><span>{site.hours}</span><a href={site.phoneHref} data-cta="utility-call">Call {site.phone}</a></div>
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Bear River Plumbing home"><Image src="/bear-river-logo.png" width={92} height={92} alt="Bear River Plumbing LLC" priority/></Link>
      <button className="menu-button" aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(!open)}><span className="sr-only">Toggle menu</span>{open?"Close":"Menu"}</button>
      <nav id="primary-nav" className={open?"nav open":"nav"} aria-label="Primary navigation">
        <div className="nav-group">
          <Link className="nav-top" href="/services">Services <span aria-hidden="true">⌄</span></Link>
          <div className="dropdown services-dropdown"><div><p>Plumbing services</p>{services.slice(0,4).map(s=><Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}</div><div><p>More services</p>{services.slice(4).map(s=><Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}</div><div className="dropdown-feature"><strong>Not sure what you need?</strong><span>Tell us what is happening and we’ll help identify the right next step.</span><Link href="/request-service">Request Service →</Link></div></div>
        </div>
        <Link href="/residential-plumbing">Residential</Link>
        <Link href="/commercial-plumbing">Commercial</Link>
        <div className="nav-group">
          <Link className="nav-top" href="/service-areas">Service Areas <span aria-hidden="true">⌄</span></Link>
          <div className="dropdown areas-dropdown"><div><p>Wyoming</p>{locations.filter(l=>l.state==="Wyoming").map(l=><Link key={l.slug} href={`/service-areas/${l.slug}`}>{l.name}</Link>)}</div><div><p>Idaho</p>{locations.filter(l=>l.state==="Idaho").map(l=><Link key={l.slug} href={`/service-areas/${l.slug}`}>{l.name}</Link>)}</div><div className="dropdown-feature"><strong>Local service pages</strong><span>Choose an area, then browse individual plumbing services available for that market.</span><Link href="/service-areas">View all areas →</Link></div></div>
        </div>
        <Link href="/about">About</Link><Link href="/contact">Contact</Link>
      </nav>
      <div className="header-actions"><a className="call-link" href={site.phoneHref} data-cta="header-call">{site.phone}</a><Link className="btn btn-small" href="/request-service" data-cta="header-request-service">Request Service</Link></div>
    </header>
  </>
}
