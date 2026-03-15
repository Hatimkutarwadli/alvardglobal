import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import tshirtImg from "@/assets/product-tshirt.jpg";
import poloImg from "@/assets/product-polo.jpg";
import vestImg from "@/assets/product-vest.jpg";

const products = [
    {
        title: "Premium T-Shirts",
        description: "Crafted from the finest cotton, our t-shirts combine comfort with durability for everyday luxury.",
        image: tshirtImg,
        tag: "Bestseller",
    },
    {
        title: "Polo Collection",
        description: "Soft, breathable fabric with impeccable tailoring — elegance meets functionality.",
        image: poloImg,
        tag: "New Arrival",
    },
    {
        title: "Classic Vests",
        description: "Designed for layered comfort, meeting international export standards with premium materials.",
        image: vestImg,
        tag: "Essential",
    },
];

const ProductsSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section id="products" className="py-24 md:py-40 bg-card">
            <div className="section-padding max-w-7xl mx-auto">
                <div ref={ref} className={`mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <p className="text-body text-sm tracking-[0.3em] uppercase text-primary mb-4">Our Products</p>
                    <h2 className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                        Precision in Every
                        <br />
                        <span className="italic font-normal">Stitch</span>
                    </h2>
                    <div className="accent-line mt-6" />
                </div>

                {/* Asymmetric grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                    {products.map((product, i) => (
                        <ProductCard key={product.title} product={product} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
    const { ref, isVisible } = useScrollAnimation(0.1);

    const colSpan = index === 0 ? "md:col-span-7" : index === 1 ? "md:col-span-5" : "md:col-span-12";
    const aspect = index === 2 ? "aspect-[21/9]" : "aspect-[3/4] md:aspect-[4/5]";

    return (
        <div
            ref={ref}
            className={`${colSpan} group relative overflow-hidden cursor-pointer transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
            style={{ transitionDelay: `${index * 200}ms` }}
        >
            <div className={`relative overflow-hidden ${aspect}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />

                {/* Tag */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                    <span className="text-body text-[10px] tracking-[0.3em] uppercase font-medium bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5">
                        {product.tag}
                    </span>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-foreground/80 to-transparent">
                    <h3 className="text-display text-xl md:text-2xl font-bold text-primary-foreground">{product.title}</h3>
                    <p className="text-body text-sm text-primary-foreground/80 mt-2 max-w-md">{product.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductsSection;
