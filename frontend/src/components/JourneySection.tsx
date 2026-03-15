import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const milestones = [
    { year: "1996", title: "The Beginning", description: "Mrs. Fatema Burhani founds Al-Vard Collection with a vision for quality garments." },
    { year: "2005", title: "Factory Expansion", description: "Established our state-of-the-art manufacturing facility in Tirupur, India." },
    { year: "2012", title: "Global Exports", description: "Expanded white-labeling services to 30+ countries worldwide." },
    { year: "2020", title: "Vertical Integration", description: "Achieved full yarn-to-garment production capability in-house." },
    { year: "2025", title: "The Future", description: "Continuing to set new standards in premium garment manufacturing." },
];

const JourneySection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

    const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

    return (
        <section id="journey" ref={containerRef} className="py-24 md:py-40 section-padding">
            <div className="max-w-4xl mx-auto">
                <div ref={titleRef} className={`mb-20 transition-all duration-1000 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <p className="text-body text-sm tracking-[0.3em] uppercase text-primary mb-4">Our Journey</p>
                    <h2 className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                        25 Years of
                        <br />
                        <span className="italic font-normal">Craftsmanship</span>
                    </h2>
                    <div className="accent-line mt-6" />
                </div>

                <div className="relative">
                    {/* Animated line */}
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-border">
                        <motion.div
                            className="w-full bg-primary origin-top"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Milestones */}
                    <div className="space-y-16 md:space-y-24">
                        {milestones.map((m, i) => (
                            <MilestoneItem key={m.year} milestone={m} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

function MilestoneItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
    const { ref, isVisible } = useScrollAnimation(0.2);

    return (
        <div
            ref={ref}
            className={`pl-12 md:pl-20 relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {/* Dot */}
            <div className={`absolute left-[11px] md:left-[27px] top-1 w-3 h-3 rounded-full border-2 transition-colors duration-500 ${isVisible ? "bg-primary border-primary" : "bg-background border-border"
                }`} />

            <span className="text-display text-2xl md:text-4xl font-bold text-primary">{milestone.year}</span>
            <h3 className="text-display text-lg md:text-xl font-semibold text-foreground mt-2">{milestone.title}</h3>
            <p className="text-body text-sm md:text-base text-muted-foreground mt-2 leading-relaxed max-w-lg">
                {milestone.description}
            </p>
        </div>
    );
}

export default JourneySection;
