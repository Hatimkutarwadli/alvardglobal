import logoImg from "@/assets/logo.png";

const Footer = () => (
    <footer className="py-12 section-padding border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
                <img src={logoImg} alt="Al-Vard Logo" className="h-6 w-auto object-contain grayscale opacity-70" />
                <div>
                    <span className="text-display text-lg font-bold tracking-wider text-foreground">AL-VARD</span>
                    <span className="text-body text-xs tracking-[0.2em] uppercase text-muted-foreground ml-3">Global Trade</span>
                </div>
            </div>
            <p className="text-body text-xs text-muted-foreground tracking-wider">
                © {new Date().getFullYear()} Alvard Global Trade. All rights reserved.
            </p>
        </div>
    </footer>
);

export default Footer;
