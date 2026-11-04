export function getGreetingText(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "good morning";
    if (hour >= 12 && hour < 17) return "good afternoon";
    if (hour >= 17 && hour < 21) return "good evening";

    return "hi there";
}
