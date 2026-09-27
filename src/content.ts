import type { Localized } from './i18n';

export const L = (en: string, fr: string): Localized => ({ en, fr });

export type Faculty = {
  slug: string;
  name: Localized;
  summary: Localized;
  departments: Localized[];
  programs: string[];
  research: Localized[];
};

export type Program = {
  slug: string;
  name: Localized;
  degree: Localized;
  faculty: string;
  duration: Localized;
  mode: Localized;
  overview: Localized;
  entry: Localized[];
  curriculum: Localized[];
  careers: Localized[];
  skills: Localized[];
  fees: Localized;
};

export const faculties: Faculty[] = [
  {
    slug: 'engineering',
    name: L('Engineering', 'Ingénierie'),
    summary: L('Design resilient systems, intelligent infrastructure and technologies that improve life at scale.', 'Concevez des systèmes résilients, des infrastructures intelligentes et des technologies qui améliorent la vie à grande échelle.'),
    departments: [L('Mechanical & Industrial Engineering','Génie mécanique et industriel'), L('Civil & Environmental Engineering','Génie civil et environnemental'), L('Electrical & Energy Systems','Systèmes électriques et énergétiques')],
    programs: ['mechanical-engineering','civil-engineering','renewable-energy-engineering'],
    research: [L('Smart infrastructure','Infrastructures intelligentes'), L('Clean energy systems','Systèmes d’énergie propre'), L('Advanced manufacturing','Fabrication avancée')]
  },
  {
    slug: 'business',
    name: L('Business', 'Gestion'),
    summary: L('Build the judgment, analytical fluency and leadership range required in fast-changing organizations.', 'Développez le jugement, la maîtrise analytique et le leadership nécessaires dans des organisations en évolution rapide.'),
    departments: [L('Strategy & Entrepreneurship','Stratégie et entrepreneuriat'), L('Finance & Accounting','Finance et comptabilité'), L('Marketing & Operations','Marketing et opérations')],
    programs: ['business-administration','economics'],
    research: [L('Inclusive enterprise','Entreprise inclusive'), L('Digital markets','Marchés numériques'), L('Sustainable finance','Finance durable')]
  },
  {
    slug: 'science',
    name: L('Science', 'Sciences'),
    summary: L('Explore the principles shaping matter, life and the planet through rigorous inquiry and applied discovery.', 'Explorez les principes qui façonnent la matière, la vie et la planète par une recherche rigoureuse et appliquée.'),
    departments: [L('Biological Sciences','Sciences biologiques'), L('Chemistry','Chimie'), L('Mathematics & Physics','Mathématiques et physique')],
    programs: ['biotechnology','data-science'],
    research: [L('Biodiversity','Biodiversité'), L('Materials science','Science des matériaux'), L('Computational modelling','Modélisation computationnelle')]
  },
  {
    slug: 'arts',
    name: L('Arts & Design', 'Arts et design'),
    summary: L('Create, interpret and communicate ideas through culture, design, media and the built environment.', 'Créez, interprétez et communiquez des idées à travers la culture, le design, les médias et l’environnement bâti.'),
    departments: [L('Architecture','Architecture'), L('Communication & Media','Communication et médias'), L('Visual Culture & Design','Culture visuelle et design')],
    programs: ['architecture','digital-media'],
    research: [L('Human-centred design','Design centré sur l’humain'), L('Urban futures','Futurs urbains'), L('Creative technologies','Technologies créatives')]
  },
  {
    slug: 'social-sciences',
    name: L('Social Sciences', 'Sciences sociales'),
    summary: L('Understand institutions, communities and public choices using evidence, fieldwork and interdisciplinary analysis.', 'Comprenez les institutions, les communautés et les choix publics grâce aux données, au terrain et à l’analyse interdisciplinaire.'),
    departments: [L('Economics & Policy','Économie et politiques publiques'), L('Sociology & Development','Sociologie et développement'), L('International Relations','Relations internationales')],
    programs: ['economics','international-relations'],
    research: [L('Cities and mobility','Villes et mobilité'), L('Governance','Gouvernance'), L('Development economics','Économie du développement')]
  },
  {
    slug: 'medicine',
    name: L('Medicine & Health', 'Médecine et santé'),
    summary: L('Advance health through clinical learning, public-health practice and biomedical investigation.', 'Faites progresser la santé grâce à l’apprentissage clinique, à la santé publique et à la recherche biomédicale.'),
    departments: [L('Clinical Sciences','Sciences cliniques'), L('Public Health','Santé publique'), L('Biomedical Sciences','Sciences biomédicales')],
    programs: ['public-health','biotechnology'],
    research: [L('Population health','Santé des populations'), L('Diagnostics','Diagnostic'), L('Health systems','Systèmes de santé')]
  },
  {
    slug: 'technology',
    name: L('Technology & Computing', 'Technologie et informatique'),
    summary: L('Develop software, data and intelligent systems with technical depth and responsible design.', 'Développez des logiciels, des données et des systèmes intelligents avec une solide maîtrise technique et un design responsable.'),
    departments: [L('Computer Science','Informatique'), L('Data & AI','Données et IA'), L('Cyber Systems','Systèmes cyber')],
    programs: ['computer-science','data-science','cybersecurity'],
    research: [L('Artificial intelligence','Intelligence artificielle'), L('Human-computer interaction','Interaction humain-machine'), L('Trusted computing','Informatique de confiance')]
  }
];

