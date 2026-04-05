import { useEffect, useRef } from "preact/hooks";

interface AutoCarouselProps {
    items: string[];
    speed?: number; // lower is faster for CSS animation, or duration in ms
}

export default function AutoCarousel({ items, speed = 20 }: AutoCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // If no items, show nothing
    if (!items || items.length === 0) return null;

    // Double the items for seamless looping
    const displayItems = [...items, ...items];

    return (
        <div class="overflow-hidden w-full py-10 relative">
            <div
                ref={scrollRef}
                class="flex gap-8 whitespace-nowrap animate-scroll"
                style={{
                    width: 'max-content',
                    animationDuration: `${speed}s`,
                }}
            >
                {displayItems.map((item, i) => (
                    <div
                        key={i}
                        class="flex-shrink-0 w-[280px] h-[580px] rounded-3xl overflow-hidden border border-charcoal-light/20 bg-charcoal-dark/5 shadow-2xl transition-transform hover:scale-105 duration-500"
                    >
                        <img
                            src={item}
                            alt={`App Screenshot ${i + 1}`}
                            class="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Fades on sides */}
            <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none"></div>
            <div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none"></div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
