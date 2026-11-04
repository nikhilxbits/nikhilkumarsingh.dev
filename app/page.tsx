import { Introduction } from "@/features/author/introduction";
import { Magnify } from "@/features/author/magnify";

export default function LandingPage() {
    return (
        <main className="flex grow flex-col">
            <Magnify />
            <Introduction />
        </main>
    );
}
