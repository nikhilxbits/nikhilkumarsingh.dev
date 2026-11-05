import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBuilding,
    IconMailCheck,
    IconMapPin,
    IconPhoneCall
} from "@tabler/icons-react";

import { getFormattedPhoneNumber } from "@/lib/phone-number";
import type { Author, OverviewItem, SocialLink, SocialProfiles } from "./types";

const AUTHOR_INFO: Author = {
    firstName: "Nikhil Kumar",
    lastName: "Singh",
    displayName: "Nikhil Kumar Singh",
    username: "nikhilxbits",
    gender: "male",
    pronouns: "he/him",
    currentDesignation: "Full Stack MERN Developer",
    currentCompany: "Infonic Solutions",
    bio: "Building applications that are maintainable and less chaotic than JavaScript usually wants them to be.",
    typewriterSentences: [
        "Full Stack MERN Developer",
        "React Native Developer",
        "React.js Frontend Developer",
        "Senior Node.js Backend Developer",
        "JavaScript/TypeScript Developer",
        "UI/UX Designer"
    ],
    email: process.env.USER_EMAIL || "you@example.com",
    phoneNumber: getFormattedPhoneNumber(process.env.USER_PHONE_NUMBER || "+919876543210"),
    address: "Jaipur, Rajasthan, India 302012",
    website: "https://nikhilkumarsingh.vercel.app",
    keywords: [
        "nikhilkumarsingh",
        "nikhil kumar singh",
        "nikhilxbits",
        "nikhilsingh",
        "nikhil singh",
        "full stack mern developer",
        "mern stack developer",
        "reactjs developer",
        "nodejs backend developer",
        "javascript/typescript developer",
        "ui/ux designer"
    ]
};

const SOCIAL_PROFILES: SocialProfiles = {
    github: {
        title: "GitHub",
        icon: IconBrandGithub,
        handle: AUTHOR_INFO.username,
        href: `https://github.com/${AUTHOR_INFO.username}`
    },
    linkedin: {
        title: "LinkedIn",
        icon: IconBrandLinkedin,
        handle: `in/${AUTHOR_INFO.username}`,
        href: `https://www.linkedin.com/in/${AUTHOR_INFO.username}`
    }
};

const SOCIAL_LINKS: SocialLink[] = Object.values(SOCIAL_PROFILES);

const OVERVIEW: OverviewItem[] = [
    { type: "common", icon: IconBuilding, label: `${AUTHOR_INFO.currentDesignation} at ${AUTHOR_INFO.currentCompany}` },
    { type: "email-address", icon: IconMailCheck, label: AUTHOR_INFO.email, href: `mailto:${AUTHOR_INFO.email}` },
    {
        type: "phone-number",
        icon: IconPhoneCall,
        label: AUTHOR_INFO.phoneNumber.phoneNumber,
        href: AUTHOR_INFO.phoneNumber.uri
    },
    { type: "common", icon: IconMapPin, label: AUTHOR_INFO.address }
];

export { AUTHOR_INFO, SOCIAL_PROFILES, SOCIAL_LINKS, OVERVIEW };
