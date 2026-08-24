export type FAQ = { question: string; answer: string };
export type SiteConfig = { name:string; shortName:string; phone:string; phoneHref:string; email:string; hours:string; url:string; areas:string[] };
export const site: SiteConfig = {
  name:"Bear River Plumbing LLC", shortName:"Bear River Plumbing", phone:"208-649-5561", phoneHref:"tel:+12086495561", email:"BearRiverPlumbing@gmail.com",
  hours:"Monday–Friday · 9:00 AM–5:00 PM", url:"https://rosybrown-armadillo-385824.hostingersite.com",
  areas:["Alpine, WY","Afton, WY","Star Valley, WY","Jackson Hole, WY","Victor, ID","Driggs, ID","Idaho Falls, ID","Rexburg, ID","Bear Lake County, ID"]
};
export const generalFaqs: FAQ[] = [
  {question:"What areas do you serve?",answer:"Bear River Plumbing serves communities across western Wyoming and eastern Idaho, including Alpine, Afton, Star Valley, Jackson Hole, Victor, Driggs, Idaho Falls, Rexburg, and Bear Lake County."},
  {question:"Do you handle residential and new construction plumbing?",answer:"Yes. We support homeowners as well as builders, contractors, developers, and homeowners."},
  {question:"How do I request service?",answer:"Use our request form with a short description of the problem or project. Submitting a request does not confirm an appointment; our team will follow up to discuss next steps."}
];
