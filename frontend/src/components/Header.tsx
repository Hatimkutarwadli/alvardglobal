import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

interface HeaderProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const navItems = ["About", "Products", "Journey", "Contact"];

const Header = ({ theme, toggleTheme }: HeaderProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
                    : "bg-transparent"
                }`}
        >
            <div className="section-padding flex items-center justify-between h-16 md:h-20">
                <button onClick={() => scrollTo("hero")} className="text-display text-xl md:text-2xl font-bold tracking-wider text-foreground">
                    ALVARD
                </button>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollTo(item.toLowerCase())}
                            className="text-body text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </button>
                </nav>

                {/* Mobile controls */}
                <div className="flex md:hidden items-center gap-3">
                    <button onClick={toggleTheme} className="p-2 text-muted-foreground" aria-label="Toggle theme">
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </button>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-foreground" aria-label="Menu">
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
                    <nav className="flex flex-col section-padding py-6 gap-5">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollTo(item.toLowerCase())}
                                className="text-body text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors text-left"
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