export const programs: Program[] = [
  {
    slug: 'computer-science', name: L('Computer Science','Informatique'), degree: L('BSc','Licence'), faculty: 'technology', duration: L('4 years','4 ans'), mode: L('Full-time · On campus','Temps plein · Sur campus'),
    overview: L('A rigorous computing degree spanning software engineering, algorithms, artificial intelligence and systems design.', 'Une formation rigoureuse couvrant le génie logiciel, les algorithmes, l’intelligence artificielle et la conception de systèmes.'),
    entry: [L('Strong secondary-school mathematics','Solides résultats en mathématiques au secondaire'), L('Evidence of English or French proficiency','Preuve de maîtrise de l’anglais ou du français'), L('Academic transcript and personal statement','Relevé de notes et lettre de motivation')],
    curriculum: [L('Programming & data structures','Programmation et structures de données'), L('Algorithms & complexity','Algorithmes et complexité'), L('AI & machine learning','IA et apprentissage automatique'), L('Distributed systems','Systèmes distribués'), L('Capstone product studio','Projet de fin d’études')],
    careers: [L('Software engineer','Ingénieur logiciel'), L('Machine-learning engineer','Ingénieur en apprentissage automatique'), L('Product engineer','Ingénieur produit')],
    skills: [L('Programming','Programmation'), L('Systems thinking','Pensée systémique'), L('Data analysis','Analyse de données')], fees: L('Indicative tuition: US$8,900/year. Scholarships available.','Frais indicatifs : 8 900 $US/an. Bourses disponibles.')
  },
  {
    slug: 'data-science', name: L('Data Science','Science des données'), degree: L('MSc','Master'), faculty: 'technology', duration: L('2 years','2 ans'), mode: L('Full-time · Hybrid','Temps plein · Hybride'),
    overview: L('Turn complex data into reliable decisions through statistics, machine learning and responsible analytics.', 'Transformez des données complexes en décisions fiables grâce aux statistiques, à l’apprentissage automatique et à l’analytique responsable.'),
    entry: [L('Bachelor’s degree in a quantitative field','Licence dans un domaine quantitatif'), L('Introductory programming experience','Expérience de base en programmation'), L('Statement of academic purpose','Projet d’études')],
    curriculum: [L('Statistical inference','Inférence statistique'), L('Machine learning','Apprentissage automatique'), L('Data engineering','Ingénierie des données'), L('Responsible AI','IA responsable'), L('Industry analytics lab','Laboratoire d’analytique appliquée')],
    careers: [L('Data scientist','Data scientist'), L('Analytics lead','Responsable analytique'), L('AI product specialist','Spécialiste produit IA')],
    skills: [L('Modelling','Modélisation'), L('Visualization','Visualisation'), L('Experiment design','Conception d’expériences')], fees: L('Indicative tuition: US$10,200/year.','Frais indicatifs : 10 200 $US/an.')
  },
  {
    slug: 'mechanical-engineering', name: L('Mechanical Engineering','Génie mécanique'), degree: L('BEng','Licence en ingénierie'), faculty: 'engineering', duration: L('4 years','4 ans'), mode: L('Full-time · On campus','Temps plein · Sur campus'),
    overview: L('Design machines, products and energy systems through mechanics, materials, manufacturing and simulation.', 'Concevez des machines, produits et systèmes énergétiques grâce à la mécanique, aux matériaux, à la fabrication et à la simulation.'),
    entry: [L('Advanced mathematics and physics','Mathématiques avancées et physique'), L('Secondary-school diploma or equivalent','Diplôme de fin d’études secondaires ou équivalent')],
    curriculum: [L('Engineering mechanics','Mécanique de l’ingénieur'), L('Thermofluids','Thermofluides'), L('Materials','Matériaux'), L('CAD & manufacturing','CAO et fabrication'), L('Design project','Projet de conception')],
    careers: [L('Mechanical engineer','Ingénieur mécanique'), L('Manufacturing engineer','Ingénieur de production'), L('Energy systems engineer','Ingénieur systèmes énergétiques')],
    skills: [L('CAD','CAO'), L('Simulation','Simulation'), L('Prototyping','Prototypage')], fees: L('Indicative tuition: US$9,400/year.','Frais indicatifs : 9 400 $US/an.')
  },
  {
    slug: 'civil-engineering', name: L('Civil & Environmental Engineering','Génie civil et environnemental'), degree: L('BEng','Licence en ingénierie'), faculty: 'engineering', duration: L('4 years','4 ans'), mode: L('Full-time · On campus','Temps plein · Sur campus'),
    overview: L('Plan and build resilient infrastructure for rapidly changing cities and environments.', 'Planifiez et construisez des infrastructures résilientes pour des villes et environnements en mutation.'),
    entry: [L('Mathematics and physics','Mathématiques et physique'), L('Secondary-school diploma or equivalent','Diplôme du secondaire ou équivalent')],
    curriculum: [L('Structures','Structures'), L('Geotechnics','Géotechnique'), L('Water systems','Systèmes hydrauliques'), L('Transportation','Transport'), L('Sustainable infrastructure studio','Atelier d’infrastructures durables')],
    careers: [L('Civil engineer','Ingénieur civil'), L('Infrastructure planner','Planificateur d’infrastructures'), L('Environmental consultant','Consultant environnemental')],
    skills: [L('Structural analysis','Analyse structurelle'), L('Project planning','Planification de projet'), L('Field methods','Méthodes de terrain')], fees: L('Indicative tuition: US$9,400/year.','Frais indicatifs : 9 400 $US/an.')
  },
  {
    slug: 'renewable-energy-engineering', name: L('Renewable Energy Engineering','Ingénierie des énergies renouvelables'), degree: L('MEng','Master en ingénierie'), faculty: 'engineering', duration: L('2 years','2 ans'), mode: L('Full-time · Hybrid','Temps plein · Hybride'),
    overview: L('Engineer practical low-carbon energy systems for buildings, grids and industry.', 'Concevez des systèmes énergétiques bas carbone pour les bâtiments, les réseaux et l’industrie.'),
    entry: [L('Engineering or physical-science degree','Diplôme en ingénierie ou sciences physiques'), L('Quantitative methods background','Bases en méthodes quantitatives')],
    curriculum: [L('Solar systems','Systèmes solaires'), L('Storage','Stockage'), L('Smart grids','Réseaux intelligents'), L('Energy economics','Économie de l’énergie'), L('Applied energy studio','Atelier énergétique appliqué')],
    careers: [L('Energy engineer','Ingénieur énergie'), L('Grid analyst','Analyste réseau'), L('Sustainability consultant','Consultant en durabilité')],
    skills: [L('Energy modelling','Modélisation énergétique'), L('Grid design','Conception de réseau'), L('Lifecycle analysis','Analyse du cycle de vie')], fees: L('Indicative tuition: US$10,600/year.','Frais indicatifs : 10 600 $US/an.')
  },
  {
    slug: 'business-administration', name: L('Business Administration','Administration des affaires'), degree: L('BBA','Licence en gestion'), faculty: 'business', duration: L('4 years','4 ans'), mode: L('Full-time · On campus','Temps plein · Sur campus'),
    overview: L('Learn to lead teams, interpret markets and build durable organizations across sectors.', 'Apprenez à diriger des équipes, comprendre les marchés et bâtir des organisations durables.'),
    entry: [L('Secondary-school diploma','Diplôme de fin d’études secondaires'), L('Personal statement','Lettre de motivation')],
    curriculum: [L('Accounting','Comptabilité'), L('Marketing','Marketing'), L('Operations','Opérations'), L('Strategy','Stratégie'), L('Entrepreneurship lab','Laboratoire d’entrepreneuriat')],
    careers: [L('Business analyst','Analyste d’affaires'), L('Operations manager','Responsable des opérations'), L('Founder','Entrepreneur')],
    skills: [L('Leadership','Leadership'), L('Financial literacy','Culture financière'), L('Decision making','Prise de décision')], fees: L('Indicative tuition: US$8,600/year.','Frais indicatifs : 8 600 $US/an.')
  },
  {
    slug: 'economics', name: L('Economics','Économie'), degree: L('BA','Licence'), faculty: 'social-sciences', duration: L('4 years','4 ans'), mode: L('Full-time · On campus','Temps plein · Sur campus'),
    overview: L('Study how resources, incentives and institutions shape prosperity, inequality and public choices.', 'Étudiez comment les ressources, les incitations et les institutions façonnent la prospérité, les inégalités et les choix publics.'),
    entry: [L('Strong mathematics preparation','Bonne préparation en mathématiques'), L('Secondary-school diploma','Diplôme de fin d’études secondaires')],
    curriculum: [L('Microeconomics','Microéconomie'), L('Macroeconomics','Macroéconomie'), L('Econometrics','Économétrie'), L('Development economics','Économie du développement'), L('Policy lab','Laboratoire de politiques publiques')],
    careers: [L('Economist','Économiste'), L('Policy analyst','Analyste de politiques'), L('Market researcher','Analyste de marché')],
    skills: [L('Econometrics','Économétrie'), L('Policy analysis','Analyse de politiques'), L('Forecasting','Prévision')], fees: L('Indicative tuition: US$8,300/year.','Frais indicatifs : 8 300 $US/an.')
  },
  {
    slug: 'architecture', name: L('Architecture','Architecture'), degree: L('BArch','Licence en architecture'), faculty: 'arts', duration: L('5 years','5 ans'), mode: L('Studio · On campus','Atelier · Sur campus'),
    overview: L('Design places that combine environmental performance, cultural intelligence and human experience.', 'Concevez des lieux qui allient performance environnementale, intelligence culturelle et expérience humaine.'),
    entry: [L('Portfolio','Portfolio'), L('Secondary-school diploma','Diplôme de fin d’études secondaires'), L('Design statement','Note d’intention')],
    curriculum: [L('Design studios','Ateliers de conception'), L('Structures','Structures'), L('Urbanism','Urbanisme'), L('Building technology','Technologie du bâtiment'), L('Professional practice','Pratique professionnelle')],
    careers: [L('Architect','Architecte'), L('Urban designer','Urbaniste'), L('Design strategist','Stratège design')],
    skills: [L('Spatial design','Conception spatiale'), L('Model making','Maquettes'), L('Environmental analysis','Analyse environnementale')], fees: L('Indicative tuition: US$9,800/year.','Frais indicatifs : 9 800 $US/an.')
  },
  {
    slug: 'public-health', name: L('Public Health','Santé publique'), degree: L('MPH','Master en santé publique'), faculty: 'medicine', duration: L('2 years','2 ans'), mode: L('Full-time · Hybrid','Temps plein · Hybride'),
    overview: L('Strengthen population health through epidemiology, prevention, policy and health-systems practice.', 'Renforcez la santé des populations par l’épidémiologie, la prévention, les politiques et les systèmes de santé.'),
    entry: [L('Bachelor’s degree','Licence'), L('Statement of public-health interest','Lettre exposant votre intérêt pour la santé publique')],
    curriculum: [L('Epidemiology','Épidémiologie'), L('Biostatistics','Biostatistiques'), L('Health policy','Politiques de santé'), L('Program evaluation','Évaluation de programmes'), L('Field practicum','Stage de terrain')],
    careers: [L('Public-health analyst','Analyste en santé publique'), L('Program manager','Responsable de programme'), L('Epidemiology associate','Chargé d’épidémiologie')],
    skills: [L('Epidemiology','Épidémiologie'), L('Program design','Conception de programmes'), L('Health communication','Communication en santé')], fees: L('Indicative tuition: US$9,600/year.','Frais indicatifs : 9 600 $US/an.')
  },
  {
    slug: 'international-relations', name: L('International Relations','Relations internationales'), degree: L('BA','Licence'), faculty: 'social-sciences', duration: L('4 years','4 ans'), mode: L('Full-time · On campus','Temps plein · Sur campus'),
    overview: L('Analyze diplomacy, political economy and global cooperation across regions and institutions.', 'Analysez la diplomatie, l’économie politique et la coopération mondiale entre régions et institutions.'),
    entry: [L('Secondary-school diploma','Diplôme du secondaire'), L('Evidence of strong written communication','Bon niveau de communication écrite')],
    curriculum: [L('Global politics','Politique mondiale'), L('International law','Droit international'), L('Political economy','Économie politique'), L('Diplomacy lab','Laboratoire de diplomatie'), L('Regional studies','Études régionales')],
    careers: [L('Policy officer','Chargé de politiques'), L('International program coordinator','Coordinateur de programme international'), L('Research analyst','Analyste de recherche')],
    skills: [L('Negotiation','Négociation'), L('Policy writing','Rédaction de politiques'), L('Cross-cultural analysis','Analyse interculturelle')], fees: L('Indicative tuition: US$8,300/year.','Frais indicatifs : 8 300 $US/an.')
  },
  {
    slug: 'cybersecurity', name: L('Cybersecurity','Cybersécurité'), degree: L('MSc','Master'), faculty: 'technology', duration: L('2 years','2 ans'), mode: L('Full-time · Hybrid','Temps plein · Hybride'),
    overview: L('Secure modern digital infrastructure through applied cryptography, threat analysis and trusted systems engineering.', 'Sécurisez les infrastructures numériques grâce à la cryptographie appliquée, l’analyse des menaces et l’ingénierie de systèmes fiables.'),
    entry: [L('Computing or engineering degree','Diplôme en informatique ou ingénierie'), L('Programming experience','Expérience en programmation')],
    curriculum: [L('Applied cryptography','Cryptographie appliquée'), L('Network defense','Défense réseau'), L('Security operations','Opérations de sécurité'), L('Cloud security','Sécurité cloud'), L('Incident-response lab','Laboratoire de réponse aux incidents')],
    careers: [L('Security engineer','Ingénieur sécurité'), L('SOC analyst','Analyste SOC'), L('Risk specialist','Spécialiste des risques')],
    skills: [L('Threat modelling','Modélisation des menaces'), L('Forensics','Forensique'), L('Secure design','Conception sécurisée')], fees: L('Indicative tuition: US$10,200/year.','Frais indicatifs : 10 200 $US/an.')
  },
  {
    slug: 'biotechnology', name: L('Biotechnology','Biotechnologie'), degree: L('BSc','Licence'), faculty: 'science', duration: L('4 years','4 ans'), mode: L('Full-time · On campus','Temps plein · Sur campus'),
    overview: L('Combine molecular biology, bioprocessing and data to address challenges in health, food and environment.', 'Associez biologie moléculaire, bioprocédés et données pour relever des défis en santé, alimentation et environnement.'),
    entry: [L('Biology and chemistry preparation','Bases en biologie et chimie'), L('Secondary-school diploma','Diplôme du secondaire')],
    curriculum: [L('Cell biology','Biologie cellulaire'), L('Genetics','Génétique'), L('Bioprocess engineering','Ingénierie des bioprocédés'), L('Bioinformatics','Bioinformatique'), L('Research thesis','Mémoire de recherche')],
    careers: [L('Biotechnology associate','Chargé de biotechnologie'), L('Laboratory specialist','Spécialiste de laboratoire'), L('Bioinformatics analyst','Analyste bioinformatique')],
    skills: [L('Laboratory methods','Méthodes de laboratoire'), L('Genomics','Génomique'), L('Experimental design','Conception expérimentale')], fees: L('Indicative tuition: US$9,100/year.','Frais indicatifs : 9 100 $US/an.')
  },
  {
    slug: 'digital-media', name: L('Digital Media & Communication','Médias numériques et communication'), degree: L('BA','Licence'), faculty: 'arts', duration: L('4 years','4 ans'), mode: L('Full-time · On campus','Temps plein · Sur campus'),
    overview: L('Create meaningful digital experiences across storytelling, interaction design and strategic communication.', 'Créez des expériences numériques pertinentes grâce au storytelling, au design d’interaction et à la communication stratégique.'),
    entry: [L('Secondary-school diploma','Diplôme du secondaire'), L('Creative statement','Note créative')],
    curriculum: [L('Visual communication','Communication visuelle'), L('Interaction design','Design d’interaction'), L('Media strategy','Stratégie média'), L('Digital storytelling','Narration numérique'), L('Portfolio studio','Atelier portfolio')],
    careers: [L('UX content designer','Designer de contenu UX'), L('Digital strategist','Stratège numérique'), L('Creative producer','Producteur créatif')],
    skills: [L('Storytelling','Narration'), L('Prototyping','Prototypage'), L('Audience research','Recherche utilisateurs')], fees: L('Indicative tuition: US$8,500/year.','Frais indicatifs : 8 500 $US/an.')
  }
];

