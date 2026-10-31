type LicenseName =
    | "MIT"
    | "Apache-2.0"
    | "GPL-3.0"
    | "BSD-2-Clause"
    | "BSD-3-Clause"
    | "LGPL-3.0"
    | "MPL-2.0"
    | "AGPL-3.0"
    | "Unlicense"
    | "ISC"
    | "EPL-2.0"
    | "CC0-1.0";

type SourceCodeRepository = { handle: string; href: string; license: { name: LicenseName; href: string } };

type SiteInformation = { name: string; url: string; description: string; keywords: Array<string>; siteCreatedAt: Date };

type ViewportThemeColor = { dark: string; light: string };

export type { SourceCodeRepository, SiteInformation, ViewportThemeColor };
