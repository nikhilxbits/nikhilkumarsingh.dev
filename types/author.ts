import type { Icon } from "@tabler/icons-react";

import type { GetFormattedPhoneNumber } from "@/lib/phone-number";

type Author = {
    firstName: string;
    lastName: string;
    displayName: string;
    username: string;
    gender: "male" | "female" | "other";
    pronouns: "he/him" | "she/her" | "they/them";
    currentDesignation: string;
    currentCompany: string;
    bio: string;
    typewriterSentences: string[];
    email: string;
    phoneNumber: GetFormattedPhoneNumber;
    address: string;
    website: string;
    timezone: string;
    keywords: string[];
};

type SocialLink = { title: string; icon: Icon; handle: string; href: string };

type SocialProfiles = Record<string, SocialLink>;

export type { Author, SocialLink, SocialProfiles };