export const researchAreas = [
  L('Artificial Intelligence','Intelligence artificielle'), L('Climate & Resilience','Climat et résilience'), L('Agriculture & Food Systems','Agriculture et systèmes alimentaires'), L('Biotechnology','Biotechnologie'), L('Advanced Engineering','Ingénierie avancée'), L('Public Health','Santé publique'), L('Digital Transformation','Transformation numérique')
];

export const researchCenters = [
  { slug: 'responsible-ai', name: L('Center for Responsible AI','Centre pour une IA responsable'), summary: L('Human-centred AI, trustworthy systems and applied machine learning for public value.','IA centrée sur l’humain, systèmes fiables et apprentissage automatique au service de l’intérêt public.'), themes: [L('AI safety','Sécurité de l’IA'), L('Language technologies','Technologies du langage'), L('Data governance','Gouvernance des données')] },
  { slug: 'climate-futures', name: L('Climate Futures Lab','Laboratoire des futurs climatiques'), summary: L('Climate-risk modelling, adaptation design and resilient infrastructure for fast-growing regions.','Modélisation des risques climatiques, adaptation et infrastructures résilientes pour les régions en forte croissance.'), themes: [L('Urban heat','Chaleur urbaine'), L('Coastal resilience','Résilience côtière'), L('Climate finance','Finance climatique')] },
  { slug: 'bioinnovation', name: L('BioInnovation Institute','Institut de bio-innovation'), summary: L('Translational biotechnology spanning diagnostics, agriculture and biomanufacturing.','Biotechnologie translationnelle appliquée au diagnostic, à l’agriculture et à la biofabrication.'), themes: [L('Diagnostics','Diagnostic'), L('Crop resilience','Résilience des cultures'), L('Bioprocessing','Bioprocédés')] },
  { slug: 'cities-mobility', name: L('Cities & Mobility Observatory','Observatoire des villes et de la mobilité'), summary: L('Data-driven research on transport, housing, public space and inclusive urban development.','Recherche fondée sur les données sur le transport, le logement, l’espace public et le développement urbain inclusif.'), themes: [L('Transport systems','Systèmes de transport'), L('Housing','Logement'), L('Urban analytics','Analyse urbaine')] }
];

