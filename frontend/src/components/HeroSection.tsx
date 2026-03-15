import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/hero-factory.jpg";

const HeroSection = () => {
    const [loaded, setLoaded] = useState(false);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, 300]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);
    const scale = useTransform(scrollY, [0, 800], [1, 1.15]);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <section id="hero" className="relative h-screen overflow-hidden">
            {/* Parallax background */}
            <motion.div className="absolute inset-0" style={{ y, scale }}>
                <img
                    src={heroImg}
                    alt="Alvard Global Trade manufacturing facility"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Overlay */}
            <div className="hero-overlay" />

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col justify-end h-full section-padding pb-16 md:pb-24"
                style={{ opacity }}
            >
                <div className="max-w-4xl">
                    <div
                        className={`transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="accent-line mb-6" />
                        <p className="text-body text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4">
                            Since 1996 · Tirupur, India
                        </p>
                    </div>

                    <h1
                        className={`text-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-foreground transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                            }`}
                    >
                        From Yarn
                        <br />
                        <span className="italic font-normal text-primary">to the World</span>
                    </h1>

                    <p
                        className={`text-body text-base md:text-lg text-muted-foreground mt-6 md:mt-8 max-w-lg leading-relaxed transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        Premium garment manufacturing with 25+ years of excellence.
                        From premium yarns to precision stitching.
                    </p>

                    <div
                        className={`mt-8 md:mt-10 flex gap-4 transition-all duration-1000 delay-900 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <button
                            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                            className="bg-primary text-primary-foreground px-8 py-3.5 text-body text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity"
                        >
                            Explore
                        </button>
                        <button
                            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                            className="border border-border text-foreground px-8 py-3.5 text-body text-sm tracking-widest uppercase font-medium hover:bg-secondary transition-colors"
                        >
                            Our Story
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                <span className="text-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Scroll</span>
                <div className="w-[1px] h-8 bg-primary/40 relative overflow-hidden">
                    <div className="w-full h-3 bg-primary animate-[marquee_2s_ease-in-out_infinite] absolute" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
