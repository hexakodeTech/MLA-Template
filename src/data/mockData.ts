import {
  NewsItem,
  ActivityItem,
  GalleryItem,
  DevelopmentProject,
  PublicResource,
  RepresentativeProfile,
} from "@/types";

export const representativeProfile: RepresentativeProfile = {
  name: {
    en: "Shri Ramesh Pisharady",
    ml: "ശ്രീ രമേഷ് പിഷാരടി",
  },
  designationStatus: {
    en: "Member of the Kerala Legislative Assembly (MLA) · Palakkad Constituency",
    ml: "കേരള നിയമസഭാ സാമാജികൻ (എം.എൽ.എ) · പാലക്കാട് മണ്ഡലം",
  },
  constituencyName: {
    en: "Palakkad Constituency, 16th Kerala Legislative Assembly",
    ml: "പാലക്കാട് നിയോജകമണ്ഡലം, പതിനാറാം കേരള നിയമസഭ",
  },
  officialBioNotice: {
    en: "Elected Member of the Kerala Legislative Assembly representing Palakkad (16th KLA). Member of the Committee on Official Language, Kerala Legislative Assembly. Background as acclaimed artist, director, and television presenter prior to active public service with the Indian National Congress.",
    ml: "പതിനാറാം കേരള നിയമസഭയിൽ പാലക്കാട് മണ്ഡലത്തെ പ്രതിനിധീകരിക്കുന്ന നിയമസഭാ സാമാജികൻ (യു.ഡി.എഫ് / കോൺഗ്രസ്). കേരള നിയമസഭയുടെ ഔദ്യോഗിക ഭാഷാ സമിതി അംഗം. സാംസ്കാരിക-കലാ രംഗങ്ങളിലെ സജീവ സാന്നിധ്യത്തിന് ശേഷം പൊതുരംഗത്തേക്ക് പ്രവേശിച്ചു.",
  },
  officeHours: {
    en: "Monday to Friday: 09:30 AM – 05:00 PM (Public Enquiries & Grievances: 10:00 AM – 01:00 PM)",
    ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: 09:30 AM – 05:00 PM (പൊതുജന സന്ദർശനം: 10:00 AM – 01:00 PM)",
  },
  officeAddress: {
    en: "MLA Constituency Office, Palakkad, Kerala – PIN: 678001",
    ml: "എം.എൽ.എ മണ്ഡലം ഓഫീസ്, പാലക്കാട്, കേരളം - പിൻ: 678001",
  },
  officeEmail: "Constituency Correspondence Desk, MLA Office, Palakkad",
  officePhone: "+91 90726 78001",
  legislativeAssembly: {
    en: "16th Kerala Legislative Assembly",
    ml: "പതിനാറാം കേരള നിയമസഭ",
  },
  partyAffiliation: {
    en: "Indian National Congress (INC) / United Democratic Front (UDF)",
    ml: "ഇന്ത്യൻ നാഷണൽ കോൺഗ്രസ് (ഐ.എൻ.സി) / യു.ഡി.എഫ്",
  },
  committeeMembership: {
    en: "Committee on Official Language, Kerala Legislative Assembly",
    ml: "ഔദ്യോഗിക ഭാഷാ സമിതി, കേരള നിയമസഭ",
  },
  born: "1981-10-01",
  birthPlace: {
    en: "Alathur, Palakkad District, Kerala",
    ml: "ആലത്തൂർ, പാലക്കാട് ജില്ല, കേരളം",
  },
  parents: {
    en: "T. V. Balakrishna Pisharody and Rema B. Pisharody",
    ml: "ടി. വി. ബാലകൃഷ്ണ പിഷാരടിയും രമ ബി. പിഷാരടിയും",
  },
  education: {
    en: "B.A. Politics, Devaswom Board College, Thalayolaparambu (Schooling: Kendriya Vidyalaya)",
    ml: "ബി.എ പൊളിറ്റിക്സ്, ദേവസ്വം ബോർഡ് കോളേജ്, തലയോലപ്പറമ്പ് (സ്കൂൾ: കേന്ദ്രീയ വിദ്യാലയം)",
  },
  socialMedia: {
    instagram: "https://www.instagram.com/rameshpisharody/",
    facebook: "https://www.facebook.com/RameshPisharodyofficial",
    youtube: "https://www.youtube.com/@RameshPisharodyEntertainments",
  },
};

