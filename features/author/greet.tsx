"use client";

import { useMemo } from "react";

import { getGreetingText } from "@/lib/greeting-text";

function Greet() {
    const time = useMemo(() => {
        const now = new Date();

        let hours = now.getHours();

        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds() < 30 ? "00" : "30";
        const timezoneOffset = -now.getTimezoneOffset();
        const timezoneSign = timezoneOffset >= 0 ? "+" : "-";

        const timezoneHours = Math.floor(Math.abs(timezoneOffset) / 60)
            .toString()
            .padStart(2, "0");

        const timezoneMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, "0");
        const timezone = `UTC${timezoneSign}${timezoneHours}:${timezoneMinutes}`;
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${timezone} ${hours.toString().padStart(2, "0")}:${minutes}:${seconds} ${meridiem}`;
    }, []);

    return (
        <>
            <p className="text-xs/5 font-medium uppercase">{getGreetingText()}!</p>
            <p className="text-xs/5">{time}</p>
        </>
    );
}

function GreetFallback() {
    return <p className="text-xs/5 font-medium uppercase">Hi There!</p>;
}

export { Greet, GreetFallback };
