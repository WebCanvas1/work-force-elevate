import { ContentText } from "../../lib/site-content";

type FaqGroup = { id:string; title:string; items:{q:string;a:string}[] };
export const staffFaqs: FaqGroup[] = [
  {id:"getting-started",title:"Getting Started",items:[
    {q:"How quickly can you provide workers?",a:"Depending on your requirements, we can often provide skilled workers within 24 hours. For urgent requests, call us directly on 0451 267 768."},
    {q:"Is registration a commitment?",a:"No commitment is required. Complete a client application to access the service."},
    {q:"Can I book a small crew?",a:"Yes. Book one person for a day or a larger team."},
  ]},
  {id:"right-people",title:"Finding the Right People",items:[
    {q:"Do your workers have the necessary certifications?",a:"Yes — we carefully vet all workers to ensure they hold the required licences, tickets and industry experience for their role."},
    {q:"How are candidates assessed?",a:"Screening includes interviews, references, working rights and licence checks."},
    {q:"What if someone is unsuitable?",a:"Contact us and we will arrange another candidate."},
  ]},
  {id:"service",title:"How the Service Works",items:[
    {q:"Can I hire for short-term and long-term projects?",a:"Absolutely. We offer flexible hiring — a single day, a few weeks, or ongoing long-term placements."},
    {q:"Can staffing levels change?",a:"Yes. Adjust numbers to suit demand and request familiar workers again."},
    {q:"Who manages payroll?",a:"Your Crew handles payroll and timesheets."},
  ]},
  {id:"compliance",title:"Cost and Compliance",items:[
    {q:"Are there additional charges?",a:"You pay the quoted hourly rates; there are no setup fees."},
    {q:"Who employs the crew?",a:"Your Crew employs workers; your site manager supervises their work."},
    {q:"How are site inductions handled?",a:"We provide general onboarding. Hosts provide site-specific induction and training."},
  ]},
];
export const jobFaqs: FaqGroup[] = [
  {id:"applying",title:"Applying for Work",items:[
    {q:"How do I register?",a:"Use the registration form on this page to share your experience, licences and availability with our recruitment team."},
    {q:"Which roles can I register for?",a:"We welcome registrations for construction, manufacturing, maintenance, warehousing, trades and administration. Tell us about your skills so we can discuss suitable opportunities."},
  ]},
  {id:"preparing",title:"Preparing for a Placement",items:[
    {q:"What information should I provide?",a:"Include your contact details, experience, relevant tickets and licences, preferred locations and availability. You can also upload your resume."},
    {q:"How do I discuss a role or site requirements?",a:"Contact our recruitment team before starting if you have questions about a role, required tickets, PPE or site arrangements."},
  ]},
];

export function FaqSection({audience,groups}:{audience:"staff"|"jobs";groups:FaqGroup[]}) {
  return <section id="faq" className="bg-surface py-20 md:py-28" aria-labelledby={`${audience}-faq-heading`}>
    <div className="container-x max-w-5xl">
      <p className="font-semibold uppercase tracking-widest text-primary">Frequently asked questions</p>
      <h2 id={`${audience}-faq-heading`} className="mt-4 text-4xl font-bold text-primary md:text-5xl"><ContentText id={`${audience}.faq.title`} fallback={audience==="staff"?"Your staffing questions, answered.":"Your next step, made clearer."}/></h2>
      <p className="mt-5 max-w-3xl text-muted-foreground">Choose a topic, then open a question to read the answer.</p>
      <nav aria-label="FAQ topics" className="my-8 flex flex-wrap gap-3">{groups.map(g=><a key={g.id} href={`#faq-${g.id}`} onClick={e=>{e.preventDefault();document.getElementById(`faq-${g.id}`)?.scrollIntoView({behavior:"smooth",block:"start"});document.getElementById(`faq-${g.id}`)?.focus({preventScroll:true});}} className="rounded-full border border-border bg-white px-5 py-3 font-semibold text-primary hover:border-primary">{g.title}</a>)}</nav>
      <div className="space-y-10">{groups.map(g=><div key={g.id}>
        <h3 id={`faq-${g.id}`} tabIndex={-1} className="mb-4 scroll-mt-36 text-2xl font-bold text-primary">{g.title}</h3>
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">{g.items.map((f,i)=><details key={f.q} className="group px-6">
          <summary className="cursor-pointer py-6 font-semibold text-primary"><ContentText id={`${audience}.faq.${g.id}.${i}.question`} fallback={f.q}/></summary>
          <p className="pb-6 leading-relaxed text-muted-foreground"><ContentText id={`${audience}.faq.${g.id}.${i}.answer`} fallback={f.a}/></p>
        </details>)}</div>
      </div>)}</div>
    </div>
  </section>;
}