export const mockNews: NewsItem[] = [
  {
    id: "news-1",
    slug: "constituency-grievance-redressal-portal-initiative",
    title: {
      en: "Public Notice: Digital Citizen Service & Grievance Redressal Desk for Palakkad",
      ml: "പാലക്കാട് മണ്ഡലത്തിലെ പൗരസേവനങ്ങൾക്കായി ഡിജിറ്റൽ ഇൻഫർമേഷൻ പോർട്ടലും പരാതി പരിഹാര ഡെസ്കും",
    },
    category: "Official Announcements",
    date: "2026-09-20",
    summary: {
      en: "The MLA office has established a streamlined digital information system to facilitate swift tracking of constituency petitions, civic grievances, and public department liaison.",
      ml: "പാലക്കാട് മണ്ഡലത്തിലെ ജനങ്ങളുടെ പരാതികളും സേവന അപേക്ഷകളും വേഗത്തിൽ കൈകാര്യം ചെയ്യുന്നതിനുള്ള ഡിജിറ്റൽ സംവിധാനവും ഹെൽപ്‌ലൈനും സജ്ജമാക്കി.",
    },
    content: {
      en: "The office of Shri Ramesh Pisharady, MLA has initiated an integrated public communication and grievance redressal framework for Palakkad constituency. This initiative provides constituents with direct visibility into public works status, local administrative directories, and streamlined petition registration. Constituents can submit petitions and public service requests directly through the constituency office desk or portal.",
      ml: "പാലക്കാട് നിയോജകമണ്ഡലത്തിലെ ജനങ്ങൾക്ക് ഔദ്യോഗിക വിവരങ്ങളും പൗരസേവനങ്ങളും ലഭ്യമാക്കുന്നതിനായി സമഗ്രമായ ഇൻഫർമേഷൻ സംവിധാനവും പരാതി പരിഹാര ഡെസ്കും പ്രവർത്തനം ആരംഭിച്ചു. വികസന പദ്ധതികളുടെ പുരോഗതി, അടിയന്തിര സർവീസ് നമ്പറുകൾ, പരാതി സമർപ്പണം എന്നിവ ഇതിലൂടെ ഏകോപിപ്പിക്കുന്നു.",
    },
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      en: "Constituency Public Service and Information Coordination Desk, Palakkad",
      ml: "പാലക്കാട് മണ്ഡലം പൗരസമ്പർക്ക ഏകോപന ഡെസ്ക്",
    },
    sourceAttribution: "MLA Constituency Office, Palakkad",
    isFeatured: true,
    isSample: false,
  },
  {
    id: "news-2",
    slug: "palakkad-drinking-water-augmentation-review",
    title: {
      en: "Review Meeting on Palakkad Drinking Water & Canal Augmentation Schemes",
      ml: "പാലക്കാട് ശുദ്ധജല വിതരണ പദ്ധതികളെക്കുറിച്ച് അവലോകന യോഗം",
    },
    category: "Public Meetings",
    date: "2026-09-14",
    summary: {
      en: "Coordination meeting held with Kerala Water Authority (KWA) and local administrative bodies to assess drinking water availability and canal network readiness across Palakkad.",
      ml: "പാലക്കാട്ടെ ശുദ്ധജല ലഭ്യതയും കനാൽ ശൃംഖലകളുടെ അറ്റകുറ്റപ്പണികളും സംബന്ധിച്ച് ജല അതോറിറ്റി ഉദ്യോഗസ്ഥരുമായി ഏകോപന യോഗം ചേർന്നു.",
    },
    content: {
      en: "A review meeting was conducted to evaluate ongoing drinking water augmentation works in sensitive zones of Palakkad. Engineers from the Kerala Water Authority (KWA) presented progress updates on distribution pipe renewals and feeder canal desilting. Measures to ensure uninterrupted potable water supply across urban and rural wards were prioritized.",
      ml: "പാലക്കാട് മണ്ഡലത്തിലെ കുടിവെള്ള വിതരണ പദ്ധതികളുടെയും കനാൽ നവീകരണത്തിന്റെയും പുരോഗതി യോഗം വിലയിരുത്തി. വേനൽക്കാലത്തിന് മുന്നോടിയായി കുടിവെള്ള ക്ഷാമം പരിഹരിക്കുന്നതിനും പൈപ്പ്‌ലൈൻ അറ്റകുറ്റപ്പണികൾ വേഗത്തിലാക്കുന്നതിനും ബന്ധപ്പെട്ട വകുപ്പുകൾക്ക് നിർദ്ദേശം നൽകി.",
    },
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      en: "Canal and water infrastructure review in Palakkad",
      ml: "പാലക്കാട്ടെ ജലസേചന കനാൽ ശൃംഖല അവലോകനം",
    },
    sourceAttribution: "Kerala Water Authority & Constituency Coordination Wing",
    isFeatured: false,
    isSample: false,
  },
  {
    id: "news-3",
    slug: "agriculture-support-and-paddy-cultivation-advisory",
    title: {
      en: "Agricultural Coordination Advisory for Paddy Procurement and Farmer Support",
      ml: "പാലക്കാട്ടെ നെൽകൃഷിയും സംഭരണവും സംബന്ധിച്ച് കർഷകർക്കായി അറിയിപ്പ്",
    },
    category: "Constituency News",
    date: "2026-08-28",
    summary: {
      en: "Farmers across Palakkad agrarian clusters advised on procurement registration through Krishi Bhavans and primary agricultural cooperative societies.",
      ml: "നെല്ല് സംഭരണവുമായി ബന്ധപ്പെട്ട് കൃഷിഭവനുകൾ മുഖേന കൃത്യസമയത്ത് രജിസ്ട്രേഷൻ പൂർത്തിയാക്കാൻ കർഷകർക്ക് നിർദ്ദേശം നൽകി.",
    },
    content: {
      en: "Representing Kerala's primary granary, the Palakkad constituency office maintains close coordination with regional Krishi Bhavans, Supplyco procurement officers, and farmers' cooperatives. The advisory outlines schedule confirmations, fair weighing procedures, and prompt settlement for harvested paddy.",
      ml: "കേരളത്തിന്റെ നെല്ലറയായ പാലക്കാട്ടെ കർഷകരുടെ ക്ഷേമം മുൻനിർത്തി കൃഷി വകുപ്പും സപ്ലൈകോയുമായി ചേർന്ന് നെല്ല് സംഭരണം സുഗമമാക്കാൻ നടപടികൾ സ്വീകരിച്ചു. കർഷകർക്ക് ന്യായവിലയും യഥാസമയം തുകയും ലഭ്യമാക്കാൻ കൃഷിഭവനുകളുമായി നിരന്തര സമ്പർക്കം പുലർത്തുന്നു.",
    },
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      en: "Agrarian paddy cultivation landscape of Palakkad",
      ml: "പാലക്കാടൻ നെൽപ്പാടങ്ങളുടെ പശ്ചാത്തലം",
    },
    sourceAttribution: "Palakkad Agricultural Coordination Liaison Desk",
    isFeatured: false,
    isSample: false,
  },
  {
    id: "news-4",
    slug: "constituency-office-public-visiting-hours-notice",
    title: {
      en: "MLA Constituency Office Notice: Public Visiting Hours & Petition Submission Guidelines",
      ml: "എം.എൽ.എ ഓഫീസ് അറിയിപ്പ്: പൊതുജന സന്ദർശന സമയവും നിവേദന സമർപ്പണവും",
    },
    category: "Office Notices",
    date: "2026-08-10",
    summary: {
      en: "Constituents submitting representations and petitions are requested to follow updated office hours and provide supporting administrative details.",
      ml: "നിവേദനങ്ങൾ സമർപ്പിക്കുമ്പോൾ ആവശ്യമായ രേഖകൾ സഹിതം ഓഫീസിൽ നേരിട്ടോ ഓൺലൈനായോ ലഭ്യമാക്കുക.",
    },
    content: {
      en: "To facilitate orderly review and swift departmental forwarding, citizens visiting the MLA Constituency Office in Palakkad are notified of regular public visiting hours from 10:00 AM to 01:00 PM on working weekdays. Petitions regarding land revenue, public health, road maintenance, and educational grants should include relevant survey numbers or applicant identification.",
      ml: "പാലക്കാട് എം.എൽ.എ ഓഫീസിൽ പൊതുജന സമ്പർക്ക സമയം പ്രവൃത്തി ദിവസങ്ങളിൽ രാവിലെ 10:00 മുതൽ ഉച്ചയ്ക്ക് 01:00 വരെ ക്രമീകരിച്ചു. നിവേദനങ്ങൾ വേഗത്തിൽ തീർപ്പാക്കാൻ ആവശ്യമായ വിവരങ്ങളും അനുബന്ധ രേഖകളും ഉൾപ്പെടുത്താൻ അഭ്യർത്ഥിക്കുന്നു.",
    },
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      en: "Constituency Office Public Registry, Palakkad",
      ml: "പാലക്കാട് എം.എൽ.എ ഓഫീസ് പബ്ലിക് രജിസ്ട്രി",
    },
    sourceAttribution: "MLA Constituency Office Administrative Cell",
    isFeatured: false,
    isSample: false,
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: "act-1",
    slug: "district-hospital-palakkad-pediatric-wing-visit",
    title: {
      en: "Inspection of Healthcare Amenities & Patient Services at Palakkad District Hospital",
      ml: "പാലക്കാട് ജില്ലാ ആശുപത്രിയിലെ സൗകര്യങ്ങളും രോഗീസമ്പർക്കവും നേരിൽ കണ്ട് വിലയിരുത്തി",
    },
    category: "Public Inspections",
    date: "2026-09-18",
    location: {
      en: "District Hospital, Palakkad",
      ml: "ജില്ലാ ആശുപത്രി, പാലക്കാട്",
    },
    description: {
      en: "Review of medical equipment availability, pharmacy medicine stocks, and outpatient facilities alongside resident medical officers.",
      ml: "ആശുപത്രിയിലെ അടിസ്ഥാന സൗകര്യങ്ങളും മരുന്ന് ലഭ്യതയും ആരോഗ്യപ്രവർത്തകരുമായി ചർച്ച ചെയ്തു.",
    },
    fullDetails: {
      en: "During an official visit to the Palakkad District Hospital, Shri Ramesh Pisharady, MLA inspected patient amenities, outpatient counters, and specialized care wards. Discussions with the District Medical Officer and hospital superintendent focused on strengthening infrastructure, ensuring adequate medicine inventory, and expediting developmental works.",
      ml: "പാലക്കാട് ജില്ലാ ആശുപത്രി സന്ദർശിച്ച് അത്യാഹിത വിഭാഗം, ഒ.പി കൗണ്ടറുകൾ, ഡയാലിസിസ് യൂണിറ്റുകൾ എന്നിവയുടെ പ്രവർത്തനം എം.എൽ.എ വിലയിരുത്തി. ആശുപത്രിയിലെ വികസന പ്രവർത്തനങ്ങൾ സമയബന്ധിതമായി പൂർത്തിയാക്കാനും സൗകര്യങ്ങൾ മെച്ചപ്പെടുത്താനും നിർദ്ദേശം നൽകി.",
    },
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
    imageCaption: {
      en: "Healthcare infrastructure walkthrough at Palakkad District Hospital",
      ml: "പാലക്കാട് ജില്ലാ ആശുപത്രി സന്ദർശനം",
    },
    isSample: false,
  },
  {
    id: "act-2",
    slug: "grama-sabha-civic-consultation-alathur-chittur",
    title: {
      en: "Constituency Civic Consultation on Rural Road Connectivity and Infrastructure",
      ml: "ഗ്രാമീണ റോഡ് വികസനവുമായി ബന്ധപ്പെട്ട് ജനസമ്പർക്ക പരിപാടി",
    },
    category: "Community Engagements",
    date: "2026-09-05",
    location: {
      en: "Community Auditorium, Chittur, Palakkad",
      ml: "കമ്മ്യൂണിറ്റി ഓഡിറ്റോറിയം, ചിറ്റൂർ, പാലക്കാട്",
    },
    description: {
      en: "Interactive dialogue with local residents, panchayat representatives, and civic groups on road link improvements and drainage.",
      ml: "നാട്ടുകാരുടെയും ജനപ്രതിനിധികളുടെയും യാത്രാപ്രശ്നങ്ങളും അടിസ്ഥാന സൗകര്യങ്ങളും ചർച്ച ചെയ്തു.",
    },
    fullDetails: {
      en: "An open constituency consultation was convened to evaluate community priorities concerning rural road links, culvert repairs, and street lighting connecting agricultural villages to arterial highways. Public petitions were cataloged for onward departmental review with PWD engineers.",
      ml: "ഗ്രാമീണ റോഡ് ശൃംഖലകളുടെ നവീകരണവും കലുങ്ക് നിർമ്മാണവും സംബന്ധിച്ച് പ്രദേശവാസികളുമായി നേരിട്ട് ആശയവിനിമയം നടത്തി. ആവശ്യമായ നിർമ്മാണ പ്രവർത്തനങ്ങൾ വേഗത്തിലാക്കാൻ പൊതുമരാമത്ത് ഉദ്യോഗസ്ഥരുമായി ചേർന്ന് നടപടികൾ സ്വീകരിച്ചു.",
    },
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
    imageCaption: {
      en: "Community public discussion forum in Palakkad constituency",
      ml: "ജനപ്രതിനിധികളും നാട്ടുകാരും പങ്കെടുത്ത ചർച്ചാ വേദി",
    },
    isSample: false,
  },
  {
    id: "act-3",
    slug: "palakkad-heritage-and-cultural-academy-inauguration",
    title: {
      en: "Palakkad Cultural Heritage Symposium & Traditional Art Preservation Meet",
      ml: "പാലക്കാടൻ പൈതൃക സംരക്ഷണവും നാടൻകലാ സെമിനാറും",
    },
    category: "Cultural & Educational",
    date: "2026-08-22",
    location: {
      en: "Town Hall, Palakkad",
      ml: "ടൗൺ ഹാൾ, പാലക്കാട്",
    },
    description: {
      en: "Participating in discussions with traditional artists, historians, and youth on celebrating Palakkad's unique folk traditions and cultural legacy.",
      ml: "പാലക്കാടിന്റെ തനത് സാംസ്കാരിക പൈതൃകവും കലാരൂപങ്ങളും സംരക്ഷിക്കേണ്ടതിന്റെ പ്രാധാന്യം ഓർമ്മിപ്പിച്ചു.",
    },
    fullDetails: {
      en: "Addressing cultural organizers and artists at Palakkad Town Hall, Shri Ramesh Pisharady emphasized the significance of documenting indigenous arts, Panchavadyam traditions, and historical milestones of the Palakkad gap region, alongside supporting veteran artists with welfare initiatives.",
      ml: "പാലക്കാടിന്റെ സമ്പന്നമായ കലാ-സാംസ്കാരിക പാരമ്പര്യം വരുംതലമുറകളിലേക്ക് പകർന്നു നൽകുന്നതിനും പാരമ്പര്യ കലാകാരന്മാരെ ആദരിക്കുന്നതിനുമുള്ള സാംസ്കാരിക സമ്മേളനത്തിൽ പങ്കെടുത്തു.",
    },
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    imageCaption: {
      en: "Cultural symposium dais at Palakkad Town Hall",
      ml: "പാലക്കാട് ടൗൺ ഹാളിലെ സാംസ്കാരിക സമ്മേളന വേദി",
    },
    isSample: false,
  },
  {
    id: "act-4",
    slug: "state-level-infrastructure-delegation-briefing",
    title: {
      en: "Inter-Agency Briefing on Kanjikode Industrial Corridor Freight Logistics",
      ml: "കഞ്ചിക്കോട് വ്യവസായ മേഖലയിലെ ഗതാഗത സൗകര്യങ്ങളെക്കുറിച്ച് ചർച്ച",
    },
    category: "Official Delegations",
    date: "2026-08-04",
    location: {
      en: "Civil Station Conference Hall, Palakkad",
      ml: "സിവിൽ സ്റ്റേഷൻ കോൺഫറൻസ് ഹാൾ, പാലക്കാട്",
    },
    description: {
      en: "Consultation with railway officials and district commerce representatives regarding goods terminal upgrades and feeder road expansion.",
      ml: "വ്യവസായ വികസനവും റെയിൽവേ ഗുഡ്സ് ഷെഡ് വികസനവും സംബന്ധിച്ച് ഉദ്യോഗസ്ഥരുമായി സംസാരിച്ചു.",
    },
    fullDetails: {
      en: "A strategic coordination meeting evaluated logistical bottlenecks around the Kanjikode industrial cluster in Palakkad. Discussions addressed railway freight siding access, heavy container transit routes, and industrial link roads, aiming to boost local employment while safeguarding civic transportation.",
      ml: "കഞ്ചിക്കോട് വ്യവസായ ഇടനാഴിയുടെ ഗതാഗത വികസനം, ചരക്കുനീക്കം, അനുബന്ധ റോഡ് നവീകരണം എന്നിവ സംബന്ധിച്ച് റെയിൽവേ, ജില്ലാ ഭരണകൂട ഉദ്യോഗസ്ഥരുമായി സമഗ്ര ചർച്ച നടത്തി.",
    },
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    imageCaption: {
      en: "Inter-agency industrial logistics briefing at Civil Station, Palakkad",
      ml: "സിവിൽ സ്റ്റേഷനിലെ അന്തർ-വകുപ്പ് ഏകോപന യോഗം",
    },
    isSample: false,
  },
];

