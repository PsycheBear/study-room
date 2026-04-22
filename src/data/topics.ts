export type TopicKey = 'Anatomy' | 'Infection Control' | 'Clinical / Legal' | 'Energy';

export type Topic = {
  id: string;
  key: TopicKey;
  title: string;
  tag: string;
  points: string[];
};

export const topics: Topic[] = [
  {
    id: '01',
    key: 'Anatomy',
    title: 'Anatomy & Physiology of Skin and Hair',
    tag: 'Foundations',
    points: [
      'Follicle structure, the hair growth cycle (anagen → catagen → telogen → exogen), and skin layers.',
      'The Fitzpatrick scale: types I–VI and how melanin behaves under different laser wavelengths.',
      'Common skin conditions and which are contraindications for treatment.',
    ],
  },
  {
    id: '02',
    key: 'Infection Control',
    title: 'Infection Control & Safety Precautions',
    tag: 'Heavy lifter',
    points: [
      'Sterilization protocols — autoclave cycles (121°C / 15 psi / 15–30 min), spore tests weekly, biohazard disposal.',
      'PPE selection by procedure, OSHA Bloodborne Pathogen Standard, universal precautions.',
      'Disinfectant contact times, sharps handling, single-use vs. reusable instruments.',
    ],
  },
  {
    id: '03',
    key: 'Clinical / Legal',
    title: 'Clinical Observations + Professional / Ethical / Legal',
    tag: 'Florida-specific',
    points: [
      'Florida statutes — scope of practice, supervising-physician requirements, what you can and cannot delegate.',
      'Informed consent: risks, benefits, alternatives, right to refuse. Documentation and HIPAA basics.',
      'Case-study reasoning: client presents with X, you do Y, you refer for Z.',
    ],
  },
  {
    id: '04',
    key: 'Energy',
    title: 'Basic Principles of Energy & Light-Based Devices',
    tag: 'Physics',
    points: [
      'Wavelength → chromophore matching, fluence, pulse duration, spot size, thermal relaxation time.',
      'IPL vs diode (810 nm) vs alexandrite (755 nm) vs Nd:YAG (1064 nm).',
      'Settings adjustments by skin type — the practical bridge between physics and the case-study questions.',
    ],
  },
];
