export type Question = {
  topic: string;
  q: string;
  options: string[];
  correct: number;
  explain: string;
};

export const questions: Question[] = [
  // —— Infection Control ——————————————————————————————————————
  {
    topic: 'Infection Control',
    q: 'Standard autoclave parameters for sterilizing wrapped electrology forceps:',
    options: [
      '121°C (250°F) at 15 psi for 15–30 minutes',
      '100°C for 60 minutes, no pressure',
      '80°C for 15 minutes',
      'Cold immersion in 70% alcohol for 10 minutes',
    ],
    correct: 0,
    explain:
      'Standard steam sterilization is 121°C at 15 psi for 15–30 minutes. Cold chemical sterilization is reserved for heat-sensitive items only.',
  },
  {
    topic: 'Infection Control',
    q: 'How often should an autoclave undergo biological (spore) testing?',
    options: ['Daily', 'Weekly', 'Monthly', 'Annually'],
    correct: 1,
    explain:
      'AEA Infection Prevention Standards require weekly biological monitoring with spore tests to verify sterilization is actually killing the toughest organisms.',
  },
  {
    topic: 'Infection Control',
    q: 'The correct order for reprocessing contaminated reusable instruments is:',
    options: [
      'Sterilization → cleaning → packaging → storage',
      'Cleaning → packaging → sterilization → storage',
      'Disinfection → sterilization → packaging → storage',
      'Packaging → cleaning → sterilization → disinfection',
    ],
    correct: 1,
    explain:
      'Four steps, in order: clean (remove bioburden), package (pouch/wrap), sterilize (autoclave), store (dry, dated). Skip any step and the rest is compromised.',
  },
  {
    topic: 'Infection Control',
    q: 'Which statement best distinguishes cleaning, disinfection, and sterilization?',
    options: [
      'They are interchangeable — any one meets the standard.',
      'Cleaning removes soil; disinfection kills most microbes; sterilization kills all microbes including spores.',
      'Disinfection kills spores; sterilization only kills vegetative bacteria.',
      'Cleaning alone is sufficient for any instrument that touches skin.',
    ],
    correct: 1,
    explain:
      'Cleaning is physical removal of bioburden. Disinfection kills most pathogens but not resistant spores. Sterilization is a validated process that kills everything, spores included.',
  },
  {
    topic: 'Infection Control',
    q: 'Sharps containers should be replaced when:',
    options: [
      'They are completely full',
      'The contents cover the needles',
      'They are approximately three-quarters full',
      'The end of the business day',
    ],
    correct: 2,
    explain:
      'Swap at the ¾-full line. Overfilling increases the risk of a needlestick when sealing and transporting the container.',
  },
  {
    topic: 'Infection Control',
    q: 'Minimum recommended hand-wash duration with soap and water before gloving:',
    options: ['5 seconds', '10 seconds', '20 seconds', '60 seconds'],
    correct: 2,
    explain:
      'CDC hand-hygiene guidance: at least 20 seconds of active lathering. Shorter cycles leave meaningful microbial load on the hands.',
  },
  {
    topic: 'Infection Control',
    q: 'Gloves should be changed:',
    options: [
      'Only when visibly soiled',
      'Between every client and whenever integrity is compromised',
      'Once per working day',
      'Only when handling sharps',
    ],
    correct: 1,
    explain:
      'One client, one pair. Also change mid-service if gloves tear, touch a non-clinical surface, or after any procedure that breaches skin.',
  },
  {
    topic: 'Infection Control',
    q: 'The correct order for removing soiled PPE at the end of a session is:',
    options: [
      'Mask → gown → gloves → goggles',
      'Gloves → goggles → gown → mask',
      'Gown → gloves → mask → goggles',
      'Goggles → mask → gloves → gown',
    ],
    correct: 1,
    explain:
      'Doff in the order from most-contaminated to least: gloves first, then goggles/face shield, then gown, then mask. Hand-hygiene between steps, and again at the end.',
  },
  {
    topic: 'Infection Control',
    q: 'After an accidental needlestick with a used probe, the first step is:',
    options: [
      'Finish the procedure, then wash the site',
      'Encourage the wound to bleed and wash vigorously with soap and water, then report it',
      'Apply a tourniquet above the site',
      'Ignore it if the skin was not broken',
    ],
    correct: 1,
    explain:
      'Immediate action: promote bleeding, wash thoroughly with soap and running water, then report per exposure protocol for source testing and post-exposure prophylaxis decisions.',
  },
  {
    topic: 'Infection Control',
    q: 'Surfaces and equipment that contact intact skin between clients require at minimum:',
    options: [
      'Nothing — wipe down at day-end only',
      'A visible wipe with water',
      'An EPA-registered low- to intermediate-level disinfectant at the labeled contact time',
      'High-level chemical sterilization',
    ],
    correct: 2,
    explain:
      'Surface disinfection between clients uses an EPA-registered product, applied for the full labeled contact time so the surface stays visibly wet for the duration.',
  },
  {
    topic: 'Infection Control',
    q: 'Which instrument-processing outcome is validated weekly by biological indicators?',
    options: [
      'That the autoclave reached the right temperature',
      'That spore-forming organisms are being reliably killed',
      'That the wraps are sealed',
      'That the operator loaded the chamber correctly',
    ],
    correct: 1,
    explain:
      'Chemical indicators confirm exposure; mechanical indicators confirm cycle parameters; biological (spore) indicators confirm the load is actually lethal to the toughest organisms.',
  },
  {
    topic: 'Infection Control',
    q: 'Single-use needles, probes, and tweezers must be:',
    options: [
      'Re-sterilized once and reused on the same client',
      'Used once and discarded in a sharps container; never reprocessed',
      'Soaked in alcohol and stored for next session',
      'Shared between clients if visibly clean',
    ],
    correct: 1,
    explain:
      "Single-use is single-use. The FDA's and OSHA's positions are aligned: one client, one use, then the sharps container.",
  },
  {
    topic: 'Infection Control',
    q: 'If an autoclave spore test returns positive, you should:',
    options: [
      'Ignore it and run the next load',
      'Recall and reprocess items sterilized since the last negative test, and take the autoclave out of service until retesting confirms function',
      'Re-run only the failed cycle',
      'Continue using the autoclave but document the failure',
    ],
    correct: 1,
    explain:
      'A positive BI is a sterilization failure. Quarantine the machine, recall and reprocess any loads since the last negative test, investigate the cause, and re-test before returning to service.',
  },
  {
    topic: 'Infection Control',
    q: 'Instruments should be wrapped or pouched before steam sterilization because:',
    options: [
      'Wrapping speeds the cycle',
      'It protects the instrument from condensate stains',
      'Packaging preserves sterility after the cycle until point of use',
      'Pouches are optional if the autoclave is modern',
    ],
    correct: 2,
    explain:
      'Packaging is what keeps an instrument sterile between the autoclave and the client. An unwrapped item is only sterile at the instant the chamber opens.',
  },
  {
    topic: 'Infection Control',
    q: 'Contaminated linens (e.g., a towel used during a bloody procedure) should be:',
    options: [
      'Shaken out before laundering to remove debris',
      'Handled with gloves, bagged at point of use, laundered in hot water, never sorted at bedside',
      'Thrown in the household trash',
      'Sprayed with air freshener and reused',
    ],
    correct: 1,
    explain:
      'Universal precautions apply to laundry. Bag at point of use, avoid shaking (aerosolises), wash hot, dry fully. Never sort or rinse in the treatment room.',
  },
  {
    topic: 'Infection Control',
    q: "High-level chemical disinfectants (e.g., 2% glutaraldehyde) are appropriate for:",
    options: [
      'All items, as a replacement for steam sterilization',
      'Heat-sensitive, semi-critical items, at the labeled immersion time',
      'Floors and countertops',
      'Rinsing hands between clients',
    ],
    correct: 1,
    explain:
      'High-level disinfectants are for heat-sensitive semi-critical items that contact mucous membranes or non-intact skin — not for critical items (which require sterilization) or environmental surfaces.',
  },

  // —— Clinical / Legal ——————————————————————————————————————
  {
    topic: 'Clinical / Legal',
    q: 'In Florida, an electrologist performing laser / IPL hair removal must:',
    options: [
      'Practice independently with no medical oversight',
      'Work under supervision of an MD or DO with joint written protocols',
      'Hold an active cosmetology license as well',
      'Notify the FDA before each treatment session',
    ],
    correct: 1,
    explain:
      'FL Rule 64B8-56.002 requires laser / IPL services to be supervised by an MD or DO with active license, with jointly written protocols on file with the council.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'Valid informed consent for a laser procedure must include:',
    options: [
      'A list of risks only',
      'A list of expected benefits only',
      'Risks, benefits, alternatives, and the explicit right to refuse',
      'A signed waiver of all liability',
    ],
    correct: 2,
    explain:
      'The four pillars of informed consent: risks, benefits, alternatives, and the explicit right to refuse. Documented in writing, every time.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'A client presents with active herpes simplex on the planned treatment area. You should:',
    options: [
      'Proceed with extra cooling and a lower fluence',
      'Reschedule and consult the supervising physician about antiviral prophylaxis',
      'Treat after the client signs a hold-harmless waiver',
      'Spot-treat carefully around the lesions',
    ],
    correct: 1,
    explain:
      'Active infection is a contraindication. Reschedule; the supervising physician may prescribe antiviral prophylaxis before future treatments.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'A client who takes isotretinoin (Accutane) finished therapy three months ago and requests laser hair removal. The standard approach is:',
    options: [
      'Proceed at normal settings',
      'Proceed at reduced fluence with extra cooling',
      'Defer treatment — most protocols require a six-month washout before laser / energy-based procedures',
      'Defer indefinitely — isotretinoin is an absolute lifetime contraindication',
    ],
    correct: 2,
    explain:
      'Mainstream protocols still specify a six-month washout after isotretinoin before energy-based procedures because of delayed-healing and scarring concerns. A shorter interval is off-label and done only with the supervising physician\'s sign-off.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'Before treating a pregnant client with laser hair removal you should:',
    options: [
      'Proceed — there is no evidence laser harms a fetus',
      'Decline; pregnancy is a standard relative contraindication in most protocols, and most clinics defer until post-partum',
      'Treat only the lower legs',
      'Require a signed waiver and continue',
    ],
    correct: 1,
    explain:
      'Most clinic protocols defer elective laser during pregnancy — not because of proven fetal risk, but because hormonal changes alter hair growth unpredictably and the legal/medical standard leans conservative.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'For a minor seeking laser hair removal, consent must be:',
    options: [
      'Provided by the minor alone if they are mature enough',
      'Provided by the parent or legal guardian, with the minor\'s assent documented',
      'Waived if the treatment area is small',
      'Verbal only',
    ],
    correct: 1,
    explain:
      'Minors cannot provide legally sufficient consent. A parent or legal guardian signs informed consent; the minor\'s assent is documented alongside, not in place of.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'Under HIPAA, "minimum necessary" means:',
    options: [
      'You can share client PHI with anyone who asks',
      'You disclose only the least information needed to complete a permitted task',
      'You never share PHI with other providers',
      'You must always share complete charts',
    ],
    correct: 1,
    explain:
      'The minimum-necessary rule: use or disclose only the PHI needed to accomplish the task. Full charts are shared only when the full chart is genuinely required.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'Client records for laser / IPL procedures should be retained for:',
    options: [
      'Six months after the last visit',
      'At least five years (and longer per employer / FL medical-record rules and any minor-client rules)',
      'No set minimum — retention is at the practitioner\'s discretion',
      'Until the next software upgrade',
    ],
    correct: 1,
    explain:
      'Florida medical-record retention is typically five years or longer depending on the category and minor-client rules. Practices often keep seven years to stay safely above statute and malpractice windows.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'A chart should include, at minimum:',
    options: [
      'Client name and date only',
      'Only the price paid and the procedure name',
      'Skin type, medications, consent, device + settings, fluence, pulse width, spot size, cooling, skin response, and post-care instructions given',
      'The brand name of the device and nothing else',
    ],
    correct: 2,
    explain:
      'If it isn\'t written, it didn\'t happen. Capture everything a subsequent provider or auditor would need to reconstruct the session.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'Photographing a client pre- and post-treatment requires:',
    options: [
      'No special consent',
      'Separate written photographic consent, stored with the chart',
      'Only verbal consent',
      'A public-facing social-media post to validate the result',
    ],
    correct: 1,
    explain:
      'Photographic consent is its own document: scope (clinical record vs. marketing), duration, right to withdraw. Never reuse clinical photos on social media without a separate publishing consent.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'Before the first laser session, a new client should receive:',
    options: [
      'No pre-treatment counselling — it creates anxiety',
      'Written expectations, risks, alternatives, a photo-protection instruction, and a patch test documented in the chart',
      'A price list only',
      'An indemnity waiver instead of informed consent',
    ],
    correct: 1,
    explain:
      'A proper intake: written consent, realistic expectations, sun-protection plan, and a patch test. The patch result goes in the chart — it is legally and clinically part of the session.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'A client reports ibuprofen use for cramps on the day of treatment. Appropriate action:',
    options: [
      'Cancel — NSAIDs are an absolute contraindication',
      'Proceed; occasional NSAID use is not a contraindication, document it and continue',
      'Treat only one side of the body',
      'Switch to a different wavelength',
    ],
    correct: 1,
    explain:
      'Occasional NSAID use is not a contraindication. Record it. Contraindicating meds are the photosensitisers (tetracyclines, isotretinoin, some antibiotics, some herbals) at active levels.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'If a client suffers a second-degree burn during treatment, the first professional obligations are:',
    options: [
      'Offer a refund and move on',
      'Stop treatment, cool the site per protocol, notify the supervising physician, document completely, and arrange appropriate follow-up',
      'Delete chart notes to protect the clinic',
      'Apply thick ointment and keep going',
    ],
    correct: 1,
    explain:
      'Adverse event response: stop, stabilize, escalate, document. Altering or destroying records turns an incident into a licensure issue.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'FL Statute / Rule governing electrology primarily sits under:',
    options: [
      'Chapter 477 (Cosmetology)',
      'Chapter 478 (Electrolysis)',
      'Chapter 501 (Consumer Protection)',
      'Chapter 464 (Nursing)',
    ],
    correct: 1,
    explain:
      'Florida Statute Chapter 478 is the Electrolysis chapter. It defines scope, licensure, and discipline for electrologists in the state.',
  },
  {
    topic: 'Clinical / Legal',
    q: "Under Florida's laser / IPL rules, the supervising physician's role includes:",
    options: [
      'Being physically present for every treatment',
      'Signing joint written protocols and being available for consultation, not necessarily on-site for each client',
      'Reviewing every chart before treatment starts',
      'Providing treatments personally',
    ],
    correct: 1,
    explain:
      'FL supervision standard is protocols on file with the Electrolysis Council plus reasonable availability — not physical presence at every session. Always verify the current rule language before relying on this.',
  },
  {
    topic: 'Clinical / Legal',
    q: 'Advertising results that are not representative of a typical outcome is:',
    options: [
      'Allowed if the photos are real',
      'A potential disciplinary issue under FL deceptive-advertising provisions unless clearly disclosed',
      'Required for competitive marketing',
      'Permitted only if the client tipped',
    ],
    correct: 1,
    explain:
      'Non-typical results count as deceptive without clear disclosure. "Individual results vary" is the minimum — explicit caveats and representative before/afters are the safer standard.',
  },

  // —— Anatomy ——————————————————————————————————————————————
  {
    topic: 'Anatomy',
    q: 'The hair growth phase most receptive to laser hair removal is:',
    options: ['Anagen', 'Catagen', 'Telogen', 'Exogen'],
    correct: 0,
    explain:
      "Anagen — the active growth phase — is when melanin is most concentrated in the hair shaft, optimizing the laser's ability to absorb energy and damage the follicle.",
  },
  {
    topic: 'Anatomy',
    q: 'Fitzpatrick skin types V–VI carry the highest risk for which complication?',
    options: [
      'No laser-related risks at all',
      'Post-inflammatory hyperpigmentation and burns',
      'Allergic reactions to topical anesthetic',
      'Permanent hair regrowth',
    ],
    correct: 1,
    explain:
      'Higher epidermal melanin competes with the target chromophore — increasing risk of burns and PIH. Nd:YAG at 1064 nm is the preferred wavelength for darker skin.',
  },
  {
    topic: 'Anatomy',
    q: 'The dermal papilla sits at the:',
    options: [
      'Top of the follicle, just below the opening',
      'Base of the bulb, receiving blood supply that feeds the growing hair',
      'Surface of the epidermis',
      'Mid-shaft, above the sebaceous gland',
    ],
    correct: 1,
    explain:
      'The papilla is at the base of the bulb. It is the follicle\'s vascular supply — destroying it disrupts future growth, which is the anatomical goal of laser hair removal.',
  },
  {
    topic: 'Anatomy',
    q: 'Which layer of the skin contains the hair bulb and most blood supply to the follicle?',
    options: ['Stratum corneum', 'Epidermis', 'Dermis', 'Subcutaneous fat (hypodermis)'],
    correct: 2,
    explain:
      'Hair bulbs sit in the dermis, where the capillary network of the dermal papilla nourishes the growing hair. Some deeper follicles extend into the upper hypodermis.',
  },
  {
    topic: 'Anatomy',
    q: 'Vellus, terminal, and lanugo hair differ primarily in:',
    options: [
      'Color only',
      'Length, pigmentation, thickness, and the type of follicle they grow from',
      'Growth phase length only',
      'Chemical composition of the keratin',
    ],
    correct: 1,
    explain:
      'Lanugo: fine, unpigmented, newborn. Vellus: short, fine, light-pigmented. Terminal: coarse, pigmented, androgen-responsive. Laser targets terminal hair — vellus is poor absorption.',
  },
  {
    topic: 'Anatomy',
    q: 'The bulge area of the follicle is important because it contains:',
    options: [
      'The main melanin reservoir',
      'Follicular stem cells responsible for regenerating the lower follicle',
      'The apocrine duct opening',
      'Langerhans cells',
    ],
    correct: 1,
    explain:
      'The bulge, sitting near the arrector pili insertion, houses follicular stem cells. Reaching and damaging this zone is key to long-term reduction — not only the bulb.',
  },
  {
    topic: 'Anatomy',
    q: 'The epidermis is primarily made of which cell type?',
    options: ['Fibroblasts', 'Keratinocytes', 'Adipocytes', 'Chondrocytes'],
    correct: 1,
    explain:
      'Keratinocytes make up ~90% of epidermal cells. Melanocytes, Langerhans cells, and Merkel cells fill in the specialty roles (pigment, immunity, touch).',
  },
  {
    topic: 'Anatomy',
    q: 'Fitzpatrick Type III classically describes skin that:',
    options: [
      'Always burns, never tans',
      'Rarely burns, tans readily',
      'Sometimes burns mildly and tans gradually',
      'Never burns and is deeply pigmented',
    ],
    correct: 2,
    explain:
      'Type III — a common "average Western European" response: occasional mild burning, gradual tanning. Types IV–VI rarely burn; types I–II almost always do.',
  },
  {
    topic: 'Anatomy',
    q: 'Sebaceous glands open into the:',
    options: [
      'Sweat duct',
      'Hair follicle canal',
      'Surface of the stratum corneum directly',
      'Dermal papilla',
    ],
    correct: 1,
    explain:
      'Sebaceous glands drain into the upper portion of the hair follicle — which is why follicular conditions (acne, folliculitis) and hair-removal treatments overlap anatomically.',
  },

  // —— Energy ——————————————————————————————————————————————
  {
    topic: 'Energy',
    q: 'The Nd:YAG laser operates at a wavelength of:',
    options: ['532 nm', '755 nm', '810 nm', '1064 nm'],
    correct: 3,
    explain:
      'Nd:YAG = 1064 nm. The longer wavelength penetrates deeper and is the safer choice for Fitzpatrick types IV–VI because it bypasses more epidermal melanin.',
  },
  {
    topic: 'Energy',
    q: 'The primary chromophore targeted in laser hair removal is:',
    options: ['Hemoglobin', 'Water', 'Melanin', 'Collagen'],
    correct: 2,
    explain:
      'Selective photothermolysis: the laser wavelength is chosen because it is preferentially absorbed by melanin in the hair shaft and follicle.',
  },
  {
    topic: 'Energy',
    q: 'Thermal Relaxation Time (TRT) refers to:',
    options: [
      'How long the skin needs to cool between treatment sessions',
      'The time for the target chromophore to lose 50% of its absorbed heat',
      'The total length of one treatment session',
      'The duration of the laser pulse itself',
    ],
    correct: 1,
    explain:
      'TRT = the time for the target to dissipate 50% of absorbed thermal energy. Pulse durations shorter than TRT confine heat to the target without damaging surrounding tissue.',
  },
  {
    topic: 'Energy',
    q: 'Alexandrite lasers operate at approximately:',
    options: ['532 nm', '755 nm', '810 nm', '1064 nm'],
    correct: 1,
    explain:
      'Alexandrite = 755 nm. Strong melanin absorption — fast on Fitzpatrick I–III with fine-to-medium hair, but risky on darker skin because the epidermis absorbs heavily too.',
  },
  {
    topic: 'Energy',
    q: 'Diode lasers commonly used in hair removal operate at:',
    options: ['532 nm', '595 nm', '810 nm', '1064 nm'],
    correct: 2,
    explain:
      'Diode = ~810 nm (some platforms 800–830 nm). Middle-ground penetration and melanin affinity — versatile across many skin types.',
  },
  {
    topic: 'Energy',
    q: 'IPL (intense pulsed light) differs from a true laser in that it:',
    options: [
      'Emits coherent monochromatic light',
      'Emits a broad spectrum of non-coherent light, filtered to a range',
      'Uses ultrasound, not light',
      'Only operates above 1500 nm',
    ],
    correct: 1,
    explain:
      'IPL is a flashlamp with cutoff filters — broadband, non-coherent. That is why skin-type selection and filter choice matter enormously; you are choosing a spectrum, not a precise wavelength.',
  },
  {
    topic: 'Energy',
    q: 'Fluence is measured in:',
    options: ['Watts', 'Joules', 'Joules per cm²', 'Milliseconds'],
    correct: 2,
    explain:
      'Fluence = energy density = J/cm². The single number that most directly governs whether you damage the follicle — and the surrounding skin.',
  },
  {
    topic: 'Energy',
    q: 'Increasing spot size, holding fluence constant, typically:',
    options: [
      'Decreases effective depth of penetration',
      'Increases effective depth of penetration due to less scatter',
      'Has no effect on penetration',
      'Causes the wavelength to shift',
    ],
    correct: 1,
    explain:
      'Larger spot = less photon scatter at the edges = more of the beam reaches depth. This is why big spots feel "stronger" at identical fluence.',
  },
  {
    topic: 'Energy',
    q: 'Epidermal cooling during laser hair removal is meant to:',
    options: [
      'Enhance the patient\'s comfort only',
      'Protect the epidermis from collateral thermal damage so higher fluences can be delivered safely to the follicle',
      'Shorten the pulse duration',
      'Reduce the reflection of light from the skin',
    ],
    correct: 1,
    explain:
      'Cooling buys thermal headroom at the epidermis so you can raise fluence into the follicle without burning the surface. Contact, cryogen spray, and forced air are the main modalities.',
  },
  {
    topic: 'Energy',
    q: 'For a thick, coarse terminal hair, the appropriate pulse duration sits:',
    options: [
      'Well below the follicle\'s TRT',
      'Matched to the follicle\'s TRT — longer pulses for thicker hair, shorter for finer hair',
      'At the shortest value the device offers regardless of hair type',
      'Independent of hair thickness',
    ],
    correct: 1,
    explain:
      'Pulse duration is matched to the target\'s TRT: thicker hair → longer TRT → longer pulse. Too short and the energy shocks the epidermis rather than cooking the follicle.',
  },
  {
    topic: 'Energy',
    q: 'Laser eye-protection goggles must be chosen based on:',
    options: [
      'The lens colour the operator prefers',
      'The specific wavelength being used and the optical density (OD) rating on the lens',
      'A generic "laser" label',
      'Only the operator\'s prescription',
    ],
    correct: 1,
    explain:
      'Eyewear is wavelength- and OD-specific. Goggles rated for a 755 nm alexandrite provide no guarantee against a 1064 nm Nd:YAG — confirm both the wavelength range and OD before every session.',
  },
];