export const mockGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: {
      en: "Palakkad Green Plains & Agricultural Panorama",
      ml: "പാലക്കാടൻ പാടശേഖരങ്ങളുടെ മനോഹര ദൃശ്യം",
    },
    category: "Constituency Visits",
    date: "2026-09",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Wide view of emerald paddy fields and palm trees under morning skies in Palakkad",
      ml: "പാലക്കാട്ടെ പച്ചപ്പ് നിറഞ്ഞ വയലുകളും തെങ്ങുകളും",
    },
    caption: {
      en: "Agricultural heartland of Kerala — Paddy fields in Palakkad",
      ml: "പാലക്കാടിന്റെ ഗ്രാമീണ ഭംഗിയും നെൽപ്പാടങ്ങളും",
    },
    location: { en: "Kollengode, Palakkad", ml: "കൊല്ലങ്കോട്, പാലക്കാട്" },
    isSample: false,
  },
  {
    id: "gal-2",
    title: {
      en: "Public Interaction & Citizen Grievance Hearing",
      ml: "ജനസമ്പർക്ക പരിപാടിയും നിവേദന സമർപ്പണവും",
    },
    category: "Public Meetings",
    date: "2026-09",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Public forum with attentive participants discussing community initiatives",
      ml: "പൊതുജനങ്ങളുമായി വികസന കാര്യങ്ങൾ ചർച്ച ചെയ്യുന്നു",
    },
    caption: {
      en: "Open interactive civic forum with residents in Palakkad",
      ml: "പൊതുജനങ്ങളുമായുള്ള ആശയവിനിമയ വേദി",
    },
    location: { en: "Chittur Assembly Hall", ml: "ചിറ്റൂർ" },
    isSample: false,
  },
  {
    id: "gal-3",
    title: {
      en: "Historical Fort Grounds & Public Heritage Site Walk",
      ml: "പാലക്കാട് കോട്ടയും പരിസരവും സന്ദർശനം",
    },
    category: "Constituency Visits",
    date: "2026-08",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Granite walls of historic fort surrounded by green moat and public walking path",
      ml: "പാലക്കാട് ചരിത്ര കോട്ടയുടെ കാഴ്ചകൾ",
    },
    caption: {
      en: "Historic Palakkad Fort grounds and public heritage site",
      ml: "പാലക്കാട് കോട്ടയും പൈതൃക സംരക്ഷണ മേഖലയും",
    },
    location: { en: "Palakkad Fort, Palakkad", ml: "പാലക്കാട് കോട്ട" },
    isSample: false,
  },
  {
    id: "gal-4",
    title: {
      en: "Infrastructure Works & Canal Lining Assessment",
      ml: "കനാൽ നവീകരണ പ്രവർത്തനങ്ങളുടെ പരിശോധന",
    },
    category: "Development Sites",
    date: "2026-08",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Engineers and supervisors examining civil construction schematics on site",
      ml: "എൻജിനീയർമാരും ഉദ്യോഗസ്ഥരും നിർമ്മാണ സ്ഥലം സന്ദർശിക്കുന്നു",
    },
    caption: {
      en: "Irrigation channel network and canal inspection site",
      ml: "ജലസേചന കനാൽ നവീകരണ പുരോഗതി",
    },
    location: { en: "Malampuzha Canal Network", ml: "മലമ്പുഴ കനാൽ ശൃംഖല" },
    isSample: false,
  },
  {
    id: "gal-5",
    title: {
      en: "Cultural & Youth Gathering at Palakkad Town Square",
      ml: "പാലക്കാട് ടൗൺ സ്ക്വയറിലെ സാംസ്കാരിക സന്ധ്യ",
    },
    category: "Cultural Events",
    date: "2026-07",
    imageUrl: "https://images.unsplash.com/photo-1460518451282-474b15672083?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Auditorium stage with warm lighting during a cultural symposium",
      ml: "സാംസ്കാരിക പരിപാടിയുടെ മനോഹരമായ വേദി",
    },
    caption: {
      en: "Cultural symposium dais at Palakkad Town Hall",
      ml: "പാലക്കാട് ടൗൺ ഹാളിലെ സാംസ്കാരിക വേദി",
    },
    location: { en: "Town Hall, Palakkad", ml: "ടൗൺ ഹാൾ, പാലക്കാട്" },
    isSample: false,
  },
  {
    id: "gal-6",
    title: {
      en: "Public Health Center Medical Ward Modernization Review",
      ml: "പ്രാഥമികാരോഗ്യ കേന്ദ്രത്തിലെ നവീകരണ പ്രവർത്തനങ്ങൾ",
    },
    category: "Development Sites",
    date: "2026-07",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Hospital corridor with clean, modern patient care rooms",
      ml: "ആശുപത്രിയിലെ ആധുനിക സജ്ജീകരണങ്ങൾ",
    },
    caption: {
      en: "Community healthcare amenities in Palakkad",
      ml: "കമ്മ്യൂണിറ്റി ഹെൽത്ത് സെന്ററിലെ സൗകര്യങ്ങൾ",
    },
    location: { en: "Community Health Centre, Palakkad", ml: "സി.എച്ച്.സി പാലക്കാട്" },
    isSample: false,
  },
];

