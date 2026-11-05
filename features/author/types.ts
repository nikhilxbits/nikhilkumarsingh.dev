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
    email?: string;
    phoneNumber?: GetFormattedPhoneNumber;
    address: string;
    website: string;
    keywords: string[];
};

type SocialLink = { title: string; icon: Icon; handle: string; href: string };

type SocialProfiles = Record<string, SocialLink>;

type OverviewCommonItem = { type: "common"; icon: Icon; label: string };

type OverviewLinkItem = { type: "email-address" | "phone-number"; icon: Icon; label: string; href: string };

type OverviewItem = OverviewCommonItem | OverviewLinkItem;

export type { Author, SocialLink, SocialProfiles, OverviewItem };
