"use client";

import { useState } from "react";

type HoverGifButtonProps = {
    src: string;
    stillSrc: string;
    alt?: string;
    active?: boolean;
    onClick?: () => void;
};

export default function HoverGifButton({
    src,
    stillSrc,
    alt = "Toggle detail links",
    active = false,
    onClick,
}: HoverGifButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            type="button"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            aria-pressed={active}
            aria-label={alt}
            className="relative flex items-center justify-center rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 hover:cursor-help"
        >
            <img
                src={isHovered ? src : stillSrc}
                alt=""
                className="h-7 w-7 object-contain"
            />
        </button>
    );
}