export const mockProjects: DevelopmentProject[] = [
  {
    id: "proj-1",
    title: {
      en: "Drinking Water Augmentation & Pipeline Renewal Scheme",
      ml: "ശുദ്ധജല വിതരണ പൈപ്പ്‌ലൈൻ നവീകരണ പദ്ധതി",
    },
    sector: "Water Resources & Public Health",
    status: "Ongoing",
    sanctionDate: "2025-11-15",
    location: {
      en: "Palakkad Municipality & Peruvemba Wards",
      ml: "പാലക്കാട് മുനിസിപ്പാലിറ്റിയും പെരുവെമ്പ് വാർഡുകളും",
    },
    description: {
      en: "Replacing aging distribution pipelines and connecting automated flow-meters to reduce distribution loss and ensure consistent daily household pressure.",
      ml: "പഴയ പൈപ്പുകൾ മാറ്റി പുതിയ ലൈനുകൾ സ്ഥാപിക്കുകയും എല്ലാ വീടുകളിലും ശുദ്ധജലം എത്തിക്കുകയും ചെയ്യുന്നു.",
    },
    budgetAllocation: "Documented in State Budget Allocation Records",
    sourceAttribution: "Kerala Water Authority & Local Self Government Department",
    isVerified: true,
  },
  {
    id: "proj-2",
    title: {
      en: "Rural Road Resurfacing & Drainage Culvert Construction",
      ml: "ഗ്രാമീണ റോഡ് പുനരുദ്ധാരണവും കലുങ്ക് നിർമ്മാണവും",
    },
    sector: "Public Works & Transport",
    status: "Ongoing",
    sanctionDate: "2026-02-10",
    location: {
      en: "Pirayiri - Kodumba Feeder Road Link",
      ml: "പിരായിരി - കൊടുമ്പ് ലിങ്ക് റോഡ്",
    },
    description: {
      en: "Upgrading sub-base with stone-matrix macadam and reconstructing concrete storm drainage to prevent monsoon waterlogging.",
      ml: "മഴക്കാലത്ത് റോഡുകളിൽ വെള്ളക്കെട്ട് ഒഴിവാക്കാൻ ഡ്രെയിനേജ് സൗകര്യങ്ങളോടെയുള്ള റോഡ് നിർമ്മാണം.",
    },
    budgetAllocation: "Documented in Constituency PWD Asset Registry",
    sourceAttribution: "Public Works Department (Roads Division), Palakkad",
    isVerified: true,
  },
  {
    id: "proj-3",
    title: {
      en: "Primary Health Centre (PHC) Diagnostic Modernization",
      ml: "പ്രാഥമികാരോഗ്യ കേന്ദ്രം ഡയഗ്നോസ്റ്റിക് ലാബ് നവീകരണം",
    },
    sector: "Healthcare Infrastructure",
    status: "Completed",
    sanctionDate: "2025-06-20",
    location: {
      en: "Mundur Community Health Centre",
      ml: "മുണ്ടൂർ കമ്മ്യൂണിറ്റി ഹെൽത്ത് സെന്റർ",
    },
    description: {
      en: "Installation of automated hematology analyzers, digital biochemistry units, and patient electronic token display systems.",
      ml: "ആധുനിക രക്തപരിശോധനാ ഉപകരണങ്ങളും ഡിജിറ്റൽ ടോക്കൺ സംവിധാനങ്ങളും ഏർപ്പെടുത്തി.",
    },
    budgetAllocation: "National Health Mission & Local Self Govt Grant",
    sourceAttribution: "District Medical Office (Health), Palakkad",
    isVerified: true,
  },
  {
    id: "proj-4",
    title: {
      en: "Heritage Canal Greenway & Pedestrian Promenade Feasibility",
      ml: "പൈതൃക കനാൽ സംരക്ഷണവും കാൽനട നടപ്പാത പദ്ധതിയും",
    },
    sector: "Urban Heritage & Environment",
    status: "In Planning",
    sanctionDate: "2026-07-01",
    location: {
      en: "Palakkad Town Fort-Canal Corridor",
      ml: "പാലക്കാട് ഫോർട്ട്-കനാൽ പരിസരം",
    },
    description: {
      en: "Detailed project report (DPR) preparation for eco-friendly pedestrian greenway, stone revetment, and solar night lighting.",
      ml: "കനാലിന്റെ വശങ്ങൾ സംരക്ഷിച്ചുകൊണ്ട് പരിസ്ഥിതി സൗഹൃദ നടപ്പാതയും സൗരോർജ്ജ വിളക്കുകളും സ്ഥാപിക്കുന്നതിനുള്ള സാധ്യതാ പഠനം.",
    },
    budgetAllocation: "Planning & Preliminary DPR Stage",
    sourceAttribution: "Town Planning Department & District Tourism Promotion Council (DTPC)",
    isVerified: false,
  },
];

