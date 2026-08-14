import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locationBySlug,locations } from "../../../../data/locations";
import { serviceBySlug,services } from "../../../../data/services";
import { Breadcrumbs,CTA,FAQList,PageHero,SectionHead } from "../../../../components/ui/SiteComponents";

export function generateStaticParams(){return locations.flatMap(location=>services.map(service=>({slug:location.slug,service:service.slug})))}

export async function generateMetadata({params}:{params:Promise<{slug:string;service:string}>}):Promise<Metadata>{
  const p=await params,l=locationBySlug(p.slug),s=serviceBySlug(p.service);if(!l||!s)return{};
  const title=`${s.name} in ${l.name}, ${l.state==="Idaho"?"ID":"WY"}`;
  const description=`Request ${s.name.toLowerCase()} for homes, businesses, and projects in ${l.name}, ${l.state}. Local service information from Bear River Plumbing.`;
  return{title,description,alternates:{canonical:`/service-areas/${l.slug}/${s.slug}`},openGraph:{title:`${title} | Bear River Plumbing`,description,images:[]},twitter:{title:`${title} | Bear River Plumbing`,description,images:[]}}
}

export default async function AreaServicePage({params}:{params:Promise<{slug:string;service:string}>}){
  const p=await params,l=locationBySlug(p.slug),s=serviceBySlug(p.service);if(!l||!s)notFound();
  const related=services.filter(x=>s.related.includes(x.slug));
  const faqs=[{question:`Do you provide ${s.name.toLowerCase()} throughout ${l.name}?`,answer:`Coverage depends on the exact ${l.name} address, project scope, and current schedule. Send the property details and Bear River Plumbing will confirm service availability.`},{question:`What should I include in a ${s.name.toLowerCase()} request?`,answer:`Include the ${l.name} property address, whether it is residential or commercial, what you have noticed, and any timing or access information that may help us understand the work.`},...s.faqs];
  const schema={"@context":"https://schema.org","@type":"Service",name:`${s.name} in ${l.name}`,description:s.summary,provider:{"@type":"Plumber",name:"Bear River Plumbing LLC"},areaServed:{"@type":"Place",name:`${l.name}, ${l.state}`}};
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><div className="content-width"><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Service Areas",href:"/service-areas"},{label:l.name,href:`/service-areas/${l.slug}`},{label:s.name}]}/></div><PageHero eyebrow={`${l.region} · ${s.category}`} title={`${s.name} in ${l.name}`} lead={`${s.summary} Bear River Plumbing provides a clear way to request this work for ${l.name} homes, businesses, and projects.`}/><section className="section area-service-detail"><div><SectionHead eyebrow={`Local ${s.name}`} title={`A practical plan for ${l.name} properties.`}/><p>{l.intro}</p><p>For {s.name.toLowerCase()}, local property conditions matter. We consider the building, access, season, system history, and the outcome you need before recommending the next step.</p><h3>Service may include</h3><ul className="check-list">{s.details.map(x=><li key={x}>{x}</li>)}</ul></div><aside><h2>Local considerations</h2><ul>{l.considerations.map(x=><li key={x}>{x}</li>)}</ul><Link className="btn" href={`/request-service?location=${l.slug}&service=${s.slug}`} data-cta="area-service-request">Request {s.name}</Link></aside></section>{related.length>0&&<section className="section related-local"><SectionHead eyebrow={`More services in ${l.name}`} title="Related plumbing services"/><div>{related.map(x=><Link key={x.slug} href={`/service-areas/${l.slug}/${x.slug}`}><strong>{x.name}</strong><span>{x.summary}</span><b>View service →</b></Link>)}</div></section>}<section className="section"><SectionHead eyebrow="Local service questions" title={`${s.name} in ${l.name}`}/><FAQList items={faqs}/></section><CTA title={`Need ${s.name.toLowerCase()} in ${l.name}?`} id="area-service-final-request"/></main>
}
