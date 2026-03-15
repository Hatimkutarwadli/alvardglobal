/// <reference types="vite/client" />
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Instagram, ArrowRight } from "lucide-react";

interface InstagramItem {
    id: string;
    media_type: number;
    code: string;
    caption?: { text: string };
    image_versions2?: { candidates: { url: string }[] };
}

const InstagramSection = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const carouselRef = useRef<HTMLDivElement>(null);
    const [reels, setReels] = useState<InstagramItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInstagramFeed = async () => {
            try {
                // Ensure your VITE_RAPIDAPI_KEY is perfectly defined in .env
                // If you have a specific user_id, you can define VITE_INSTAGRAM_USER_ID or replace YOUR_USER_ID directly.
                const userId = import.meta.env.VITE_INSTAGRAM_USER_ID || "YOUR_USER_ID";
                const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

                if (!apiKey) {
                    throw new Error("Missing RapidAPI Key in .env");
                }

                const response = await fetch(`https://instagram-best-experience.p.rapidapi.com/feed?user_id=${userId}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': 'instagram-best-experience.p.rapidapi.com',
                        'x-rapidapi-key': apiKey
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch Instagram feed");
                }

                const data = await response.json();
                
                // Assuming the RapidAPI response wraps items in 'data.items' or directly 'items'
                const itemsArray = data.items || (data.data && data.data.items) || [];

                // Filter for Reels/Videos (media_type === 2) and take the first 7
                const filteredReels = itemsArray
                    .filter((item: InstagramItem) => item.media_type === 2)
                    .slice(0, 7);

                setReels(filteredReels);
            } catch (err: any) {
                console.error("Instagram fetch error:", err);
                setError(err.message || "Could not load feed");
            } finally {
                setLoading(false);
            }
        };

        fetchInstagramFeed();
    }, []);

    return (
        <section className="py-24 md:py-32 bg-[#FDFBF7] dark:bg-card overflow-hidden">
            <div className="section-padding max-w-7xl mx-auto">
                <div 
                    ref={headerRef} 
                    className={`flex flex-col md:flex-row md:items-end justify-between mb-16 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Instagram className="h-5 w-5 text-primary" />
                            <p className="text-body text-sm tracking-[0.3em] uppercase text-primary font-medium">Follow Our Story</p>
                        </div>
                        <h2 className="text-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
                            Brand in <span className="italic font-normal">Motion</span>
                        </h2>
                        <div className="accent-line mt-6" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col justify-center items-center h-96 text-center">
                        <p className="text-muted-foreground mb-4">Temporarily unable to load Instagram feed.</p>
                        <p className="text-sm text-foreground/50">({error})</p>
                    </div>
                ) : reels.length === 0 ? (
                    <div className="flex justify-center items-center h-96 text-center">
                        <p className="text-muted-foreground">No recent reels found.</p>
                    </div>
                ) : (
                    <div className="relative -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
                        <motion.div 
                            ref={carouselRef}
                            className="flex cursor-grab active:cursor-grabbing overflow-x-auto pb-10 hide-scrollbar"
                            drag="x"
                            dragConstraints={carouselRef}
                            style={{ paddingRight: "10vw" }}
                        >
                            <div className="flex gap-6 md:gap-8 flex-nowrap w-max">
                                {reels.map((item, index) => {
                                    const imgUrl = item.image_versions2?.candidates?.[0]?.url;
                                    const caption = item.caption?.text || "Al-Vard Premium Export";
                                    const link = `https://www.instagram.com/reels/${item.code}/`;

                                    return (
                                        <motion.a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            key={item.id}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                            className="group relative flex-shrink-0 w-[240px] md:w-[300px] aspect-[9/16] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
                                        >
                                            {imgUrl ? (
                                                <img 
                                                    src={imgUrl} 
                                                    alt={caption.slice(0, 50)} 
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                    draggable={false}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                                    <Instagram className="h-10 w-10 text-muted-foreground opacity-30" />
                                                </div>
                                            )}
                                            
                                            {/* Luxury dark gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                                            
                                            {/* Hover caption reveal */}
                                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end h-full">
                                                <div className="bg-background/20 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                                                    <p className="text-white text-sm line-clamp-3 leading-relaxed font-body">
                                                        {caption}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Always visible icon before hover */}
                                            <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-300">
                                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                                                    <Instagram className="h-5 w-5 text-white" />
                                                </div>
                                            </div>
                                        </motion.a>
                                    );
                                })}

                                {/* "View on Instagram" End Card */}
                                <motion.a
                                    href="https://www.instagram.com/" // Replace with actual profile URL if known
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: reels.length * 0.1 }}
                                    className="flex-shrink-0 w-[240px] md:w-[300px] aspect-[9/16] rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all duration-500 group"
                                >
                                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <ArrowRight className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="text-center font-display text-xl text-foreground font-medium px-6">
                                        View on Instagram
                                    </div>
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </section>
    );
};

export default InstagramSection;