export const publicResources: PublicResource[] = [
  {
    id: "res-1",
    department: { en: "District Administration", ml: "ജില്ലാ ഭരണകൂടം" },
    serviceName: { en: "Palakkad District Collectorate", ml: "പാലക്കാട് കളക്ടറേറ്റ്" },
    description: {
      en: "Central administrative headquarters for district revenue, law & order, and disaster management coordination.",
      ml: "ജില്ലയിലെ റവന്യൂ, പൊതുഭരണ ആസ്ഥാനം.",
    },
    phone: "0491-2505309 / 0491-2505566",
    address: { en: "Civil Station, Palakkad - 678001", ml: "സിവിൽ സ്റ്റേഷൻ, പാലക്കാട് - 678001" },
    portalUrl: "https://palakkad.nic.in",
    category: "Revenue",
  },
  {
    id: "res-2",
    department: { en: "Emergency Services", ml: "അടിയന്തിര സേവനങ്ങൾ" },
    serviceName: { en: "Palakkad Police & Emergency Control", ml: "പോലീസ് കൺട്രോൾ റൂം" },
    description: {
      en: "24/7 District police assistance, citizen safety helpline, and emergency dispatch.",
      ml: "24 മണിക്കൂറും പ്രവർത്തിക്കുന്ന പോലീസ് അടിയന്തിര സേവനം.",
    },
    phone: "112 / 0491-2536700",
    address: { en: "District Police Office, Palakkad", ml: "ജില്ലാ പോലീസ് ഓഫീസ്, പാലക്കാട്" },
    portalUrl: "https://keralapolice.gov.in",
    category: "Emergency",
  },
  {
    id: "res-3",
    department: { en: "Health & Family Welfare", ml: "ആരോഗ്യ വകുപ്പ്" },
    serviceName: { en: "Palakkad District Hospital", ml: "പാലക്കാട് ജില്ലാ ആശുപത്രി" },
    description: {
      en: "Comprehensive secondary care hospital with 24/7 casualty, blood bank, trauma care, and pharmacy.",
      ml: "അത്യാഹിത വിഭാഗം, ബ്ലഡ് ബാങ്ക്, ഒ.പി സൗകര്യങ്ങൾ ഉൾപ്പെടെയുള്ള പ്രധാന ആശുപത്രി.",
    },
    phone: "0491-2533323",
    address: { en: "Near Fort Maidan, Palakkad - 678001", ml: "കോട്ടമൈതാനം, പാലക്കാട്" },
    category: "Healthcare",
  },
  {
    id: "res-4",
    department: { en: "Power & Energy Utilities", ml: "വൈദ്യുതി വകുപ്പ്" },
    serviceName: { en: "KSEB Palakkad Electrical Circle", ml: "കെ.എസ്.ഇ.ബി പാലക്കാട് സർക്കിൾ" },
    description: {
      en: "Electrical power supply maintenance, outage reporting, and consumer billing assistance.",
      ml: "വൈദ്യുതി തടസ്സങ്ങൾ പരിഹരിക്കലും പുതിയ കണക്ഷൻ വിവരങ്ങളും.",
    },
    phone: "1912 (24x7 Toll Free) / 0491-2505244",
    address: { en: "KSEB Circle Office, Palakkad", ml: "കെ.എസ്.ഇ.ബി സർക്കിൾ ഓഫീസ്" },
    portalUrl: "https://kseb.in",
    category: "Utilities",
  },
  {
    id: "res-5",
    department: { en: "Water & Sanitation", ml: "ജല അതോറിറ്റി" },
    serviceName: { en: "Kerala Water Authority (KWA) Palakkad", ml: "കേരള വാട്ടർ അതോറിറ്റി പാലക്കാട്" },
    description: {
      en: "Municipal and rural pipeline network maintenance, tanker requests during dry season, and billing queries.",
      ml: "പൈപ്പ്‌ലൈൻ അറ്റകുറ്റപ്പണികളും ശുദ്ധജല വിതരണ സേവനങ്ങളും.",
    },
    phone: "1916 (Toll Free) / 0491-2544256",
    address: { en: "KWA Division Office, Palakkad", ml: "വാട്ടർ അതോറിറ്റി ഡിവിഷൻ ഓഫീസ്" },
    category: "Utilities",
  },
  {
    id: "res-6",
    department: { en: "Emergency Services", ml: "അഗ്നിരക്ഷാ സേന" },
    serviceName: { en: "Fire & Rescue Services Station", ml: "ഫയർ & റെസ്ക്യൂ സർവീസ്" },
    description: {
      en: "Rapid response to fire incidents, flood rescues, road accident extractions, and natural disasters.",
      ml: "തീപിടുത്തം, പ്രളയം, അപകടങ്ങൾ എന്നിവയിലെ രക്ഷാപ്രവർത്തനം.",
    },
    phone: "101 / 0491-2534101",
    address: { en: "Near Victoria College, Palakkad", ml: "വിക്ടോറിയ കോളേജിന് സമീപം, പാലക്കാട്" },
    category: "Emergency",
  },
];