export const researchers = [
  { slug: 'amara-okoye', name: 'Dr. Amara Okoye', position: L('Associate Professor of AI','Maîtresse de conférences en IA'), faculty: L('Technology & Computing','Technologie et informatique'), department: L('Data & AI','Données et IA'), interests: [L('Responsible AI','IA responsable'), L('Multilingual NLP','TAL multilingue')], publications: 28, email: 'amara.okoye@aurelia.example' },
  { slug: 'luc-mensah', name: 'Prof. Luc Mensah', position: L('Professor of Climate Systems','Professeur de systèmes climatiques'), faculty: L('Engineering','Ingénierie'), department: L('Civil & Environmental Engineering','Génie civil et environnemental'), interests: [L('Climate adaptation','Adaptation climatique'), L('Urban resilience','Résilience urbaine')], publications: 46, email: 'luc.mensah@aurelia.example' },
  { slug: 'sofia-bernard', name: 'Dr. Sofia Bernard', position: L('Senior Lecturer in Public Health','Maîtresse de conférences en santé publique'), faculty: L('Medicine & Health','Médecine et santé'), department: L('Public Health','Santé publique'), interests: [L('Epidemiology','Épidémiologie'), L('Health systems','Systèmes de santé')], publications: 32, email: 'sofia.bernard@aurelia.example' },
  { slug: 'eli-kouassi', name: 'Dr. Eli Kouassi', position: L('Assistant Professor of Economics','Maître de conférences en économie'), faculty: L('Social Sciences','Sciences sociales'), department: L('Economics & Policy','Économie et politiques publiques'), interests: [L('Development economics','Économie du développement'), L('Public finance','Finances publiques')], publications: 19, email: 'eli.kouassi@aurelia.example' },
  { slug: 'nina-dossou', name: 'Dr. Nina Dossou', position: L('Research Fellow in BioInnovation','Chercheuse en bio-innovation'), faculty: L('Science','Sciences'), department: L('Biological Sciences','Sciences biologiques'), interests: [L('Genomics','Génomique'), L('Crop resilience','Résilience des cultures')], publications: 21, email: 'nina.dossou@aurelia.example' },
  { slug: 'marc-duval', name: 'Prof. Marc Duval', position: L('Professor of Architecture','Professeur d’architecture'), faculty: L('Arts & Design','Arts et design'), department: L('Architecture','Architecture'), interests: [L('Urban futures','Futurs urbains'), L('Low-carbon materials','Matériaux bas carbone')], publications: 35, email: 'marc.duval@aurelia.example' },
  { slug: 'aylin-kora', name: 'Dr. Aylin Kora', position: L('Lecturer in Cybersecurity','Enseignante en cybersécurité'), faculty: L('Technology & Computing','Technologie et informatique'), department: L('Cyber Systems','Systèmes cyber'), interests: [L('Secure systems','Systèmes sécurisés'), L('Privacy engineering','Ingénierie de la confidentialité')], publications: 17, email: 'aylin.kora@aurelia.example' },
  { slug: 'jonas-adjovi', name: 'Dr. Jonas Adjovi', position: L('Director, Mobility Observatory','Directeur de l’Observatoire de la mobilité'), faculty: L('Social Sciences','Sciences sociales'), department: L('Cities & Mobility','Villes et mobilité'), interests: [L('Mobility data','Données de mobilité'), L('Urban policy','Politique urbaine')], publications: 40, email: 'jonas.adjovi@aurelia.example' },
  { slug: 'imani-laurent', name: 'Dr. Imani Laurent', position: L('Associate Professor of Sustainable Finance','Maîtresse de conférences en finance durable'), faculty: L('Business','Gestion'), department: L('Finance & Accounting','Finance et comptabilité'), interests: [L('Sustainable finance','Finance durable'), L('Entrepreneurial ecosystems','Écosystèmes entrepreneuriaux')], publications: 24, email: 'imani.laurent@aurelia.example' }
];

