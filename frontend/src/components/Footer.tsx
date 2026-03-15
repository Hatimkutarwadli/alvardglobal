const Footer = () => (
    <footer className="py-12 section-padding border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <span className="text-display text-lg font-bold tracking-wider text-foreground">ALVARD</span>
                <span className="text-body text-xs tracking-[0.2em] uppercase text-muted-foreground ml-3">Global Trade</span>
            </div>
            <p className="text-body text-xs text-muted-foreground tracking-wider">
                © {new Date().getFullYear()} Alvard Global Trade. All rights reserved.
            </p>
        </div>
    </footer>
);

export default Footer;
