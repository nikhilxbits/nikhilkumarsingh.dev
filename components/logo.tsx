import NextLink from "next/link";
import Image from "next/image";

import { assets } from "@/assets";
import { AUTHOR_INFO } from "@/features/author/constants";

import { Link } from "./ui/link";

export function Logo() {
    return (
        <Link asChild className="justify-center font-semibold hover:no-underline">
            <NextLink href="/" aria-label={AUTHOR_INFO.displayName}>
                <Image
                    src={assets.ProfilePic}
                    alt={AUTHOR_INFO.displayName}
                    width={64}
                    height={64}
                    loading="eager"
                    className="size-8 rounded-full object-cover"
                />
                <div className="flex grow flex-col justify-center gap-0.5">
                    <span className="leading-none">{AUTHOR_INFO.displayName.replaceAll(" ", "")}.</span>
                    <span className="text-muted-foreground text-xs leading-none font-medium">
                        {AUTHOR_INFO.username}
                    </span>
                </div>
            </NextLink>
        </Link>
    );
}
