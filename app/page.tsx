import { Introduction } from "@/features/author/introduction";
import { Magnify } from "@/features/author/magnify";
import { OverviewGrid } from "@/features/author/overview-grid";

export default function LandingPage() {
    return (
        <main className="flex grow flex-col">
            <Magnify />
            <Introduction />
            <OverviewGrid />
        </main>
    );
}
