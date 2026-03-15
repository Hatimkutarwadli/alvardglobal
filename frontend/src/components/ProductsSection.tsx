import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import mensCover from "@/assets/mens-brochure-cover.png";
import kidsCover from "@/assets/kids-brochure-cover.png";
import womensCover from "@/assets/womens-brochure-cover.png";

const brochures = [
    {
        title: "Men's Collection",
        description: "Explore our full range of premium men's garments — from classic tees to refined polo shirts and beyond.",
        image: mensCover,
        tag: "Men's Brochure",
        link: "https://drive.google.com/file/d/1g51qYgQ54uR3uOlg5s-ojbMgsbSyvvLD/view?usp=sharing",
        accent: "#C9A96E",
    },
    {
        title: "Kid's Collection",
        description: "Soft, safe, and stylish. Our children's range is crafted with care for little ones worldwide.",
        image: kidsCover,
        tag: "Kid's Brochure",
        link: "https://drive.google.com/file/d/1uAEQP0Q7mRfKAYfxxzKIepcDKpcSQ0C5/view?usp=sharing",
        accent: "#FFB347",
    },
    {
        title: "Women's Collection",
        description: "Elegant, contemporary women's wear crafted with precision and designed for the global export market.",
        image: womensCover,
        tag: "Women's Brochure",
        link: "https://drive.google.com/file/d/1Ijze-zYnkQQt-UAc3di60lIVwjUv1OSO/view?usp=sharing",
        accent: "#E06C9F",
    },
];

const ProductsSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section id="products" className="py-24 md:py-40 bg-card overflow-hidden">
            <div className="section-padding max-w-7xl mx-auto">
                <div
                    ref={ref}
                    className={`mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <p className="text-body text-sm tracking-[0.3em] uppercase text-primary mb-4">Our Brochures</p>
                    <h2 className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                        Browse Our
                        <br />
                        <span className="italic font-normal">Collections</span>
                    </h2>
                    <div className="accent-line mt-6" />
                    <p className="text-body text-base md:text-lg text-muted-foreground mt-6 max-w-2xl">
                        Download our product brochures to explore the full range of premium garments crafted in Tirupur for the global export market.
                    </p>
                </div>

                {/* Brochure Cards in equal row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {brochures.map((brochure, i) => (
                        <BrochureCard key={brochure.title} brochure={brochure} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

function BrochureCard({ brochure, index }: { brochure: typeof brochures[0]; index: number }) {
    const ref = useRef(null);
    const isVisible = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.a
            ref={ref}
            href={brochure.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 60 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-500"
            style={{ textDecoration: "none" }}
        >
            {/* Book Cover Image */}
            <div className="relative overflow-hidden aspect-[3/4]">
                <img
                    src={brochure.image}
                    alt={brochure.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500" />

                {/* Hover shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />

                {/* Tag pill */}
                <div className="absolute top-4 left-4">
                    <span
                        className="text-[10px] tracking-[0.25em] uppercase font-semibold px-3 py-1.5 rounded-full backdrop-blur-md text-white"
                        style={{ backgroundColor: `${brochure.accent}55`, border: `1px solid ${brochure.accent}` }}
                    >
                        {brochure.tag}
                    </span>
                </div>

                {/* Bottom content panel */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-display text-2xl font-bold text-white mb-2">{brochure.title}</h3>
                    <p className="text-sm text-white/75 leading-relaxed mb-5">{brochure.description}</p>

                    {/* Download CTA button */}
                    <div
                        className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all duration-300 group-hover:gap-4"
                        style={{ color: brochure.accent }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Brochure
                    </div>
                </div>
            </div>

            {/* Animated bottom accent bar */}
            <div
                className="h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
                style={{ backgroundColor: brochure.accent }}
            />
        </motion.a>
    );
}

export default ProductsSection;