export const publications = [
  { year: 2026, title: L('Auditable language models for public-service workflows','Modèles de langage auditables pour les services publics'), area: L('Artificial Intelligence','Intelligence artificielle'), author: 'Amara Okoye et al.' },
  { year: 2026, title: L('Heat-resilient public space in coastal cities','Espaces publics résilients à la chaleur dans les villes côtières'), area: L('Climate','Climat'), author: 'Luc Mensah et al.' },
  { year: 2025, title: L('Primary-care access and maternal outcomes: a regional study','Accès aux soins primaires et santé maternelle : étude régionale'), area: L('Public Health','Santé publique'), author: 'Sofia Bernard et al.' },
  { year: 2025, title: L('Transport affordability and labour-market access','Accessibilité financière du transport et accès à l’emploi'), area: L('Mobility','Mobilité'), author: 'Jonas Adjovi et al.' },
  { year: 2025, title: L('Genomic markers for heat-tolerant staple crops','Marqueurs génomiques pour des cultures vivrières tolérantes à la chaleur'), area: L('Biotechnology','Biotechnologie'), author: 'Nina Dossou et al.' },
  { year: 2024, title: L('Low-carbon masonry systems for tropical climates','Systèmes de maçonnerie bas carbone pour climats tropicaux'), area: L('Architecture','Architecture'), author: 'Marc Duval et al.' }
];

export const scholarships = [
  { name: L('Global Scholars Award','Bourse Global Scholars'), eligibility: L('Outstanding international applicants with academic merit and community leadership.','Candidats internationaux d’excellence ayant un fort engagement communautaire.'), deadline: '15 Feb', coverage: L('Up to 75% tuition','Jusqu’à 75 % des frais'), process: L('Automatic consideration with a complete admissions application.','Examen automatique avec un dossier d’admission complet.') },
  { name: L('STEM Futures Scholarship','Bourse STEM Futures'), eligibility: L('New Engineering, Science or Technology students with strong quantitative preparation.','Nouveaux étudiants en ingénierie, sciences ou technologie avec une solide préparation quantitative.'), deadline: '1 Mar', coverage: L('50% tuition + research stipend','50 % des frais + allocation de recherche'), process: L('Submit a 500-word impact statement and one academic reference.','Soumettre un texte de 500 mots sur l’impact visé et une recommandation académique.') },
  { name: L('Community Leadership Grant','Bourse Leadership communautaire'), eligibility: L('Applicants with sustained service, entrepreneurship or civic leadership.','Candidats ayant un engagement durable dans le service, l’entrepreneuriat ou le leadership civique.'), deadline: '15 Mar', coverage: L('US$3,000–6,000/year','3 000–6 000 $US/an'), process: L('Short essay plus evidence of community contribution.','Court essai et preuve de contribution communautaire.') }
];

export const news = [
  { slug: 'ai-language-lab', date: '2026-09-18', category: L('Research','Recherche'), title: L('Aurelia opens multilingual AI language lab','Aurelia ouvre un laboratoire d’IA multilingue'), summary: L('The new lab will study trusted language technologies for education, public services and regional languages.','Le nouveau laboratoire étudiera des technologies linguistiques fiables pour l’éducation, les services publics et les langues régionales.'), author: 'Research Office' },
  { slug: 'solar-campus', date: '2026-09-10', category: L('Campus','Campus'), title: L('Campus microgrid reaches 60% daytime solar supply','Le micro-réseau du campus atteint 60 % d’alimentation solaire en journée'), summary: L('A student-engineering partnership expands the university’s solar and battery infrastructure.','Un partenariat étudiant-ingénierie renforce l’infrastructure solaire et de stockage de l’université.'), author: 'Sustainability Office' },
  { slug: 'mobility-challenge', date: '2026-08-29', category: L('Innovation','Innovation'), title: L('Student team wins regional urban-mobility challenge','Une équipe étudiante remporte un concours régional de mobilité urbaine'), summary: L('The winning prototype combines low-cost sensors and open data to improve bus reliability.','Le prototype lauréat combine capteurs abordables et données ouvertes pour améliorer la fiabilité des bus.'), author: 'Innovation Hub' },
  { slug: 'health-field-school', date: '2026-08-16', category: L('Community','Communauté'), title: L('Public-health field school expands community screening program','L’école de terrain en santé publique élargit son programme de dépistage communautaire'), summary: L('Students and clinicians supported a six-week prevention and referral program with partner clinics.','Étudiants et cliniciens ont soutenu un programme de prévention et d’orientation de six semaines avec des cliniques partenaires.'), author: 'Faculty of Medicine & Health' },
  { slug: 'design-exhibition', date: '2026-07-27', category: L('Arts','Arts'), title: L('Architecture graduates exhibit climate-positive housing concepts','Les diplômés en architecture exposent des logements à impact climatique positif'), summary: L('Final-year studios present adaptable housing systems designed for dense, hot-climate cities.','Les ateliers de dernière année présentent des systèmes de logement adaptables pour des villes denses et chaudes.'), author: 'Faculty of Arts & Design' },
  { slug: 'global-partners', date: '2026-07-05', category: L('International','International'), title: L('Five new exchange agreements broaden semester-abroad options','Cinq nouveaux accords d’échange élargissent les possibilités de semestre à l’étranger'), summary: L('The agreements add new destinations in Europe, West Africa and Southeast Asia.','Les accords ajoutent de nouvelles destinations en Europe, en Afrique de l’Ouest et en Asie du Sud-Est.'), author: 'International Office' }
];

