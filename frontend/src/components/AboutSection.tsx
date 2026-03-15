import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import fabricImg from "@/assets/fabric-texture.jpg";
import factoryImg from "@/assets/factory-floor.jpg";
import ShippingGlobe from "@/components/ShippingGlobe";

const stats = [
    { numeric: 25, suffix: "+", label: "Years of Excellence" },
    { numeric: 50, suffix: "M+", label: "Garments Produced" },
    { numeric: 30, suffix: "+", label: "Countries Served" },
    { numeric: 100, suffix: "%", label: "Quality Commitment" },
];

// Animated counter component
const CountUpStat = ({
    target, suffix, isVisible, delay = 0
}: { target: number; suffix: string; isVisible: boolean; delay?: number }) => {
    const [count, setCount] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!isVisible || hasRun.current) return;
        hasRun.current = true;

        const timeout = setTimeout(() => {
            const duration = 1500; // ms
            const startTime = performance.now();

            const step = (now: number) => {
                const progress = Math.min((now - startTime) / duration, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * target));
                if (progress < 1) requestAnimationFrame(step);
                else setCount(target);
            };

            requestAnimationFrame(step);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isVisible, target, delay]);

    return <>{count}{suffix}</>;
};

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

    const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
    const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

    return (
        <section id="about" ref={sectionRef} className="py-24 md:py-40 section-padding">
            <div className="max-w-7xl mx-auto">
                {/* About header */}
                <div ref={textRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-40">
                    <div className={`transition-all duration-1000 ${textVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
                        <p className="text-body text-sm tracking-[0.3em] uppercase text-primary mb-4">About the Company</p>
                        <h2 className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground">
                            Crafting Excellence
                            <br />
                            <span className="italic font-normal">Since 1996</span>
                        </h2>
                        <div className="accent-line mt-6" />
                        <p className="text-body text-base md:text-lg text-muted-foreground mt-8 leading-relaxed">
                            Founded by Mrs. Fatema Burhani, Al-Vard Collection began with a dream to offer quality, fashionable products. Today, our factory in Tirupur specializes in premium white labeling services for global exports — from yarn to finished product.
                        </p>
                        <p className="text-body text-base md:text-lg text-muted-foreground mt-4 leading-relaxed">
                            With a relentless focus on precision and on-time delivery, we ensure every garment meets the highest international standards.
                        </p>
                    </div>

                    <div className="relative">
                        <motion.div 
                            className="overflow-hidden rounded-2xl" 
                            style={{ y: imgY }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                        >
                            <img
                                src={fabricImg}
                                alt="Textile manufacturing company interior"
                                className="w-full aspect-[4/5] object-cover"
                            />
                        </motion.div>
                        <motion.div 
                            className="absolute -bottom-8 -left-4 md:-left-8 w-2/3 border-4 border-background overflow-hidden shadow-2xl rounded-2xl"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                        >
                            <img
                                src={factoryImg}
                                alt="Alvard manufacturing floor"
                                className="w-full aspect-video object-cover"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Merged Stats and Globe Section */}
                <div className="mt-24 md:mt-32 pt-16 border-t border-border grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Stats - Left on Desktop */}
                    <div
                        ref={statsRef}
                        className="grid grid-cols-2 gap-8 md:gap-12"
                    >
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`text-center transition-all duration-700 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                                style={{ transitionDelay: `${i * 150}ms` }}
                            >
                                <div className="text-display text-4xl md:text-5xl font-bold text-primary">
                                    <CountUpStat
                                        target={stat.numeric}
                                        suffix={stat.suffix}
                                        isVisible={statsVisible}
                                        delay={i * 150}
                                    />
                                </div>
                                <div className="text-body text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground mt-2">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Globe Section - Right on Desktop */}
                    <div className="w-full flex justify-center">
                        <ShippingGlobe />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