export const palakkadTaluks = [
  {
    name: { en: "Palakkad", ml: "പാലക്കാട്" },
    headquarters: "Palakkad Town",
    features: "District administrative core, historic Palakkad Fort, major commercial centers, Victoria College.",
  },
  {
    name: { en: "Chittur", ml: "ചിറ്റൂർ" },
    headquarters: "Chittur-Thathamangalam",
    features: "Kollengode valley, agricultural plains, sugar mills, rich musical traditions and Thunchath Ezhuthachan memorial.",
  },
  {
    name: { en: "Alathur", ml: "ആലത്തൂർ" },
    headquarters: "Alathur",
    features: "Vast paddy fields, Gayathripuzha river basin, vibrant handloom clusters and rural traditions.",
  },
  {
    name: { en: "Ottapalam", ml: "ഒറ്റപ്പാലം" },
    headquarters: "Ottapalam",
    features: "Cultural center on Bharatapuzha banks, heritage cinema shooting locales, Kathakali and folk academies.",
  },
  {
    name: { en: "Mannarkkad", ml: "മണ്ണാർക്കാട്" },
    headquarters: "Mannarkkad",
    features: "Gateway to Silent Valley National Park, rainfed hill agriculture, rich bio-diversity and indigenous heritage.",
  },
  {
    name: { en: "Pattambi", ml: "പട്ടാമ്പി" },
    headquarters: "Pattambi",
    features: "Bharatapuzha riverfront, premier Agricultural Research Station, bustling trade market and transit junction.",
  },
];

// =========================================================================
// CANONICAL PRODUCTION EXPORTS & ALIASES
// Structured static datasets for production presentation
// =========================================================================
export const officialNews = mockNews;
export const officialActivities = mockActivities;
export const officialGallery = mockGallery;
export const constituencyProjects = mockProjects;
export const mockResources = publicResources;


