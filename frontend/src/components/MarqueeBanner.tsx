const items = [
    "EXCLUSIVE PRODUCTS",
    "PREMIUM PACKAGING",
    "ON-TIME DELIVERY",
    "WHITE LABELING",
    "25+ YEARS EXPERIENCE",
    "GLOBAL EXPORTS",
];

const MarqueeBanner = () => (
    <div className="bg-primary text-primary-foreground py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
            {[...items, ...items].map((item, i) => (
                <span key={i} className="text-body text-xs md:text-sm tracking-[0.3em] uppercase font-medium mx-8 md:mx-12">
                    {item}
                    <span className="mx-8 md:mx-12 opacity-40">✦</span>
                </span>
            ))}
        </div>
    </div>
);

export default MarqueeBanner;
