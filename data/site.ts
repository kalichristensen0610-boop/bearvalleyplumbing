export type FAQ = { question: string; answer: string };
export type SiteConfig = { name:string; shortName:string; phone:string; phoneHref:string; email:string; hours:string; url:string; areas:string[] };
export const site: SiteConfig = {
  name:"Bear River Plumbing LLC", shortName:"Bear River Plumbing", phone:"[PHONE NUMBER]", phoneHref:"#request-service", email:"[EMAIL]",
  hours:"Monday–Friday · 8:00 AM–5:00 PM", url:"https://bear-river-plumbing.sites.openai.com",
  areas:["Alpine, WY","Afton, WY","Star Valley, WY","Jackson Hole, WY","Idaho Falls, ID","Rexburg, ID","Bear Lake County, ID"]
};
export const generalFaqs: FAQ[] = [
  {question:"What areas do you serve?",answer:"Bear River Plumbing serves communities across western Wyoming and eastern Idaho, including Alpine, Afton, Star Valley, Jackson Hole, Idaho Falls, Rexburg, and Bear Lake County."},
  {question:"Do you handle residential and commercial plumbing?",answer:"Yes. We support homeowners as well as businesses, contractors, property managers, developers, and other organizations."},
  {question:"How do I request service?",answer:"Use our request form with a short description of the problem or project. Submitting a request does not confirm an appointment; our team will follow up to discuss next steps."}
];
