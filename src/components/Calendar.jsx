import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsPeopleFill, BsSearch, BsCalendar3, BsListUl, BsGeoAltFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoClose } from "react-icons/io5"; 
import DABuilding from "../assets/DABuilding.jpeg";
import News3 from "../assets/News3.png";
import PMC from "../assets/PMC.JPG";
import Disaster from "../assets/Disaster.jpg";
import ToT from "../assets/ToT.png";
import Pilot from "../assets/Pilot.JPG";
import Rollout from "../assets/Rollout.png";
import Fourps from "../assets/4ps.png";
import Houseparenting from "../assets/Houseparenting.png";
import Lad from "../assets/Lad.JPG";
import Random from "../assets/Random.png";
import Upskill from "../assets/Upskill.png";
import PES from "../assets/PES.png";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const trainingCategories = {
  1: "Disaster Response Trainings",
  2: "DSWD Academy Functionality Trainings",
  3: "SDCA Functionality",
  4: "Sectoral Development Programs Trainings",
  5: "Social Welfare and Development Agencies Trainings",
  6: "Training on Community-based Programs",
  7: "Training on Family"
};

const exampleEvents = [
  {
    id: 1,
    startDate: new Date(2026, 1, 23),
    endDate: new Date(2026, 1, 27),
    title: "Training on Pre-Marriage Counceling Batch 7",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conduction the Pre-marriage Orientation and Counceling (PMOC) program",
    venue: "DSWD Academy Taguig (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: PMC,
    colorId: 7,
  },
  {
    id: 2,
    startDate: new Date(2026, 1, 23),
    endDate: new Date(2026, 1, 27),
    title: "Localized Training on Pre-Marriage Counseling",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conduction the Pre-marriage Orientation and Counceling (PMOC) program",
    venue: "Bataan (Central Luzon)",
    tag: "WITH CPD UNITS",
    target: "Local Government Units",
    image: PMC,
    colorId: 7,
  },
  {
    id: 3,
    startDate: new Date(2026, 2, 8),
    endDate: new Date(2026, 2, 14),
    title: "Training of Trainers Parent Effectiveness Service",
    description: "The Training of Trainers (ToT) on the Parent Effectiveness Service (PES) Program Facilitators equips a nationwide pool of DSWD and LGU technical trainers with the competencies to deliver standardized PES modules, facilitation methodologies, and monitoring mechanisms in line with Republic ACT No. 11908 and its Implementing Rules and Regulations. It strenghtens their capacity to provide technical assistance, train PES facilitators, and ensure consistent, quality implementation of the program across regions, provinces, and municipalities. It also supports effective parenting education and promotes the holistic development and protection of Filipino children and families.",
    venue: "Baguio City (Cordillera Administrative Region)",
    tag: "TRAINING OF TRAINERS",
    target: "Field Offices, Provincial Social Welfare and Development Office (PSWDOs)",
    image: PES,
    colorId: 7,
  },
  {
    id: 4,
    startDate: new Date(2026, 2, 9),
    endDate: new Date(2026, 2, 13),
    title: "Localized Training on Pre-Marriage Counseling",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conduction the Pre-marriage Orientation and Counceling (PMOC) program",
    venue: "Palompon (Eastern Visayas)",
    tag: "WITH CPD UNITS",
    target: "Local Government Units",
    image: PMC,
    colorId: 7,
  },
  {
    id: 5,
    startDate: new Date(2026, 2, 10),
    endDate: new Date(2026, 2, 13),
    title: "Pilot Implementation of the training manual on Parenting  LGBTQ+ Residents in DSWD Centers and Residential Care Facilities: Creating a Safe, Affirming and Inclusive Environment",
    description: "House parents in DSWD Centers and Residential Care Facilities (CRCFs) play a critical role in ensuring the safety, well-being, and holistic development of residents, yet they often face significant challenges in meeting diverse needs. Lesbian, gay, bisexual, transgender, queer or questioning, intersex, asexual, and more (LGBTQIA+) residents, in particular, experience additional layers of vulnerability that require house parents to apply intentional, nonjudgemental, and supportive parenting approaches. This program equips house parents with essential skills to create affirming, safe, and inclusive environments where LGBTQIA+ residents feel cared for, valued, and protected",
    venue: "Region VI",
    tag: "PILOT",
    target: "Supervising Social Work, Houseparent, Teacher, Psychometrician, Psychologists",
    image: Pilot,
    colorId: 5,
  },
  {
    id: 6,
    startDate: new Date(2026, 2, 16),
    endDate: new Date(2026, 2, 20),
    title: "Training of Trainers on Modules on Nutrition Care Process Capacity Building for Houseparents in DSWD Residential Care Facilities for Children and Youth",
    description: "To equip the DSWD trainers  with instructional, supervisory, and evaluative skills for nutrition capacity building on implementing the Nutrition Care Process (NCP) to improve the nutritional status of children and youth in residential facilities.",
    venue: "MIMAROPA",
    tag: "TRAINING OF TRAINERS",
    target: "Supervising Houseparent, Nutritionist, Medical Personnel",
    image: Houseparenting,
    colorId: 5,
  },
  {
    id: 7,
    startDate: new Date(2026, 2, 22),
    endDate: new Date(2026, 2, 28),
    title: "Training of Trainers Parent Effectiveness Service",
    description: "The Training of Trainers (ToT) on the Parent Effectiveness Service (PES) Program Facilitators equips a nationwide pool of DSWD and LGU technical trainers with the competencies to deliver standardized PES modules, facilitation methodologies, and monitoring mechanisms in line with Republic Act No. 11908 and its Implementing Rules and Regulations. It strengthens their capacity to provide technical assistance, train PES facilitators, and ensure consistent, quality implementation of the program across regions, provinces, and municipalities. It also supports effective parenting education and promotes the holistic development and protection of Filipino children and families.",
    venue: "National Capital Region",
    tag: "TRAINING OF TRAINERS",
    target: "Field Offices, Provincial Social Welfare and Development Office (PSWDOs)",
    image: PES,
    colorId: 7,
  },
  {
    id: 8,
    startDate: new Date(2026, 2, 22),
    endDate: new Date(2026, 2, 27),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Cordillera Administrative Region",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 9,
    startDate: new Date(2026, 2, 23),
    endDate: new Date(2026, 2, 27),
    title: "Foundational Course on Women, Peace, and Security for GAD Focal Persons",
    description: "This training program is a five-day (with half-days on Day 1 and Day 5) Gender-Responsive, Conflict-Sensitive, and Peace-Promoting (CSPP) capacity-building program for Department of Social Welfare and Development (DSWD) case managers and personnel working in conflict-affected and conflict-vulnerable contexts. The design mirrors the canonical CSPP training flow facilitated for DSWD PDOs and case managers last 2025 with OPAPRU, while being enhanced by the Women, Peace and Security Center of Excellence (WPS CoE) to foreground gender, power, participation, and protection in line with the Philippine National Action Plan on Women, Peace and Security (NAPWPS) 2023–2033.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "GAD Focal Persons",
    image: Random,
    colorId: 4,
  },
  {
    id: 10,
    startDate: new Date(2026, 3, 12),
    endDate: new Date(2026, 3, 17),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Cordillera Administrative Region",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 11,
    startDate: new Date(2026, 3, 19),
    endDate: new Date(2026, 3, 24),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region I, Region III, Region IV-A, Region V, Region VI, and others.",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 12,
    startDate: new Date(2026, 3, 19),
    endDate: new Date(2026, 3, 25),
    title: "Training of Trainers on Houseparenting",
    description: "This Training of Trainers on Houseparenting builds a sustainable pool of skilled Social Workers and allied professionals who can effectively cascade standardized, rights-based, and trauma-informed houseparenting practices nationwide to ensure safe, nurturing, and developmentally supportive care for children in residential facilities.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "TRAINING OF TRAINERS",
    target: "Core Group of Specialists, Learning Management Team",
    image: Houseparenting,
    colorId: 2,
  },
  {
    id: 13,
    startDate: new Date(2026, 3, 20),
    endDate: new Date(2026, 3, 24),
    title: "Training of Trainers for Training on Pre-Marriage Counseling",
    description: "This Training of Trainers equips a nationwide pool of expert facilitators with mastery of the updated, standardized Pre-Marriage Counseling (PMC) competencies and training methodologies to ensure LGUs’ full compliance with national standards and sustain high-quality PMC implementation across all regions.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "TRAINING OF TRAINERS",
    target: "Core Group of Specialists, Learning Management Team",
    image: PMC,
    colorId: 2,
  },
  {
    id: 14,
    startDate: new Date(2026, 3, 21),
    endDate: new Date(2026, 3, 24),
    title: "Training of trainers of Training Manual for Caregivers on Handling Persons with Disabilities Needing Long-Term Residential Care",
    description: "",
    venue: "Region I",
    tag: "TRAINING OF TRAINERS",
    target: "Supervising Social Worker, Supervising Houseparent",
    image: ToT,
    colorId: 5,
  },
  {
    id: 15,
    startDate: new Date(2026, 3, 27),
    endDate: new Date(2026, 4, 1),
    title: "Rollout on Modules on Nutrition Care Process Capacity Building for Houseparents in DSWD Residential Care Facilities for Children and Youth",
    description: "This activity will enable House parents and other relevant personnel of residential care facilities for children and youth apply the  ethical, cultural, and evidence-based approaches to nutrition care delivery",
    venue: "Cordillera Administrative Region",
    tag: "TRAINING OF TRAINERS",
    target: "Houseparent, Nutritionist, Medical Personnel",
    image: Houseparenting,
    colorId: 5,
  },
  {
    id: 16,
    startDate: new Date(2026, 4, 3),
    endDate: new Date(2026, 4, 8),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "NCR, Region XII, Region III, Region V, Region VI, Region II, and others.",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 17,
    startDate: new Date(2026, 4, 5),
    endDate: new Date(2026, 4, 8),
    title: "4Ps RPC Conference (1st sem)",
    description: "The conference is a semestral gathering that serves as a venue to discuss implementation, targets, directives, updates and other program-related issues both at the 4Ps national and regional levels.",
    venue: "Region VI",
    tag: "",
    target: "4Ps Regional Program Coordinators, NPMO Division Chiefs, OICs and Technical Staff",
    image:  Fourps,
    colorId: 4,
  },
  {
    id: 18,
    startDate: new Date(2026, 4, 5),
    endDate: new Date(2026, 4, 8),
    title: "Rollout of Training Manual on Basic Psychological Strategies",
    description: "The DSWD CRCF Multidisciplinary Teams  will be equipped with the essential knowledge, skills, and mindset to deliver responsive and compassionate psychological support to children and adolescents facing emotional or behavioral challenges.",
    venue: "Region III",
    tag: "",
    target: "Social Worker, Psychometrician, Houseparent, MO",
    image: Rollout,
    colorId: 5,
  },
  {
    id: 19,
    startDate: new Date(2026, 4, 6),
    endDate: new Date(2026, 4, 8),
    title: "Internal Training for Administrative Staff",
    description: "This training is designed to enhance efficiency, accuracy, and confidence among administrative personnel while reinforcing their critical role in public service delivery. Equipped with the new set of skills, they will be able to perform their tasks more productively, effectively, and efficiently, leading to better individual and organizational performance and quality service delivery.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "Administrative and Technical Staffs",
    image: Random,
    colorId: 2,
  },
  {
    id: 20,
    startDate: new Date(2026, 4, 10),
    endDate: new Date(2026, 4, 15),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region VII, Region XI, Region II, Region IV-A, MIMAROPA, and others.",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 21,
    startDate: new Date(2026, 4, 11),
    endDate: new Date(2026, 4, 15),
    title: "TOT of the Facilitator’s Manual for Social Work Case Management for CANE+D Children in Center and Residential Care Facilities: A Training  Course for CRCF Social Workers",
    description: "This training of trainers will be done in order to equip the future trainers and facilitators of the Case Management for CANE+D Children in Center and Residential Care Facilities Training.  It will review basic principles of adult learning as well as go through the entire training course.",
    venue: "Region X",
    tag: "",
    target: "Center Head, Supervising Social Worker",
    image: ToT,
    colorId: 5,
  },
  {
    id: 22,
    startDate: new Date(2026, 4, 11),
    endDate: new Date(2026, 4, 15),
    title: "Training on Pre-Marriage Counseling batch 2",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: PMC,
    colorId: 7,
  },
  {
    id: 23,
    startDate: new Date(2026, 4, 17),
    endDate: new Date(2026, 4, 22),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region III, Region IV-A, and CARAGA",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 24,
    startDate: new Date(2026, 4, 19),
    endDate: new Date(2026, 4, 22),
    title: "TOT of training manual on Parenting  LGBTQ+ Residents in DSWD Centers and Residential Care Facilities: Creating a Safe, Affirming and Inclusive Environment",
    description: "It aims to strengthen the knowledge, attitudes, and facilitation skills of caregivers and service providers in supporting LGBTQ+ residents in DSWD centers and residential care facilities. It equips trainers with practical, gender-responsive and trauma-informed approaches to guide parenting and caregiving practices that promote safety, dignity, and inclusion.",
    venue: "Region IX",
    tag: "TRAINING OF TRAINERS",
    target: "Center Head, Supervising Social Worker, Social Worker, Supervising Houseparent, Teacher, Psychometrician,Psychologists",
    image: ToT,
    colorId: 5,
  },
  {
    id: 25,
    startDate: new Date(2026, 4, 24),
    endDate: new Date(2026, 4, 26),
    title: "Rollout Parent Effectiveness Service",
    description: "",
    venue: "Region I, Region VII, Region V, Region X, and MIMAROPA",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 27,
    startDate: new Date(2026, 4, 24),
    endDate: new Date(2026, 4, 26),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region I, Region VII, Region V, Region X, and MIMAROPA",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 28,
    startDate: new Date(2026, 4, 31),
    endDate: new Date(2026, 5, 5),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region VIII, Region XI, Region VI, Region IX, and others.",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 29,
    startDate: new Date(2026, 5, 1),
    endDate: new Date(2026, 5, 5),
    title: "Training on Pre-Marriage Counseling BATCH 3",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: PMC,
    colorId: 7,
  },
  {
    id: 30,
    startDate: new Date(2026, 5, 1),
    endDate: new Date(2026, 5, 5),
    title: "Training on Pre-Marriage Counseling BATCH 4",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: PMC,
    colorId: 7,
  },
  {
    id: 31,
    startDate: new Date(2026, 5, 1),
    endDate: new Date(2026, 5, 5),
    title: "Upskilling on Social Work Counseling: Counseling Competencies for Today’s Social Worker Batch 1",
    description: "This training equips DSWD CRCF social workers with essential counseling competencies to effectively assess and support vulnerable and high-need clients in both in-person and remote settings. Participants will strengthen their key counseling skills, ethical decision-making, and cultural competence while applying trauma-informed and client-centered approaches in diverse practice situations. The program also emphasizes practical self-care strategies to help social workers manage stress, prevent burnout, and sustain professional effectiveness in demanding work environments.",
    venue: "Region VII",
    tag: "",
    target: "Child, Youth, Women, Family, OP, Persons With Disabillities",
    image: Upskill,
    colorId: 5,
  },
  {
    id: 32,
    startDate: new Date(2026, 5, 8),
    endDate: new Date(2026, 5, 11),
    title: "Upskilling on Strategic Communications",
    description: "This Upskilling Program on Strategic Communication is designed for CRCF Center Heads and Supervising Social Workers to strengthen their communication and leadership skills in managing teams and engaging stakeholders. It enhances their ability to deliver clear messages, handle difficult conversations, and manage conflict effectively, especially in sensitive and high-pressure situations. The program equips participants with practical strategies to promote collaboration, transparency, and effective service delivery within their centers.",
    venue: "CARAGA",
    tag: "",
    target: "Center Head, Supervising Social Worker",
    image: Upskill,
    colorId: 5,
  },
  {
    id: 33,
    startDate: new Date(2026, 5, 14),
    endDate: new Date(2026, 5, 19),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region VIII, Region IX, Region XII, Region VI, and others.",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 34,
    startDate: new Date(2026, 5, 22),
    endDate: new Date(2026, 5, 27),
    title: "Training on Houseparenting",
    description: "This training aims to improve the competencies of houseparents, as frontline service providers, in handling and managing children under their care.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "Field Offices, Social Welfare and Developmental Agencies, and LGU-Managed Centers/Residential Care Facilities",
    image: Houseparenting,
    colorId: 5,
  },
  {
    id: 35,
    startDate: new Date(2026, 5, 28),
    endDate: new Date(2026, 6, 3),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region IX, Region IV-A, Region V, Region VIII, and Region X",
    tag: "",
    target: "Cities, Municipalities",
    image: PES,
    colorId: 7,
  },
  {
    id: 36,
    startDate: new Date(2026, 5, 29),
    endDate: new Date(2026, 6, 3),
    title: "Ladderized 1: Training on Leadership and Management for Local Social Welfare and Development Officers: Catalysts for Change",
    description: "The Leadership Training for Local Social Welfare and Development Officers (LSWDOs) is designed to build the essential skills, knowledge, and mindset required for effective leadership in social welfare programs. This training equips LSWDOs to navigate policy changes, manage resources, lead teams, and respond to various community challenges. Through a focus on ethical leadership, accountability, emotional intelligence, decision-making, and problem-solving, the program enhances their capacity to deliver impactful services. It also promotes stakeholder collaboration to ensure more efficient service delivery and greater community impact. By empowering LSWDOs to advocate for marginalized populations, promote social justice.  mentor future leaders, and design sustainable, inclusive programs, the training contributes to the long-term well-being and development of the communities they serve.",
    venue: "Region IX, Region IV-A, Region V, Region VIII, and Region X",
    tag: "",
    target: "Local Social Welfare and Development Officers (LSWDOs) from LGUs (Level 1-2 Rating in the SDCA)",
    image: Lad,
    colorId: 3,
  },
  {
    id: 37,
    startDate: new Date(2026, 5, 29),
    endDate: new Date(2026, 6, 3),
    title: "Training on Pre-Marriage Counseling BATCH 5",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: PMC,
    colorId: 7,
  },
  {
    id: 38,
    startDate: new Date(2026, 6, 6),
    endDate: new Date(2026, 6, 10),
    title: "Disaster Response and Crisis Management: Women Friendly Spaces",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Disaster,
    colorId: 1,
  },
  {
    id: 39,
    startDate: new Date(2026, 6, 13),
    endDate: new Date(2026, 6, 17),
    title: "Disaster Response and Crisis Management: Psychological First Aid Training for Local Social Welfare Development Officers",
    description: "This Psychological First Aid Training strengthens the capacity of Local Social Welfare and Development Officers to act as psychological first responders by equipping them with essential skills to provide timely, ethical, and effective psychosocial support to disaster-affected individuals and families, promoting emotional recovery, resilience, and access to appropriate services during crises.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Disaster,
    colorId: 1,
  },
  {
    id: 40,
    startDate: new Date(2026, 6, 13),
    endDate: new Date(2026, 6, 17),
    title: "Certificate Course on Gender Responsive Case Management",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 4,
  },
  {
    id: 41,
    startDate: new Date(2026, 6, 27),
    endDate: new Date(2026, 6, 31),
    title: "Basic Course on Anti-Online Sexual Abuse or Exploitation of Children",
    description: "The Basic Course on Anti-Online Sexual Abuse and Exploitation of Children (OSAEC) and Child Sexual Abuse and Exploitation Materials (CSAEM) for Multi-Disciplinary Teams (MDTs) is designed to strengthen the capacity of frontline responders from Local Government Units (LGUs) in addressing cases of online child sexual abuse and exploitation. This course provides participants with a comprehensive understanding of the global and local context of OSAEC. It willl equip MDT members with practical skills in case identification, reporting, referral pathways, Psychological First Aid (PFA), inter-agency coordination, and self-care strategies.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 4,
  },
  {
    id: 42,
    startDate: new Date(2026, 6, 27),
    endDate: new Date(2026, 6, 31),
    title: "Ladderized 2: Training on Problem Solving and Decision Making",
    description: "This intervention is aligned with the thrust of the DSWD in making LGUs institutional development initiatives a reality in ensuring that delivery systems for SWD services are effective, convergent, and impactful, as envisioned in DSWD Thrusts and Priorities. It also supports the long-term strategic objectives of the DSWD Academy under the SWIDB in fulfilling its mission to build and sustain the capacities of its partners and stakeholders.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "Local Social Welfare and Development Offices (LSWDOs)",
    image: Lad,
    colorId: 3,
  },
  {
    id: 43,
    startDate: new Date(2026, 7, 10),
    endDate: new Date(2026, 7, 14),
    title: "ToT on Case Management for CAR and CICL",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: ToT,
    colorId: 4,
  },
  {
    id: 44,
    startDate: new Date(2026, 6, 9),
    endDate: new Date(2026, 6, 15),
    title: "Training on Houseparenting",
    description: "This training aims to improve the competencies of houseparents, as frontline service providers, in handling and managing children under their care.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "DSWD Field Offices, Social Welfare and Development Agencies and LGU-managed Centers/Residential Care Facilities",
    image: Houseparenting,
    colorId: 5,
  },
  {
    id: 45,
    startDate: new Date(2026, 8, 28),
    endDate: new Date(2026, 9, 2),
    title: "Ladderized 3: Training on Results - Based Monitoring and Evaluation for Local Social Welfare and Development Officers",
    description: " The “Training on Results - Based Monitoring and Evaluation” (RBME) aims to build the knowledge and skills of LGU staffers along monitoring and evaluation leading towards establishment of RBME system that can serve as a tool to improve the way the LGU implements its programs. The system may also show if programs produced its intended results. A functional RBME system will ensure that policies, programs and projects are anchored on a solid knowledge base that can support the organization towards achievement of set goals leading to an improved performance and service delivery. In the long run, it can also serve as a reference tool to examine the outcomes and impacts and answer the “so what” questions being expected by stakeholders. The target participants for this training are LSWDOs/MSWDOs. The five (5) day activity will be conducted in person on a face-to-face platform. Most of the discussion shall have an equivalent workshop component to ensure understanding and application learnings. This course will cover 2 modules with 11 topics divided in each module and 4 workshops. Moreover, this training shall serve as the Level 1 in strengthening knowledge and skills of LGU implementers along monitoring and evaluation. ",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "Level 1-2 Local Social Worker Officers",
    image: Lad,
    colorId: 3,
  },
  {
    id: 46,
    startDate: new Date(2026, 8, 7),
    endDate: new Date(2026, 8, 11),
    title: "Training on Pre-Marriage Counseling",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: PMC,
    colorId: 7,
  },
  {
    id: 47,
    startDate: new Date(2026, 8, 14),
    endDate: new Date(2026, 8, 18),
    title: "Training on Yakap Bayan Program",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 6,
  },
  {
    id: 48,
    startDate: new Date(2026, 8, 21),
    endDate: new Date(2026, 8, 25),
    title: "Training on the Use of Asessment on Survivors Outcome (ASO) tool.",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 4,
  },
  {
    id: 49,
    startDate: new Date(2026, 8, 28),
    endDate: new Date(2026, 9, 2),
    title: "Training on Pre-Marriage Counseling",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: PMC,
    colorId: 7,
  },
  {
    id: 50,
    startDate: new Date(2026, 9, 5),
    endDate: new Date(2026, 9, 9),
    title: "Training on Special Drug Education Center for LGU Implementers",
    description: "The training aims to equip LGU multidisciplinary teams with the knowledge, competencies, and standards necessary to establish, operationalize, and sustain a functional Special Drug Education Center in their respective localities. Central to this objective is the guided development of a contextualized SDEC Manual of Operations, which will serve as a reference for compliance with standards, operational continuity, and readiness for accreditation and inclusion in ADAC Functionality Audits and the Seal of Good Local Governance (SGLG).",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 6,
  },
  {
    id: 51,
    startDate: new Date(2026, 9, 5),
    endDate: new Date(2026, 9, 9),
    title: "Disaster Response and Crisis Management: Child Friendly Spaces",
    description: "A training program on creating safe, child-friendly spaces during disasters to protect and support children’s safety, well-being, and recovery.",
    venue: "Local Social Welfare and Development Offices (LSWDOs)",
    tag: "",
    target: "DSWD Academy (Taguig City, National Capital Region)",
    image: Disaster,
    colorId: 1,
  },
  {
    id: 52,
    startDate: new Date(2026, 9, 19),
    endDate: new Date(2026, 9, 23),
    title: "Training on Pre-Marriage Counseling",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: PMC,
    colorId: 7,
  },
  {
    id: 53,
    startDate: new Date(2026, 9, 26),
    endDate: new Date(2026, 9, 30),
    title: "Buklod Paglaom",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 4,
  },
  {
    id: 54,
    startDate: new Date(2026, 10, 9),
    endDate: new Date(2026, 10, 13),
    title: "Training on Financial Education: Mitigating Socio-Economic Challenges of Clients through Financial Education for Social Workers",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 3,
  },
  {
    id: 55,
    startDate: new Date(2026, 5, 16),
    endDate: new Date(2026, 5, 19),
    title: "Rollout of training manual on Parenting  LGBTQ+ Residents in DSWD Centers and Residential Care Facilities: Creating a Safe, Affirming and Inclusive Environment",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 5,
  },
  {
    id: 56,
    startDate: new Date(2026, 5, 16),
    endDate: new Date(2026, 5, 19),
    title: "Trauma Informed Care  for Houseparents (TOT)",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 5,
  },
  {
    id: 57,
    startDate: new Date(2026, 5, 7),
    endDate: new Date(2026, 5, 10),
    title: "Trauma Informed Care for Houseparents (TOT)",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Houseparenting,
    colorId: 5,
  },
  {
    id: 58,
    startDate: new Date(2026, 6, 14),
    endDate: new Date(2026, 6, 17),
    title: "Life Skills Intervention Sessions for Older Children and Youth",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 5,
  },
  {
    id: 59,
    startDate: new Date(2026, 7, 4),
    endDate: new Date(2026, 7, 7),
    title: "Basic Life Support Skills Sessions",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 5,
  },
  {
    id: 60,
    startDate: new Date(2026, 8, 15),
    endDate: new Date(2026, 8, 18),
    title: "Upskilling on Houseparenting Standards for Houseparents",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Houseparenting,
    colorId: 5,
  },
  {
    id: 61,
    startDate: new Date(2026, 9, 12),
    endDate: new Date(2026, 9, 16),
    title: "Upskilling on Social Work Counseling: Counseling Competencies for Today’s Social Worker Batch 2",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Upskill,
    colorId: 5,
  },
  {
    id: 62,
    startDate: new Date(2026, 9, 19),
    endDate: new Date(2026, 9, 23),
    title: "Gender Responsive Case Management",
    description: "",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "",
    image: Random,
    colorId: 5,
  },
];
const THEME_RED = "#ee1c25";

