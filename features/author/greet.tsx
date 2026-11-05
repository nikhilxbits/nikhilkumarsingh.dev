"use client";

import { startTransition, useEffect, useState } from "react";

import { Flipper } from "@/components/ui/flipper";
import { getGreetingText } from "@/lib/greeting-text";
import { getFormattedTime } from "@/lib/get-formatted-time";

function Greet() {
    const [time, setTime] = useState<string>("00:00:00");

    useEffect(() => {
        const interval = setInterval(() => {
            startTransition(() => setTime(getFormattedTime()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <p className="text-xs/5 font-medium uppercase">{getGreetingText()}!</p>
            <Flipper text={time} className="text-xs" />
        </>
    );
}

function GreetFallback() {
    return <p className="text-xs/5 font-medium uppercase">Hi There!</p>;
}

export { Greet, GreetFallback };
