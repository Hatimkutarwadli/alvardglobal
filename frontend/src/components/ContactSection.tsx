import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, MapPin, Factory, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const contactItems = [
    { icon: Mail, title: "Email", detail: "info@alvardglobaltrade.com", href: "mailto:info@alvardglobaltrade.com" },
    { icon: Factory, title: "Factory Address", detail: "Tirupur, Tamil Nadu, India", href: "https://maps.google.com/?q=Tirupur,Tamil Nadu" },
    { icon: MapPin, title: "Head Office", detail: "Mufaddal Manzil, Al-vard Collection, Safiyah Road, Opp. Ezzy Hall, Surat, Gujarat 395003", href: "#" },
    { icon: Phone, title: "Phone", detail: "+91 93749 86852", href: "tel:+919374986852" },
];

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

function ContactCard({ item, index }) {
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
    const { ref: formRef, isVisible: formIsVisible } = useScrollAnimation(0.2);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    function onSubmit(values) {
        console.log("EmailJS Attempt:", {
            serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ? "Defined" : "UNDEFINED",
            templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? "Defined" : "UNDEFINED",
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? "Defined" : "UNDEFINED",
        });

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    message: values.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                toast.success("Message sent successfully! We'll get back to you soon.");
                form.reset();
            })
            .catch((error) => {
                console.error("EmailJS Error details:", error);
                toast.error("Failed to send message. Please try again.");
            });
    }

    return (
        <section id="contact" className="py-24 md:py-40 bg-card">
            <div className="section-padding max-w-7xl mx-auto">
                <div
                    ref={ref}
                    className={`transition-all duration-1000 mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    <p className="text-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
                        Get in Touch
                    </p>
                    <h2 className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                        Let's Work
                        <br />
                        <span className="italic font-normal">Together</span>
                    </h2>
                    <div className="accent-line mt-6" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            {contactItems.map((item, i) => (
                                <ContactCard key={item.title} item={item} index={i} />
                            ))}
                        </div>
                    </div>

                    <div
                        ref={formRef}
                        className={`transition-all duration-1000 delay-300 ${formIsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                            }`}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Your Name"
                                                        {...field}
                                                        className="bg-background border-border focus:border-primary h-12"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Phone Number"
                                                        {...field}
                                                        className="bg-background border-border focus:border-primary h-12"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email Address"
                                                    {...field}
                                                    className="bg-background border-border focus:border-primary h-12"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Your Message"
                                                    {...field}
                                                    className="bg-background border-border focus:border-primary min-h-[150px] resize-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full sm:w-auto px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all group"
                                >
                                    Send Message
                                    <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>

                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;