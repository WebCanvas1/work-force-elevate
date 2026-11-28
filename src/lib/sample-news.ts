import type { NewsArticle } from "./news";

const samples = [
  {
    id: "planning-your-crew",
    title: "Planning the right crew for your next project",
    summary: "Preparing a clear staffing brief before work begins.",
    paragraphs: [
      "Every project brings a different set of workforce needs. A clear brief helps a recruitment team understand the roles, experience and availability you are looking for.",
      "Consider the number of workers required, shift times, location and expected duration. Include any role-specific tickets, licences or equipment requirements, along with the skills that will help new people settle into your team.",
      "Keeping these details together makes it easier to discuss suitable options and respond when plans change. Replace this sample with your own project planning advice or company update.",
    ],
  },
  {
    id: "welcoming-new-workers",
    title: "Welcoming new workers to your site",
    summary: "Helping new team members feel prepared for their first day.",
    paragraphs: [
      "A first day at an unfamiliar workplace can involve plenty of new information. A clear welcome gives workers a chance to meet their supervisor, understand the site and ask practical questions.",
      "Before the first shift, explain arrival arrangements, start times and who to contact. On arrival, introduce key team members and explain the tasks and communication channels relevant to the role.",
      "A short check-in can identify anything that needs clarification. This sample article can be replaced with your own onboarding advice or a story from your team.",
    ],
  },
  {
    id: "manufacturing-staffing",
    title: "Flexible staffing for changing production needs",
    summary: "Thinking ahead about workforce support for busy periods.",
    paragraphs: [
      "Production demand can change throughout the year. Planning for larger orders, scheduled leave and changing workloads helps businesses consider the support their existing team might need.",
      "Identify the roles that keep work moving and document the experience needed for each. Share expected shifts, equipment familiarity and the likely assignment duration when discussing staffing options.",
      "Regular communication keeps expectations clear as schedules develop. Replace this placeholder with a manufacturing update, a client-approved story or practical advice from your team.",
    ],
  },
  {
    id: "preparing-for-work",
    title: "Preparing for your next labour hire role",
    summary: "A simple starting point for candidates exploring a new opportunity.",
    paragraphs: [
      "Being organised before speaking with a recruiter helps you explain your experience and the type of work you are looking for. Start with an up-to-date CV and a summary of your recent roles.",
      "Have relevant licences and certificates ready. Think about your preferred locations, shift patterns and availability, and ask questions about the role and site expectations before your first day.",
      "If you are unsure about a requirement, discuss it with the recruitment team before starting. Replace this sample with your own candidate advice or recruitment announcement.",
    ],
  },
  {
    id: "property-maintenance",
    title: "Planning people for property maintenance",
    summary: "Organising workforce support for scheduled maintenance tasks.",
    paragraphs: [
      "Property maintenance can bring together a range of tasks, from routine upkeep to planned repairs. Understanding the work ahead helps identify the people and skills needed at each stage.",
      "Prepare a list of tasks, access arrangements and preferred timing. Note any specialised experience required and consider how the work will be coordinated with occupants, site contacts and other trades.",
      "A clear point of contact helps keep everyone informed as a schedule progresses. Use this sample space for a maintenance project update or your own planning article.",
    ],
  },
  {
    id: "clear-communication",
    title: "Keeping communication clear throughout a placement",
    summary: "Staying in touch as workforce needs evolve.",
    paragraphs: [
      "Good communication starts before a placement and continues throughout the work. Knowing who to contact helps both businesses and workers raise questions while they are still easy to resolve.",
      "Share updates when schedules, duties or workforce requirements change. Regular conversations also provide an opportunity to discuss how a placement is progressing and whether more information or support is needed.",
      "Clear expectations help people work together with confidence. Replace this placeholder with a team update, a service announcement or a client-approved story.",
    ],
  },
];

export const sampleNews: NewsArticle[] = samples.map((sample, i) => ({
  id: `sample-${sample.id}`,
  title: `Sample: ${sample.title}`,
  date: `2026-11-${28 - i}`,
  excerpt: `Sample content — ${sample.summary}`,
  body: "SAMPLE ARTICLE — for website demonstration only. Edit or delete this article in the admin News section, then click Publish changes.\n\n" + sample.paragraphs.join("\n\n"),
  published: true,
}));

// Only use samples when no article list has ever been saved. An explicit []
// published by the editor must remain empty, so deleted articles do not return.
export const defaultNewsJson = JSON.stringify(sampleNews);
