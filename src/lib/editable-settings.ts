import faqImage from "../assets/your-crew-recruitment.jpg";
import { useContentValue } from "./site-content";

export type EditorSetting = { id:string; label:string; value:string; type?:"textarea"|"image"|"select"; options?:{label:string;value:string}[] };
const visibility = [{label:"Show section",value:"true"},{label:"Hide section",value:"false"}];
export const editableSettings: Record<string,EditorSetting[]> = {
  home: [
    {id:"home.features.0.title",label:"Hero feature 1 title",value:"Skilled Workers"},
    {id:"home.features.0.body",label:"Hero feature 1 description",value:"Pre-screened tradespeople ready for site."},
    {id:"home.features.1.title",label:"Hero feature 2 title",value:"Fast Placements"},
    {id:"home.features.1.body",label:"Hero feature 2 description",value:"Workers deployed in as little as 24 hours."},
    {id:"home.features.2.title",label:"Hero feature 3 title",value:"Australia Wide"},
    {id:"home.features.2.body",label:"Hero feature 3 description",value:"Melbourne based, servicing statewide & interstate."},
    {id:"home.features.visible",label:"Hero feature cards visibility",value:"true",type:"select",options:visibility},
    {id:"home.certifications.visible",label:"Certification images visibility",value:"true",type:"select",options:visibility},
    {id:"home.process.visible",label:"How it works visibility",value:"true",type:"select",options:visibility},
  ],
  about: [
    {id:"about.location.body",label:"Team location and meeting arrangements",type:"textarea",value:"Our team is based in Ringwood, with meetings and appointments available at any Waterman Workspaces location."},
    {id:"about.service.years",label:"Years of service number",value:"22+"},
    {id:"about.service.label",label:"Years of service label",value:"Years of service"},
    {id:"about.service.tile.1",label:"Service tile — manager",value:"Own Manager"},
    {id:"about.service.tile.2",label:"Service tile — service",value:"Trusted Service"},
    {id:"about.service.tile.3",label:"Service tile — communication",value:"Great Communication and quick response."},
    {id:"about.spacing",label:"Spacing between sections",value:"compact",type:"select",options:[{label:"Compact",value:"compact"},{label:"Spacious",value:"spacious"}]},
  ],
  jobs: [
    {id:"jobs.register.button",label:"Registration button label",value:"Register now"},
    {id:"jobs.register.url",label:"Registration form link",value:"https://yourcrew-portal.workforceone.com.au/employee/#/register"},
    {id:"jobs.register.theme",label:"Registration section colour",value:"navy",type:"select",options:[{label:"Navy blue",value:"navy"},{label:"Light",value:"light"}]},
    {id:"jobs.register.visible",label:"Registration callout visibility",value:"true",type:"select",options:visibility},
    {id:"jobs.contact.email",label:"Recruitment email",value:"recruit@yourcrew.com.au"},
    {id:"jobs.contact.phone",label:"Recruitment phone",value:"03 9108 1102"},
    {id:"jobs.section.order",label:"Recruitment and registration order",value:"contact-first",type:"select",options:[{label:"Questions first, registration below",value:"contact-first"},{label:"Registration first, questions below",value:"register-first"}]},
  ],
  contact: [
    {id:"contact.office.label",label:"Office heading",value:"Melbourne Office"},
    {id:"contact.office.address",label:"Office address",type:"textarea",value:"Waterman Suite 586, C307,\nEastland Shopping Centre,\nLevel 3, 175 Maroondah Highway,\nRingwood VIC 3134"},
    {id:"contact.office.map",label:"Google Maps embed URL",value:"https://maps.google.com/maps?cid=11839961445765829978&z=17&output=embed"},
    {id:"contact.office.directions",label:"Office directions link",value:"https://maps.app.goo.gl/9MCphiEC5VmmB88p7"},
    {id:"contact.office.maplabel",label:"Directions link label",value:"Get directions to Waterman Eastland"},
    {id:"contact.hours",label:"Business hours",value:"Mon – Fri, 7:00am – 6:00pm"},
    {id:"contact.services.visible",label:"Service tiles visibility",value:"true",type:"select",options:visibility},
    {id:"contact.services.position",label:"Service tiles position",value:"after",type:"select",options:[{label:"Below map and contact form",value:"after"},{label:"Above map and contact form",value:"before"}]},
  ],
  faq: [
    {id:"faq.hero.title",label:"FAQ hero heading",value:"FAQ"},
    {id:"faq.hero.body",label:"FAQ introduction",value:"Find answers to commonly asked questions about Your Crew services.",type:"textarea"},
    {id:"faq.hero.image",label:"FAQ hero image",value:faqImage,type:"image"},
  ],
  news: [
    {id:"news.article.width",label:"Article page width",value:"wide",type:"select",options:[{label:"Wide",value:"wide"},{label:"Standard",value:"standard"}]},
  ],
  settings: [
    {id:"global.social.linkedin",label:"LinkedIn profile URL",value:"https://www.linkedin.com/company/your-crew-pty-ltd/"},
    {id:"global.social.facebook",label:"Facebook profile URL",value:"https://www.facebook.com/yourcrewaustralia"},
    {id:"global.social.instagram",label:"Instagram profile URL (optional)",value:""},
    {id:"global.keep.title",label:"Keep in touch heading",value:"Keep in touch"},
    {id:"global.keep.body",label:"Keep in touch text",value:"Follow Your Crew for news and updates, or get in touch to discuss your staffing needs.",type:"textarea"},
    {id:"global.keep.button",label:"Keep in touch button",value:"Contact us"},
    {id:"global.keep.visible",label:"Keep in touch section visibility",value:"true",type:"select",options:visibility},
    {id:"global.text.size",label:"Minimum public text size",value:"18",type:"select",options:[{label:"18 pixels",value:"18"},{label:"20 pixels",value:"20"}]},
    {id:"global.logo.size",label:"Header logo size",value:"large",type:"select",options:[{label:"Large",value:"large"},{label:"Compact",value:"compact"}]},
    {id:"global.request.destination",label:"Request staff button destination",value:"/contact",type:"select",options:[{label:"Contact page",value:"/contact"},{label:"Find Staff page",value:"/find-staff"}]},
  ],
};
export const editableDefaults = Object.fromEntries(Object.values(editableSettings).flat().map(f=>[f.id,f.value]));
export function useSetting(id:string) { return useContentValue(id,editableDefaults[id]??""); }
export function useRequestDestination(): "/contact"|"/find-staff" { return useSetting("global.request.destination")==="/find-staff"?"/find-staff":"/contact"; }
export function safeWebUrl(value:string,fallback:string) {try {return new URL(value).protocol==="https:"?value:fallback;}catch{return fallback;}}
export function safeMapUrl(value:string) {
  const fallback=editableDefaults["contact.office.map"];
  try {const u=new URL(value);return u.protocol==="https:"&&["maps.google.com","www.google.com"].includes(u.hostname)&&u.pathname.startsWith("/maps")?value:fallback;}catch{return fallback;}
}