const fullMonths = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
  }),
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.2 }
  }
};

const ExpandableDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(" ");
  const isOverLimit = words.length > 20;
  if (!isOverLimit) return <p className="text-gray-600 text-sm leading-relaxed">{text}</p>;
  const displayText = isExpanded ? text : words.slice(0, 20).join(" ") + "...";
  return (
    <div className="text-gray-600 text-sm leading-relaxed">
      <p>{displayText}
        <button onClick={() => setIsExpanded(!isExpanded)} className="ml-2 text-[#4d55d9] font-black hover:underline focus:outline-none">
          {isExpanded ? "See Less" : "See More"}
        </button>
      </p>
    </div>
  );
};

const Calendar = () => {
  const today = new Date();
  const fixedYear = 2026;
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState("calendar"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") setSelectedEvent(null); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Hard Reset: Force page 1 whenever any filter or context changes to prevent out-of-bounds errors
  useEffect(() => { 
    setCurrentPage(1); 
  }, [searchQuery, filterCategoryId, selectedMonth, view]);

  const filteredEvents = useMemo(() => {
    return exampleEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategoryId === "All" || event.colorId === parseInt(filterCategoryId);
      const matchesMonth = event.startDate.getMonth() === selectedMonth || event.endDate.getMonth() === selectedMonth;
      return matchesSearch && matchesCategory && matchesMonth;
    });
  }, [searchQuery, filterCategoryId, selectedMonth]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const currentEvents = filteredEvents.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);

  const formatDateRange = (start, end) => {
    return `${start.getDate()}-${end.getDate()} ${start.toLocaleString("en-US", { month: "short" })} ${start.getFullYear()}`;
  };

  const { firstDay, daysArray } = useMemo(() => {
    const fd = new Date(fixedYear, selectedMonth, 1).getDay();
    const dCount = new Date(fixedYear, selectedMonth + 1, 0).getDate();
    const dArray = Array.from({ length: dCount }, (_, i) => new Date(fixedYear, selectedMonth, i + 1));
    return { firstDay: fd, daysArray: dArray };
  }, [selectedMonth]);

  const renderCalendarRows = () => {
    const totalSlots = firstDay + daysArray.length;
    const numRows = Math.ceil(totalSlots / 7);
    const rows = [];
    const hasEventsThisMonth = filteredEvents.length > 0;

    for (let r = 0; r < numRows; r++) {
      const weekStartOffset = r * 7;
      const weekStartDate = new Date(fixedYear, selectedMonth, weekStartOffset - firstDay + 1);
      const weekEndDate = new Date(fixedYear, selectedMonth, weekStartOffset - firstDay + 7);
      const eventsInWeek = filteredEvents.filter(e => e.startDate <= weekEndDate && e.endDate >= weekStartDate);
      
      rows.push(
        <div key={`row-${r}`} className="relative border-b border-white/10 min-h-[120px] md:min-h-[160px] flex flex-col bg-white/5 overflow-hidden">
          <div className="grid grid-cols-7 relative z-10">
            {Array.from({ length: 7 }).map((_, i) => {
              const dayIdx = weekStartOffset + i - firstDay;
              const date = new Date(fixedYear, selectedMonth, dayIdx + 1);
              const isCurrentMonth = date.getMonth() === selectedMonth;
              const isToday = date.toDateString() === today.toDateString();
              return (
                <div key={`date-${i}`} className="p-1 md:p-3">
                  <div className={`text-xs md:text-base font-black ${isToday ? "bg-[#FFE066] text-black rounded-full w-6 h-6 md:w-9 md:h-9 flex items-center justify-center shadow-lg" : isCurrentMonth ? "text-white" : "text-white/30"}`}>{date.getDate()}</div>
                </div>
              );
            })}
          </div>
          {/* Calendar Event Container - Now using justify-center to keep bars in the middle vertically */}
          <div className="relative z-20 flex-1 flex flex-col justify-center pb-2 px-1 md:px-2 space-y-1">
            {eventsInWeek.map((event) => {
              const eventStart = event.startDate < weekStartDate ? weekStartDate : event.startDate;
              const eventEnd = event.endDate > weekEndDate ? weekEndDate : event.endDate;
              const startCol = (eventStart.getDay() % 7) + 1;
              const duration = Math.round((eventEnd - eventStart) / (1000 * 60 * 60 * 24)) + 1;
              return (
                <div key={`${event.id}-${r}`} className="grid grid-cols-7 w-full px-0.5">
                  <motion.div 
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    style={{ 
                      gridColumn: `${startCol} / span ${duration}`, 
                      backgroundColor: THEME_RED,
                      transformOrigin: "left" 
                    }} 
                    whileHover={{ scale: 1.02, filter: "brightness(1.2)" }} 
                    className="text-white text-[9px] md:text-[14px] h-5 md:h-7 flex items-center px-1 md:px-3 cursor-pointer truncate rounded md:rounded-lg border border-white/10 shadow-md font-bold" 
                    onClick={() => setSelectedEvent(event)}
                  >
                    {(event.startDate >= weekStartDate || eventStart.getDay() === 0) && event.title}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="relative">
        {rows}
        {!hasEventsThisMonth && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/20 font-black text-2xl md:text-5xl uppercase tracking-[0.3em] text-center px-4">To Be Announced</motion.span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pt-8 md:pt-16 font-sans relative min-h-screen text-slate-100 overflow-x-hidden">
      <style>{`
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #ee1c25, #9e1117); border-radius: 20px; border: 2px solid #1a1a1a; }
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px) saturate(150%); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.2); }
        .custom-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1.25rem center; background-size: 1rem; appearance: none; }
      `}</style>

      <div className="fixed inset-0 z-0" style={{ backgroundImage: `linear-gradient(to bottom, rgba(46, 49, 146, 0.8), rgba(20, 20, 20, 0.95)), url(${DABuilding})`, backgroundSize: "cover", backgroundPosition: "center" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <header className="mb-8 md:mb-12 text-center lg:text-left pt-4 md:pt-8 w-fit mx-auto lg:mx-0">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-1 text-white leading-none">DSWD ACADEMY 2026</h1>
          <p className="text-white font-bold tracking-[0.5em] md:tracking-[1.28em] text-md md:text-md uppercase flex justify-between mr-[-0.5em] md:mr-[-1.28em]">Training Calendar</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 pb-20">
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="glass-card p-2 rounded-2xl flex">
              <button onClick={() => setView("calendar")} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-black transition-all ${view === "calendar" ? "bg-white text-[#4d55d9] shadow-xl" : "text-white hover:bg-white/10"}`}><BsCalendar3/> Calendar</button>
              <button onClick={() => setView("list")} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-black transition-all ${view === "list" ? "bg-white text-[#4d55d9] shadow-xl" : "text-white hover:bg-white/10"}`}><BsListUl/> List</button>
            </div>
            
            <div className="glass-card rounded-3xl p-5">
              <p className="text-white font-black uppercase tracking-widest text-[10px] mb-3 ml-2">Monthly Index</p>
              <div className="block lg:hidden">
                <select className="custom-select w-full bg-white/10 border border-white/20 rounded-xl py-3 px-5 text-sm font-black text-white" value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
                  {fullMonths.map((name, index) => <option key={name} value={index} className="text-slate-900">{name}</option>)}
                </select>
              </div>
              <div className="hidden lg:block space-y-1.5">
                {fullMonths.map((name, index) => (
                  <button key={name} onClick={() => setSelectedMonth(index)} className={`w-full py-3 px-5 rounded-xl text-xs font-black text-left transition-all ${selectedMonth === index ? "bg-[#FFE066] text-[#4d55d9] shadow-lg scale-105" : "text-white/80 hover:bg-white/10"}`}>
                    <span className="opacity-50 mr-3">{(index + 1).toString().padStart(2, '0')}</span>{name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {view === "calendar" ? (
                <motion.div key={`calendar-${selectedMonth}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="flex justify-between items-end px-2 md:px-4">
                     <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">{fullMonths[selectedMonth]}</h2>
                     <span className="text-white/40 font-black text-xl md:text-3xl">2026</span>
                  </div>
                  <div className="grid grid-cols-7 text-center font-black text-white uppercase text-[9px] md:text-xs tracking-[0.1em] md:tracking-[0.3em] pb-3">
                    {weekdays.map(d => <div key={d}>{d}</div>)}
                  </div>
                  <div className="glass-card rounded-lg overflow-hidden shadow-2xl overflow-x-auto">
                    <div className="min-w-[600px] md:min-w-full">{renderCalendarRows()}</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={`list-${selectedMonth}-${safePage}`} initial="hidden" animate="visible" exit="exit" className="space-y-4">
                  <div className="px-2 md:px-4"><h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase">{fullMonths[selectedMonth]} Catalog</h2></div>
                  <div className="glass-card rounded-3xl p-4 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <BsSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white" />
                      <input type="text" placeholder="Search title..." className="w-full bg-black/30 border border-white/20 rounded-xl py-2.5 pl-12 text-sm text-white focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <select className="custom-select bg-black/30 border border-white/20 rounded-xl py-2.5 px-6 text-sm font-black text-white focus:outline-none md:w-64" value={filterCategoryId} onChange={(e) => setFilterCategoryId(e.target.value)}>
                      <option value="All">All Categories</option>
                      {Object.entries(trainingCategories).map(([id, label]) => <option key={id} value={id} className="text-slate-900">{label}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-4 min-h-[400px]">
                    {currentEvents.length > 0 ? currentEvents.map((event, index) => (
                      <motion.div key={event.id} custom={index} variants={cardVariants} initial="hidden" animate="visible" exit="exit" onClick={() => setSelectedEvent(event)} className="bg-white rounded-2xl p-6 md:p-5 flex flex-col md:flex-row gap-5 items-start md:items-center cursor-pointer hover:shadow-2xl transition-all border-l-[8px] md:border-l-[6px] border-[#ee1c25] shadow-lg group">
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-wrap items-center gap-3 text-[10px] font-black text-slate-500 mb-1 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><BsCalendar3 className="text-red-500"/> {formatDateRange(event.startDate, event.endDate)}</span>
                            <span className="flex items-center gap-1.5 truncate max-w-full md:max-w-[200px]"><BsGeoAltFill className="text-red-500"/> {event.venue}</span>
                          </div>
                          <h3 className="text-[#4d55d9] font-black text-xl md:text-lg leading-tight group-hover:text-red-600 transition-colors">{event.title}</h3>
                          <p className="text-[10px] font-black text-[#4d55d9] opacity-70 uppercase mt-1">{trainingCategories[event.colorId]}</p>
                        </div>
                        {(event.tag === "WITH CPD UNITS" || event.tag === "TRAINING OF TRAINERS") && <span className="bg-[#ee1c25] text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest whitespace-nowrap">{event.tag}</span>}
                      </motion.div>
                    )) : (
                      <div className="py-20 text-center glass-card rounded-3xl text-white font-black text-xl tracking-widest uppercase">No Events Found</div>
                    )}
                  </div>

                  {filteredEvents.length > itemsPerPage && (
                    <div className="flex items-center justify-center gap-6 pt-6 text-white font-black uppercase text-sm">
                      <button disabled={safePage <= 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="flex items-center gap-2 hover:text-[#FFE066] disabled:opacity-30 transition-all"><BsChevronLeft strokeWidth={2}/> Prev</button>
                      <span className="bg-white/10 px-4 py-1 rounded-full text-xs">{safePage} / {totalPages}</span>
                      <button disabled={safePage >= totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="flex items-center gap-2 hover:text-[#FFE066] disabled:opacity-30 transition-all">Next <BsChevronRight strokeWidth={2}/></button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4" onClick={() => setSelectedEvent(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative text-slate-900 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="h-40 md:h-52 relative">
                {selectedEvent.image && <img src={selectedEvent.image} className="w-full h-full object-cover rounded-t-[2rem]" alt="" />}
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white rounded-full p-2 hover:bg-red-600 transition-all"><IoClose size={24} /></button>
              </div>
              <div className="px-6 md:px-10 py-6 md:py-8">
                <span className="text-[#4d55d9] font-black text-[10px] tracking-[0.2em] uppercase mb-2 block opacity-70">{trainingCategories[selectedEvent.colorId]}</span>
                <h2 className="text-xl md:text-2xl font-black mb-6 leading-tight">{selectedEvent.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <div className="bg-red-50 p-2.5 rounded-xl"><BsCalendar3 className="text-red-500" size={16}/></div>
                    <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Schedule</p><p className="text-xs font-bold text-slate-800">{formatDateRange(selectedEvent.startDate, selectedEvent.endDate)}</p></div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <div className="bg-blue-50 p-2.5 rounded-xl"><BsGeoAltFill className="text-[#4d55d9]" size={16}/></div>
                    <div className="min-w-0"><p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Venue</p><p className="text-xs font-bold text-slate-800 truncate">{selectedEvent.venue}</p></div>
                  </div>
                </div>
                <div className="mb-8"><p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">Description</p><div className="bg-slate-50/50 p-4 rounded-2xl text-sm leading-relaxed"><ExpandableDescription text={selectedEvent.description} /></div></div>
                <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                  <div className="bg-indigo-50 p-3 rounded-2xl shrink-0"><BsPeopleFill size={22} className="text-[#4d55d9]"/></div>
                  <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target Group</p><p className="text-xs font-bold text-slate-700">{selectedEvent.target}</p></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;