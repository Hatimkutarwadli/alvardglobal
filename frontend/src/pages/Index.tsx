import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import JourneySection from "@/components/JourneySection";
import InstagramSection from "@/components/InstagramSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <HeroSection />
            <MarqueeBanner />
            <AboutSection />
            <ProductsSection />
            <JourneySection />
            <InstagramSection />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default Index;
