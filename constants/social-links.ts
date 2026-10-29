import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

import { AUTHOR_INFO } from "./author";

export const SOCIAL_LINKS = {
    github: { icon: IconBrandGithub, handle: AUTHOR_INFO.username, href: `https://github.com/${AUTHOR_INFO.username}` },
    linkedin: {
        icon: IconBrandLinkedin,
        handle: `in/${AUTHOR_INFO.username}`,
        href: `https://www.linkedin.com/in/${AUTHOR_INFO.username}`
    }
};
