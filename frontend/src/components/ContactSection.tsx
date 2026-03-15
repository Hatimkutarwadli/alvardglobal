import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, MapPin, Phone } from "lucide-react";

const contactItems = [
    { icon: Mail, title: "Email", detail: "info@alvardglobaltrade.com", href: "mailto:info@alvardglobaltrade.com" },
    { icon: MapPin, title: "Location", detail: "Tirupur, Tamil Nadu, India", href: "#" },
    { icon: Phone, title: "Phone", detail: "+91 Contact Us", href: "#" },
];

function ContactCard({ item, index }: { item: typeof contactItems[0]; index: number }) {
    const { ref, isVisible } = useScrollAnimation(0.1);
    const Icon = item.icon;
    return (
        <div
            ref={ref}
            className={`group p-8 border border-border hover:border-primary transition-all duration-700 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            style={{ transitionDelay: `${index * 150}ms` }}
            onClick={() => item.href !== "#" && window.open(item.href)}
        >
            <Icon size={24} className="text-primary mb-4" />
            <h3 className="text-display text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="text-body text-sm text-muted-foreground mt-2">{item.detail}</p>
        </div>
    );
}

const ContactSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section id="contact" className="py-24 md:py-40 bg-card">
            <div className="section-padding max-w-5xl mx-auto">
                <div ref={ref} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <p className="text-body text-sm tracking-[0.3em] uppercase text-primary mb-4">Get in Touch</p>
                    <h2 className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                        Let's Work
                        <br />
                        <span className="italic font-normal">Together</span>
                    </h2>
                    <div className="accent-line mt-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
                    {contactItems.map((item, i) => (
                        <ContactCard key={item.title} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