export const events = [
  { slug: 'open-day', date: '2026-10-10', time: '09:00', category: L('Admissions','Admissions'), title: L('Undergraduate Open Day','Journée portes ouvertes Licence'), location: L('Innovation Forum · Main Campus','Forum de l’innovation · Campus principal'), description: L('Meet faculty, tour learning spaces and get application guidance from the admissions team.','Rencontrez les enseignants, visitez les espaces d’apprentissage et échangez avec l’équipe des admissions.') },
  { slug: 'ai-public-value', date: '2026-10-16', time: '17:30', category: L('Research','Recherche'), title: L('Public Lecture: AI for Public Value','Conférence publique : l’IA au service de l’intérêt public'), location: L('Digital Futures Auditorium','Auditorium Digital Futures'), description: L('Researchers and public-sector leaders discuss practical standards for trustworthy AI.','Chercheurs et responsables publics discutent de normes concrètes pour une IA digne de confiance.') },
  { slug: 'innovation-demo', date: '2026-10-24', time: '14:00', category: L('Innovation','Innovation'), title: L('Innovation Demo Day','Journée de démonstration innovation'), location: L('Enterprise Lab','Laboratoire d’entrepreneuriat'), description: L('Student teams demonstrate prototypes developed with industry and community partners.','Les équipes étudiantes présentent des prototypes développés avec des partenaires industriels et communautaires.') },
  { slug: 'international-fair', date: '2026-11-04', time: '11:00', category: L('International','International'), title: L('Global Opportunities Fair','Forum des opportunités internationales'), location: L('University Commons','Agora universitaire'), description: L('Explore exchange destinations, scholarships, language support and international internships.','Découvrez les destinations d’échange, bourses, aides linguistiques et stages internationaux.') },
  { slug: 'graduate-research-forum', date: '2026-11-18', time: '08:30', category: L('Research','Recherche'), title: L('Graduate Research Forum','Forum de la recherche doctorale et master'), location: L('Research District','Pôle recherche'), description: L('A full-day showcase of graduate research posters, talks and cross-disciplinary workshops.','Une journée de posters, présentations et ateliers interdisciplinaires autour de la recherche de cycle supérieur.') }
];

export const leadership = [
  { slug: 'maya-soro', name: 'Prof. Maya Soro', role: L('President','Présidente'), bio: L('Professor Soro is an engineer and higher-education leader focused on research quality, international partnership and student opportunity.','La professeure Soro est ingénieure et dirigeante de l’enseignement supérieur, engagée pour la qualité de la recherche, les partenariats internationaux et les opportunités étudiantes.'), message: L('A university matters when knowledge becomes capability — for students, communities and society.','Une université compte lorsque le savoir devient capacité — pour les étudiants, les communautés et la société.') },
  { slug: 'antoine-kossi', name: 'Prof. Antoine Kossi', role: L('Provost & Vice President Academic','Vice-président académique'), bio: L('Professor Kossi leads academic quality, faculty development and interdisciplinary education.','Le professeur Kossi pilote la qualité académique, le développement du corps enseignant et la formation interdisciplinaire.'), message: L('Depth and curiosity belong together. Our curricula are designed to develop both.','Rigueur et curiosité vont de pair. Nos cursus sont conçus pour développer les deux.') },
  { slug: 'aisha-moreau', name: 'Dr. Aisha Moreau', role: L('Vice President Research & Innovation','Vice-présidente recherche et innovation'), bio: L('Dr. Moreau builds research programs that connect fundamental inquiry with public and industry needs.','La Dre Moreau développe des programmes reliant recherche fondamentale, besoins publics et industrie.'), message: L('Research is strongest when it is rigorous, open and connected to real problems.','La recherche est plus forte lorsqu’elle est rigoureuse, ouverte et reliée à des problèmes réels.') },
  { slug: 'jonathan-agossa', name: 'Jonathan Agossa', role: L('Director of Student Experience','Directeur de l’expérience étudiante'), bio: L('Agossa coordinates student support, wellbeing, careers and co-curricular learning.','Agossa coordonne l’accompagnement étudiant, le bien-être, les carrières et l’apprentissage extrascolaire.'), message: L('Belonging, challenge and support are all part of a serious student experience.','Appartenance, exigence et accompagnement font partie d’une expérience étudiante ambitieuse.') },
  { slug: 'celine-adeoti', name: 'Prof. Céline Adéoti', role: L('Dean of Engineering','Doyenne de la faculté d’ingénierie'), bio: L('Professor Adéoti leads engineering education and research in resilient infrastructure, energy systems and responsible design.','La professeure Adéoti dirige la formation et la recherche en ingénierie autour des infrastructures résilientes, de l’énergie et du design responsable.'), message: L('Engineering education should make rigor visible in the world around us.','La formation en ingénierie doit rendre la rigueur visible dans le monde qui nous entoure.') },
  { slug: 'samuel-chen', name: 'Prof. Samuel Chen', role: L('Dean of Business','Doyen de la faculté de gestion'), bio: L('Professor Chen oversees business education, entrepreneurship and industry engagement across the faculty.','Le professeur Chen pilote la formation en gestion, l’entrepreneuriat et les relations avec l’industrie.'), message: L('Good management turns evidence, judgment and responsibility into action.','Une bonne gestion transforme les faits, le jugement et la responsabilité en action.') }
];

export type StaticPage = {
  path: string;
  eyebrow: Localized;
  title: Localized;
  intro: Localized;
  bullets: Localized[];
  scene?: 'network' | 'campus' | 'timeline' | 'globe';
  cta?: { label: Localized; to: string };
};

