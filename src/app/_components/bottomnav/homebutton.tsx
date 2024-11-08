"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HomeButton() {
    const currentPath = usePathname();
    return (
        <Link
            href="/"
            className={`flex h-full w-1/3 flex-col items-center space-y-1 ${currentPath === "/" ? "text-accent-2" : "text-foreground"}`}
        >
            <div className="flex items-center justify-center">
                <Home size={28} />
            </div>
            <span className="text-xs font-normal">Home</span>
        </Link>
    );
}
