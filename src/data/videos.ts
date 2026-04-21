export type Video = {
  id: string;
  title: string;
  topic: string;
  desc: string;
};

// Keep the primary curated picks at the top — these are the ones
// that pair one-to-one with the syllabus topics.
export const videos: Video[] = [
  {
    id: 'ChOb6xXxKEw',
    title: 'The Fitzpatrick scale, explained',
    topic: 'Anatomy',
    desc: 'A clean walkthrough of skin types I–VI and how they drive treatment selection and patch testing.',
  },
  {
    id: 'NInDZH7Evtk',
    title: 'Autoclave sterilization, step by step',
    topic: 'Infection Control',
    desc: 'Loading, cycle selection, and unloading for a tabletop autoclave — exactly the protocol the exam will probe.',
  },
  {
    id: '7w0-4jIOpqQ',
    title: 'The four steps of instrument sterilization',
    topic: 'Infection Control',
    desc: 'Cleaning → packaging → sterilization → storage. Break the chain at any step and the whole protocol fails.',
  },
  {
    id: 'CpfEd1kX1kw',
    title: 'Fitzpatrick & laser — the why',
    topic: 'Anatomy + Energy',
    desc: 'A second take on Fitzpatrick from the laser-protocol angle: why darker skin reaches for Nd:YAG.',
  },
];

// Curated YouTube *search* queries — opens a playlist of current top hits
// for topics the exam leans on heavily. Useful when you want to sample
// more videos than the hand-picked list above, especially for the
// infection-control and FL-legal content areas.
export type VideoSearch = { label: string; topic: string; query: string };

export const videoSearches: VideoSearch[] = [
  {
    label: 'Bloodborne pathogens training',
    topic: 'Infection Control',
    query: 'OSHA bloodborne pathogens training electrology',
  },
  {
    label: 'Donning and doffing PPE',
    topic: 'Infection Control',
    query: 'donning and doffing PPE correct order',
  },
  {
    label: 'Informed consent basics',
    topic: 'Clinical / Legal',
    query: 'informed consent four pillars medical',
  },
  {
    label: 'HIPAA for small practices',
    topic: 'Clinical / Legal',
    query: 'HIPAA privacy rule minimum necessary',
  },
  {
    label: 'Selective photothermolysis',
    topic: 'Energy',
    query: 'selective photothermolysis laser hair removal explained',
  },
  {
    label: 'Eye protection & laser safety',
    topic: 'Energy',
    query: 'laser safety eyewear optical density explained',
  },
];
