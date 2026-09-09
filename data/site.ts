export type FAQ = { question: string; answer: string };
export type SiteConfig = { name:string; shortName:string; phone:string; phoneHref:string; email:string; hours:string; url:string; areas:string[] };
export const site: SiteConfig = {
  name:"Bear River Plumbing LLC", shortName:"Bear River Plumbing", phone:"541-399-4962", phoneHref:"tel:+15413994962", email:"BearRiverPlumbing@gmail.com",
  hours:"Monday–Friday · 9:00 AM–5:00 PM", url:"https://rosybrown-armadillo-385824.hostingersite.com",
  areas:["Eastern Idaho","Treasure Valley","Victor, ID","Driggs, ID","Idaho Falls, ID","Rexburg, ID","Bear Lake County, ID"]
};
export const generalFaqs: FAQ[] = [
  {question:"What areas do you serve?",answer:"Bear River Plumbing serves Eastern Idaho and the Treasure Valley, including Victor, Driggs, Idaho Falls, Rexburg, Bear Lake County, and qualifying projects throughout the Boise-area communities of the Treasure Valley."},
  {question:"Do you handle residential and new construction plumbing?",answer:"Yes. We support homeowners as well as builders, contractors, developers, and homeowners."},
  {question:"How do I request service?",answer:"Use our request form with a short description of the problem or project. Submitting a request does not confirm an appointment; our team will follow up to discuss next steps."}
];
