import { faqGroups } from "../../lib/faq-data";

export function EmployerFaqContent() {
  return (
    <section className="bg-surface py-16 md:py-24" aria-label="Frequently asked questions">
      <div className="container-x max-w-5xl">
        <nav aria-label="FAQ categories" className="mb-12 flex flex-wrap justify-center gap-3">
          {faqGroups.map(group => (
            <a key={group.id} href={`#faq-${group.id}`}
              className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white">
              {group.title}
            </a>
          ))}
        </nav>
        <div className="space-y-14">
          {faqGroups.map(group => (
            <section key={group.id} id={`faq-${group.id}`} className="scroll-mt-36">
              <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl">{group.title}</h2>
              <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                {group.items.map(item => (
                  <details key={item[0]} className="group px-5 md:px-8">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-base font-semibold text-primary marker:hidden md:text-lg [&::-webkit-details-marker]:hidden">
                      <span>{item[0]}</span>
                      <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-xl text-primary group-open:bg-primary group-open:text-white">
                        <span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span>
                      </span>
                    </summary>
                    <div className="whitespace-pre-line pb-7 pr-8 leading-7 text-muted-foreground">{item[1]}</div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
