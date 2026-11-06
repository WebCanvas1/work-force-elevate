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
  {id:"registration",title:"Getting Ready for Work",items:[
    {q:"What skills and qualifications do I need?",a:"This depends on the role you are looking for!\n\nIn general, we are looking for people who are capable, reliable and good communicators.\n\nConstruction Specific\n• White Card: Mandatory for working on any construction site in Australia.\n• High-Risk Work Licences: Needed for specialised roles like forklift driving, elevated work platforms (EWPs), or scaffold work.\n• If working on school sites, a Working With Children’s Check will be required."},
    {q:"What documents do I need to register with an agency?",a:"• Valid photo ID (driver’s licence or passport)\n• Copies of your White Card and any trade tickets or licences\n• Tax File Number (TFN)\n• Bank account details for your weekly pay\n• Superannuation fund details\n• Proof of work rights in Australia (e.g., birth certificate, citizenship, or passport with visa details)"},
    {q:"What Personal Protective Equipment (PPE) do I need?",a:"You typically need to supply your own basic PPE before heading to a site, which includes:\n\n• Steel-cap boots\n• High-visibility vest or clothing\n• Safety glasses\n• Hard hat (for construction sites)\n• Protective gloves"},
  ]},
  {id:"employment",title:"Employment and Pay",items:[
    {q:"Who is my employer?",a:"Your Crew is your employer and you will be working on a host site. Your Crew is responsible for your wages, superannuation, tax (PAYG), WorkCover insurance. Your Crew and the host site employer are jointly responsible for your workplace management and care."},
    {q:"Who pays me and how much will I get paid?",a:"Your Crew employees are paid in accordance with their employment arrangements and the applicable award or enterprise agreement.\n\nAward Rates: Pay is calculated according to the relevant modern award (such as the Building and Construction General On-site Award or Labourers Award).\n\nAllowances: Depending on the site and job, you may receive daily travel/fares allowances, meal allowances, or site-specific allowances."},
    {q:"How does getting paid and submitting timesheets work?",a:"You will submit your hours via our online portal (mobile or computer accessible) on a weekly basis.\n\nYour timesheet must be approved by the site supervisor or host employer.\n\nOnce approved, we pay you weekly."},
  ]},
  {id:"safety-support",title:"Safety and Support",items:[
    {q:"What safety rights and responsibilities do I have?",a:"Under Australian workplace health and safety laws, both the labour hire agency and the host employer share a duty of care.\n\nYour Crew will ensure you are properly trained, licensed, and fitted for the role.\n\nThe host employer must provide a safe working environment, proper site inductions, and necessary on-site safety equipment. If a site is unsafe, you have the right to raise it and refuse unsafe work.\n\nYou must also take reasonable care of your own health and safety and that of others, follow safety instructions and procedures, use required PPE, attend inductions and training, and report hazards, incidents, injuries and near misses immediately."},
    {q:"Who do I notify if I am unable to work?",a:"You should contact us (Your Crew) first if you are running late or unable to work. You should also notify your site supervisor. Your Crew remains responsible for your employment and employment-related matters."},
    {q:"How can I access Your Crew policies?",a:"Your employee portal has a “Company Documents” tab, where you can find policies including:\n\n• Fair Work Information Statement\n• OHS Management Plan\n• Privacy Policy\n• Photography Policy"},
  ]},
];

export function FaqSection({audience,groups}:{audience:"staff"|"jobs";groups:FaqGroup[]}) {
  return <section id="faq" className="bg-surface py-20 md:py-28" aria-labelledby={`${audience}-faq-heading`}>
    <div className="container-x max-w-5xl">
      <p className="font-semibold uppercase tracking-widest text-primary">Frequently asked questions</p>
      <h2 id={`${audience}-faq-heading`} className="mt-4 text-4xl font-bold text-primary md:text-5xl"><ContentText id={`${audience}.faq.title`} fallback={audience==="staff"?"Your staffing questions, answered.":"Frequently asked questions"}/></h2>
      <p className="mt-5 max-w-3xl text-muted-foreground">Choose a topic, then open a question to read the answer.</p>
      <nav aria-label="FAQ topics" className="my-8 flex flex-wrap gap-3">{groups.map(g=><a key={g.id} href={`#faq-${g.id}`} onClick={e=>{e.preventDefault();document.getElementById(`faq-${g.id}`)?.scrollIntoView({behavior:"smooth",block:"start"});document.getElementById(`faq-${g.id}`)?.focus({preventScroll:true});}} className="rounded-full border border-border bg-white px-5 py-3 font-semibold text-primary hover:border-primary">{g.title}</a>)}</nav>
      <div className="space-y-10">{groups.map(g=><div key={g.id}>
        <h3 id={`faq-${g.id}`} tabIndex={-1} className="mb-4 scroll-mt-36 text-2xl font-bold text-primary">{g.title}</h3>
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">{g.items.map((f,i)=><details key={f.q} className="group px-6">
          <summary className="cursor-pointer py-6 font-semibold text-primary"><ContentText id={`${audience}.faq.${g.id}.${i}.question`} fallback={f.q}/></summary>
          <p className="whitespace-pre-line pb-6 leading-relaxed text-muted-foreground"><ContentText id={`${audience}.faq.${g.id}.${i}.answer`} fallback={f.a}/></p>
        </details>)}</div>
      </div>)}</div>
    </div>
  </section>;
}