export const staticPages: StaticPage[] = [
  { path:'/admissions/requirements', eyebrow:L('Admissions','Admissions'), title:L('Entry requirements','Conditions d’admission'), intro:L('Requirements vary by level and program. Use these baselines as a planning guide, then check the program detail page.','Les conditions varient selon le niveau et le programme. Utilisez ces repères puis consultez la fiche du programme.'), bullets:[L('Undergraduate: secondary-school completion, required subject preparation and language evidence.','Licence : fin d’études secondaires, matières requises et preuve de langue.'),L('Graduate: recognized bachelor’s degree, academic statement and program-specific prerequisites.','Cycle supérieur : licence reconnue, projet d’études et prérequis propres au programme.'),L('International: certified academic records, language evidence and visa documentation after admission.','International : relevés certifiés, preuve de langue et documents de visa après admission.')], cta:{label:L('Browse programs','Voir les programmes'),to:'/programs'} },
  { path:'/admissions/process', eyebrow:L('Admissions','Admissions'), title:L('Your application journey','Votre parcours de candidature'), intro:L('A six-step path keeps the process transparent from exploration to enrollment.','Un parcours en six étapes rend le processus clair, de la découverte à l’inscription.'), bullets:[L('01 Discover — compare programs and outcomes.','01 Découvrir — comparer les programmes et débouchés.'),L('02 Prepare — gather transcripts, references and language evidence.','02 Préparer — réunir relevés, recommandations et preuve de langue.'),L('03 Apply — complete the secure front-end application workflow.','03 Postuler — remplir le parcours de candidature.'),L('04 Review — admissions checks the complete application.','04 Évaluation — l’équipe examine le dossier complet.'),L('05 Admission — successful applicants receive an offer and next steps.','05 Admission — les candidats retenus reçoivent une offre et les étapes suivantes.'),L('06 Enroll — confirm your place, finance plan and orientation.','06 S’inscrire — confirmer sa place, son financement et l’orientation.')], scene:'timeline', cta:{label:L('Start application','Commencer la candidature'),to:'/apply'} },
  { path:'/admissions/tuition-fees', eyebrow:L('Admissions','Admissions'), title:L('Tuition & fees','Frais de scolarité'), intro:L('Program tuition is published on each program page. Planning should also include housing, transport, learning materials and health coverage.','Les frais sont indiqués sur chaque programme. Prévoyez également logement, transport, matériel pédagogique et couverture santé.'), bullets:[L('Most undergraduate programs: approximately US$8,300–9,800 per year.','La plupart des licences : environ 8 300–9 800 $US/an.'),L('Most graduate programs: approximately US$9,600–10,600 per year.','La plupart des masters : environ 9 600–10 600 $US/an.'),L('Payment plans and merit/need-based support are available to eligible students.','Des plans de paiement et aides au mérite/besoin sont proposés aux étudiants éligibles.')], cta:{label:L('View scholarships','Voir les bourses'),to:'/admissions/scholarships'} },
  { path:'/campus-life/student-life', eyebrow:L('Campus Life','Vie de campus'), title:L('Student life','Vie étudiante'), intro:L('A connected campus mixes academic intensity with clubs, creative work, sport, service and events.','Un campus connecté associe exigence académique, clubs, création, sport, engagement et événements.'), bullets:[L('Student-led organizations across technology, culture, enterprise and service.','Associations étudiantes en technologie, culture, entrepreneuriat et engagement.'),L('Weekly campus programming and peer-led communities.','Programmation hebdomadaire et communautés animées par les étudiants.'),L('Dedicated advising, wellbeing and career support.','Accompagnement dédié pour les études, le bien-être et les carrières.')], scene:'campus' },
  { path:'/campus-life/clubs', eyebrow:L('Campus Life','Vie de campus'), title:L('Clubs & organizations','Clubs et associations'), intro:L('Find communities to build, perform, debate, compete, volunteer and create.','Trouvez des communautés pour construire, créer, débattre, concourir, faire du bénévolat et entreprendre.'), bullets:[L('Robotics & Maker Society','Club robotique et fabrication'),L('Debate & Model Diplomacy','Débat et diplomatie'),L('Arts Collective','Collectif artistique'),L('Social Impact Lab','Laboratoire d’impact social'),L('Entrepreneurs Network','Réseau des entrepreneurs')] },
  { path:'/campus-life/sports', eyebrow:L('Campus Life','Vie de campus'), title:L('Sport & movement','Sport et mouvement'), intro:L('Recreation and competitive sport support physical health, teamwork and campus connection.','Le sport de loisir et de compétition soutient la santé, l’esprit d’équipe et la vie de campus.'), bullets:[L('Football, basketball, athletics and volleyball','Football, basketball, athlétisme et volleyball'),L('Fitness studio and guided classes','Salle de fitness et cours encadrés'),L('Intramural leagues and beginner sessions','Ligues intra-campus et séances débutants')] },
  { path:'/campus-life/accommodation', eyebrow:L('Campus Life','Vie de campus'), title:L('Accommodation','Logement'), intro:L('First-year and international students can request managed residences close to teaching and student services.','Les étudiants de première année et internationaux peuvent demander un logement géré près des espaces d’enseignement et services.'), bullets:[L('Furnished single and shared rooms','Chambres individuelles et partagées meublées'),L('Study rooms, laundry and secure access','Salles d’étude, buanderie et accès sécurisé'),L('Resident advisers and 24/7 support line','Référents de résidence et assistance 24 h/24')] },
  { path:'/campus-life/library', eyebrow:L('Campus Life','Vie de campus'), title:L('Library & learning commons','Bibliothèque et espaces d’apprentissage'), intro:L('Quiet study, collaborative spaces, research support and digital collections come together in one learning hub.','Étude silencieuse, espaces collaboratifs, aide à la recherche et collections numériques réunis dans un même pôle.'), bullets:[L('Extended-hours study floors','Espaces d’étude à horaires étendus'),L('Research consultations and citation support','Consultations de recherche et aide bibliographique'),L('Digital journals, ebooks and data resources','Revues numériques, ebooks et ressources de données')] },
  { path:'/campus-life/cafeteria', eyebrow:L('Campus Life','Vie de campus'), title:L('Food & dining','Restauration'), intro:L('Multiple campus dining points serve affordable meals, quick snacks and adaptable dietary options.','Plusieurs points de restauration proposent repas abordables, snacks et options adaptées.'), bullets:[L('Vegetarian and allergy-aware options','Options végétariennes et adaptées aux allergies'),L('Student meal plans','Formules étudiantes'),L('Locally sourced seasonal menu rotation','Menus saisonniers privilégiant les produits locaux')] },
  { path:'/campus-life/services', eyebrow:L('Campus Life','Vie de campus'), title:L('Student services','Services aux étudiants'), intro:L('Practical help is integrated around advising, finance, accessibility, records and student success.','L’aide pratique couvre orientation, finances, accessibilité, dossiers et réussite étudiante.'), bullets:[L('Academic advising','Conseil pédagogique'),L('Accessibility services','Services d’accessibilité'),L('Student finance guidance','Conseil financier étudiant'),L('Records & registration','Dossiers et inscriptions')] },
  { path:'/campus-life/wellbeing', eyebrow:L('Campus Life','Vie de campus'), title:L('Health & wellbeing','Santé et bien-être'), intro:L('Confidential, preventative support helps students maintain physical and mental wellbeing.','Un accompagnement confidentiel et préventif aide les étudiants à préserver leur santé physique et mentale.'), bullets:[L('Primary care and referrals','Soins primaires et orientations'),L('Counselling and wellbeing workshops','Soutien psychologique et ateliers bien-être'),L('Health promotion and prevention','Prévention et promotion de la santé')] },
  { path:'/campus-life/career-center', eyebrow:L('Campus Life','Vie de campus'), title:L('Career Center','Centre de carrière'), intro:L('Career development starts early through coaching, employer projects, internships and alumni connections.','Le développement de carrière commence tôt grâce au coaching, aux projets employeurs, stages et réseaux alumni.'), bullets:[L('CV, portfolio and interview coaching','Coaching CV, portfolio et entretiens'),L('Internship and graduate-role matching','Mise en relation pour stages et premiers emplois'),L('Employer projects embedded in programs','Projets d’entreprise intégrés aux cursus')] },
  { path:'/alumni/stories', eyebrow:L('Alumni','Anciens'), title:L('Alumni stories','Parcours d’anciens'), intro:L('Graduates take Aurelia into research labs, ventures, public institutions and creative practice around the world.','Les diplômés d’Aurelia poursuivent leur parcours dans la recherche, l’entrepreneuriat, les institutions publiques et la création.'), bullets:[L('From computer science to public-interest AI','De l’informatique à l’IA d’intérêt public'),L('From civil engineering to climate-resilient cities','Du génie civil aux villes résilientes'),L('From business to social enterprise','De la gestion à l’entreprise sociale')], scene:'globe' },
  { path:'/alumni/events', eyebrow:L('Alumni','Anciens'), title:L('Alumni events','Événements alumni'), intro:L('Reunions, regional gatherings and career conversations keep the graduate community active.','Rencontres, événements régionaux et échanges de carrière maintiennent la communauté des diplômés active.'), bullets:[L('Regional networking evenings','Soirées de réseautage régionales'),L('Industry roundtables','Tables rondes sectorielles'),L('Annual homecoming weekend','Week-end annuel des anciens')] },
  { path:'/alumni/career-network', eyebrow:L('Alumni','Anciens'), title:L('Career network','Réseau carrière'), intro:L('Alumni can mentor students, post opportunities and connect across industries and regions.','Les anciens peuvent mentorer des étudiants, publier des opportunités et se connecter entre secteurs et régions.'), bullets:[L('Mentoring circles','Cercles de mentorat'),L('Industry communities','Communautés sectorielles'),L('Graduate opportunity board','Tableau d’opportunités pour diplômés')] },
  { path:'/alumni/giving', eyebrow:L('Alumni','Anciens'), title:L('Giving','Faire un don'), intro:L('Philanthropic support expands scholarships, research access and student-led initiatives.','Le soutien philanthropique élargit les bourses, l’accès à la recherche et les initiatives étudiantes.'), bullets:[L('Scholarship fund','Fonds de bourses'),L('Research opportunity fund','Fonds d’opportunités de recherche'),L('Student innovation fund','Fonds d’innovation étudiante')] },
  { path:'/about/mission', eyebrow:L('About Aurelia','À propos d’Aurelia'), title:L('Mission & vision','Mission et vision'), intro:L('Aurelia exists to develop capable people and useful knowledge for a connected, rapidly changing world.','Aurelia forme des personnes capables d’agir et produit des connaissances utiles dans un monde connecté et en mutation.'), bullets:[L('Mission: rigorous education with practical consequence.','Mission : une formation rigoureuse aux effets concrets.'),L('Vision: a globally connected university with regional relevance.','Vision : une université connectée au monde et pertinente pour sa région.'),L('Values: curiosity, integrity, inclusion, service and ambition.','Valeurs : curiosité, intégrité, inclusion, service et ambition.')] },
  { path:'/about/history', eyebrow:L('About Aurelia','À propos d’Aurelia'), title:L('A history of purposeful growth','Une histoire de croissance utile'), intro:L('Aurelia’s fictional history is designed around four eras of academic expansion and public engagement.','L’histoire fictive d’Aurelia s’organise autour de quatre étapes d’expansion académique et d’engagement public.'), bullets:[L('1998 — founded with Engineering, Business and Science.','1998 — fondation avec Ingénierie, Gestion et Sciences.'),L('2008 — research district and first international partnerships.','2008 — pôle recherche et premiers partenariats internationaux.'),L('2017 — digital campus and interdisciplinary institutes.','2017 — campus numérique et instituts interdisciplinaires.'),L('2026 — new AI, climate and health initiatives.','2026 — nouvelles initiatives en IA, climat et santé.')], scene:'timeline' },
  { path:'/about/governance', eyebrow:L('About Aurelia','À propos d’Aurelia'), title:L('Governance','Gouvernance'), intro:L('Academic and institutional governance balances oversight, scholarly independence and transparent decision-making.','La gouvernance académique et institutionnelle équilibre supervision, indépendance scientifique et transparence.'), bullets:[L('University Council oversees strategy and fiduciary responsibilities.','Le Conseil universitaire supervise la stratégie et les responsabilités fiduciaires.'),L('Academic Senate governs academic standards and awards.','Le Sénat académique gouverne les normes et diplômes.'),L('Student and staff representatives participate in defined governance forums.','Des représentants des étudiants et du personnel siègent dans des instances définies.')] },
  { path:'/about/accreditations', eyebrow:L('About Aurelia','À propos d’Aurelia'), title:L('Accreditations & quality','Accréditations et qualité'), intro:L('This demonstration site does not claim real-world accreditation. The page models how an institution would publish verified quality information.','Ce site de démonstration ne revendique aucune accréditation réelle. La page montre comment une institution publierait des informations de qualité vérifiées.'), bullets:[L('Program approval status should be verified against official regulator records.','Le statut des programmes doit être vérifié auprès des autorités compétentes.'),L('Professional-program accreditation belongs on each relevant program page.','Les accréditations professionnelles doivent figurer sur chaque programme concerné.'),L('Quality-review cycles and outcomes should be published transparently.','Les cycles d’évaluation qualité et leurs résultats doivent être publiés de façon transparente.')] },
  { path:'/about/partnerships', eyebrow:L('About Aurelia','À propos d’Aurelia'), title:L('Partnerships','Partenariats'), intro:L('Partnerships connect education and research with universities, communities and employers.','Les partenariats relient la formation et la recherche aux universités, communautés et employeurs.'), bullets:[L('Student exchange and joint teaching','Échanges étudiants et enseignement conjoint'),L('Research collaboration and shared facilities','Collaboration de recherche et équipements partagés'),L('Industry projects, internships and innovation programs','Projets industriels, stages et programmes d’innovation')] },
  { path:'/about/campus', eyebrow:L('About Aurelia','À propos d’Aurelia'), title:L('The campus','Le campus'), intro:L('A walkable academic district combines teaching, research, residence, sport and social space.','Un quartier universitaire accessible à pied réunit enseignement, recherche, résidence, sport et espaces sociaux.'), bullets:[L('Learning Commons','Learning Commons'),L('Innovation Forum','Forum de l’innovation'),L('Research District','Pôle recherche'),L('Student Commons & residences','Agora étudiante et résidences')], scene:'campus' }
];

export const internationalConnections = [
  { city: 'Paris', country: L('France','France') }, { city: 'Accra', country: L('Ghana','Ghana') }, { city: 'Montreal', country: L('Canada','Canada') }, { city: 'Singapore', country: L('Singapore','Singapour') }, { city: 'Cape Town', country: L('South Africa','Afrique du Sud') }, { city: 'Kigali', country: L('Rwanda','Rwanda') }
];
