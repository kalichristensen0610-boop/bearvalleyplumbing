"use client";
import Link from "../ui/HardLink";
import { useEffect, useState } from "react";
import { services } from "../../data/services";
import { locations } from "../../data/locations";
import { site } from "../../data/site";

export function Header(){
  const [open,setOpen]=useState(false);
  const [suppressDropdowns,setSuppressDropdowns]=useState(false);
  useEffect(()=>{if(sessionStorage.getItem("bear-river-close-menu")==="1")setSuppressDropdowns(true)},[]);
  function closeMenus(){setOpen(false);setSuppressDropdowns(true);sessionStorage.setItem("bear-river-close-menu","1")}
  function releaseDropdowns(){setSuppressDropdowns(false);sessionStorage.removeItem("bear-river-close-menu")}
  return <>
    <div className="utility"><span>{site.hours}</span><a href={site.phoneHref} data-cta="utility-call">Call {site.phone}</a></div>
    <header className="site-header">
      <button className="menu-button" aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(!open)}><span className="sr-only">Toggle menu</span>{open?"Close":"Menu"}</button>
      <nav id="primary-nav" className={open?"nav open":"nav"} aria-label="Primary navigation">
        <Link href="/" onClick={closeMenus}>Home</Link>
        <div className={suppressDropdowns?"nav-group suppress-dropdown":"nav-group"} onMouseLeave={releaseDropdowns}>
          <Link className="nav-top" href="/services">Services <span aria-hidden="true">⌄</span></Link>
          <div className="dropdown services-dropdown"><div><p>Plumbing services</p>{services.slice(0,4).map(s=><Link onClick={closeMenus} key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}</div><div><p>More services</p>{services.slice(4).map(s=><Link onClick={closeMenus} key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}</div><div className="dropdown-feature"><strong>Not sure what you need?</strong><span>Tell us what is happening and we’ll help identify the right next step.</span><Link onClick={closeMenus} href="/request-service">Request Service →</Link></div></div>
        </div>
        <Link href="/residential-plumbing">Residential</Link>
        <Link href="/commercial-plumbing">Commercial</Link>
        <div className={suppressDropdowns?"nav-group suppress-dropdown":"nav-group"} onMouseLeave={releaseDropdowns}>
          <Link className="nav-top" href="/service-areas">Service Areas <span aria-hidden="true">⌄</span></Link>
          <div className="dropdown areas-dropdown"><div><p>Wyoming</p>{locations.filter(l=>l.state==="Wyoming").map(l=><Link onClick={closeMenus} key={l.slug} href={`/service-areas/${l.slug}`}>{l.name}</Link>)}</div><div><p>Idaho</p>{locations.filter(l=>l.state==="Idaho").map(l=><Link onClick={closeMenus} key={l.slug} href={`/service-areas/${l.slug}`}>{l.name}</Link>)}</div><div className="dropdown-feature"><strong>Local service pages</strong><span>Choose an area, then browse individual plumbing services available for that market.</span><Link onClick={closeMenus} href="/service-areas">View all areas →</Link></div></div>
        </div>
        <Link href="/about">About</Link><Link href="/contact">Contact</Link>
      </nav>
      <div className="header-actions"><a className="call-link" href={site.phoneHref} data-cta="header-call">{site.phone}</a><Link className="btn btn-small" href="/request-service" data-cta="header-request-service">Request Service</Link></div>
    </header>
  </>
}
