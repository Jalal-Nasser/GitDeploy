import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 py-12 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="relative w-12 h-12">
                                <Image
                                    src="/logo.png"
                                    alt="mDeploy Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="leading-tight text-start">
                                <span className="text-xl font-bold tracking-tight text-[#f959ca] drop-shadow-[0_2px_10px_rgba(249,89,202,0.6)]">mDeploy</span>
                                <span className="block text-xs font-medium text-white drop-shadow-[0_1px_5px_rgba(255,255,255,0.5)] opacity-90">Professional Deployment Services</span>
                            </div>
                        </Link>
                        <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                            Expert deployment services for your web and mobile applications. We handle the infrastructure so you can focus on the code.
                        </p>
                        <div className="mt-5">
                            <p className="text-sm font-semibold text-foreground">Connect</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="https://x.com/jalalnasser" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path d="m4 3h4.5l3.5 4.9L15.4 3H20l-6.3 8.5L20.2 21h-4.6l-4-5.2L7.2 21H3l6.5-8.8Z"></path></svg>
                                    <span>Twitter</span>
                                </a>
                                <a href="https://github.com/mDeploys" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-4 w-4" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                                    <span>GitHub</span>
                                </a>
                                <a href="https://www.behance.net/jalalnasser" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path d="M4.5 4h6.4c2.9 0 4.6 1.6 4.6 3.9 0 1.5-.9 2.7-2.1 3.2 1.6.4 2.7 1.9 2.7 3.6 0 2.6-1.8 4.3-4.9 4.3H4.5Zm3.4 7.1h2.7c1.1 0 1.9-.7 1.9-1.7s-.7-1.6-1.9-1.6H7.9Zm0 6h3.1c1.3 0 2.1-.7 2.1-1.8s-.8-1.9-2.1-1.9H7.9Zm9.5-3.2c0-2.7 2-4.7 4.6-4.7 2.8 0 4.3 1.9 4.4 4.6 0 .3 0 .7-.1 1h-6c.2 1 .9 1.6 2.1 1.6.9 0 1.6-.3 2.3-1l1.6 1.8c-.9 1-2.2 1.6-3.9 1.6-2.9 0-5-1.9-5-4.9Zm4.6-2c-1 0-1.5.7-1.7 1.4h3.4c-.1-.7-.6-1.4-1.7-1.4Zm1.3-4.8H18V6h5.1Z"></path></svg>
                                    <span>Behance</span>
                                </a>
                                <a href="https://www.linkedin.com/in/jalalnasser" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin h-4 w-4" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                    <span>LinkedIn</span>
                                </a>
                                <a href="https://jalalnasser.com" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-earth h-4 w-4" aria-hidden="true"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"></path><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path><circle cx="12" cy="12" r="10"></circle></svg>
                                    <span>Blog</span>
                                </a>
                                <a href="https://www.producthunt.com/products/passgen-4/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path d="M12 24C5.37 24 0 18.63 0 12S5.37 0 12 0s12 5.37 12 12-5.37 12-12 12zm1.6-11.8c1.32 0 2.4-1.08 2.4-2.4 0-1.32-1.08-2.4-2.4-2.4H10v9h2.4v-4.2h1.2z"></path></svg>
                                    <span>Product Hunt</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a className="text-muted-foreground hover:text-foreground" href="https://mdeploy.dev/#services">Website Deployment</a></li>
                            <li><a className="text-muted-foreground hover:text-foreground" href="https://mdeploy.dev/#services">Web Apps</a></li>
                            <li><a className="text-muted-foreground hover:text-foreground" href="https://mdeploy.dev/#services">Mobile Apps</a></li>
                            <li><a className="text-muted-foreground hover:text-foreground" href="https://mdeploy.dev/#services">Desktop Development</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a className="text-muted-foreground hover:text-foreground" href="https://mdeploy.dev/calculator">Pricing</a></li>
                            <li><a className="text-muted-foreground hover:text-foreground" href="https://mdeploy.dev/contact">Contact us</a></li>
                            <li><a className="text-muted-foreground hover:text-foreground" href="https://github.com/mDeploys/PassGen/blob/main/USER_GUIDE.md" target="_blank" rel="noopener noreferrer">Documentations</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a className="text-muted-foreground hover:text-foreground" href="https://mdeploy.dev/privacy">Privacy Policy</a></li>
                            <li><a className="text-muted-foreground hover:text-foreground" href="https://mdeploy.dev/terms">Terms of Service</a></li>
                        </ul>
                        <div className="mt-6">
                            <a href="https://www.producthunt.com/products/passgen-4/reviews/new?utm_source=badge-product_review&utm_medium=badge&utm_source=badge-passgen-4" target="_blank" rel="noopener noreferrer">
                                <img src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=1136094&theme=light" alt="PassGen - Secure Password Vault & Developer Secret Generator | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 w-full border-t border-slate-800 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 py-5 text-center text-sm text-slate-100 shadow-[0_-10px_35px_-25px_rgba(15,23,42,0.8)]">
                <div className="container mx-auto px-4 lg:px-8">
                    <p>© {new Date().getFullYear()} mDeploy. All rights reserved. · Developed by <a href="https://github.com/Jalal-Nasser" target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-300 hover:text-purple-200">Jalal Nasser</a></p>
                </div>
            </div>
        </footer>
    );
}
