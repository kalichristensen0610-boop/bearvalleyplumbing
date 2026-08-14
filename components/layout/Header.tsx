"use client";
import Link from "../ui/HardLink";
import { useEffect, useState } from "react";
import { services } from "../../data/services";
import { locations } from "../../data/locations";
import { site } from "../../data/site";

export function Header(){
  const [open,setOpen]=useState(false);
  const [activeMenu,setActiveMenu]=useState<"services"|"areas"|null>(null);
  useEffect(()=>{const restore=(event:PageTransitionEvent)=>{if(event.persisted)setOpen(true)};window.addEventListener("pageshow",restore);return()=>window.removeEventListener("pageshow",restore)},[]);
  function closeMenus(){setOpen(false);setActiveMenu(null)}
  function toggleMenu(menu:"services"|"areas"){setActiveMenu(current=>current===menu?null:menu)}
  return <>
    <div className="utility"><span>{site.hours}</span><a href={site.phoneHref} data-cta="utility-call">Call {site.phone}</a></div>
    <header className="site-header">
      <button className="menu-button" aria-expanded={open} aria-controls="primary-nav" onClick={()=>{setOpen(!open);setActiveMenu(null)}}><span className="sr-only">Toggle menu</span>{open?"Close":"Menu"}</button>
      <nav id="primary-nav" className={open?"nav open":"nav"} aria-label="Primary navigation">
        <Link href="/" onClick={closeMenus}>Home</Link>
        <Link href="/about" onClick={closeMenus}>About</Link>
        <div className={activeMenu==="services"?"nav-group expanded":"nav-group"}>
          <button className="nav-top" type="button" aria-expanded={activeMenu==="services"} aria-controls="services-menu" onClick={()=>toggleMenu("services")}>Services <span aria-hidden="true">⌄</span></button>
          <div id="services-menu" className="dropdown services-dropdown"><div><p>Start here</p><Link onClick={closeMenus} href="/residential-plumbing">Residential Plumbing</Link><Link onClick={closeMenus} href="/services/new-construction">New Construction</Link><Link onClick={closeMenus} href="/services">All Services</Link></div><div><p>Plumbing services</p>{services.filter(s=>s.slug!=="new-construction").map(s=><Link onClick={closeMenus} key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}</div><div className="dropdown-feature"><strong>Building a new home?</strong><span>We coordinate plumbing for new homes with builders, contractors, and homeowners.</span><Link onClick={closeMenus} href="/services/new-construction">Explore new construction →</Link></div></div>
        </div>
        <div className={activeMenu==="areas"?"nav-group expanded":"nav-group"}>
          <button className="nav-top" type="button" aria-expanded={activeMenu==="areas"} aria-controls="areas-menu" onClick={()=>toggleMenu("areas")}>Service Areas <span aria-hidden="true">⌄</span></button>
          <div id="areas-menu" className="dropdown areas-dropdown"><div><p>Wyoming</p>{locations.filter(l=>l.state==="Wyoming").map(l=><Link onClick={closeMenus} key={l.slug} href={`/service-areas/${l.slug}`}>{l.name}</Link>)}</div><div><p>Idaho</p>{locations.filter(l=>l.state==="Idaho").map(l=><Link onClick={closeMenus} key={l.slug} href={`/service-areas/${l.slug}`}>{l.name}</Link>)}</div><div className="dropdown-feature"><strong>Local service pages</strong><span>Choose an area, then browse individual plumbing services available for that market.</span><Link onClick={closeMenus} href="/service-areas">View all areas →</Link></div></div>
        </div>
        <Link href="/contact" onClick={closeMenus}>Contact</Link>
      </nav>
      <div className="header-actions"><a className="call-link" href={site.phoneHref} data-cta="header-call">{site.phone}</a><Link className="btn btn-small" href="/request-service" data-cta="header-request-service">Request Service</Link></div>
    </header>
  </>
}
