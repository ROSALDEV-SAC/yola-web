"use client";

import { motion, useInView } from "framer-motion";
import { Youtube, MessageCircle, Cpu, Laptop, Tablet, ArrowRight, Check, Zap, Users, Rocket, Gift } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Typewriter Hook
function useTypewriter(text: string, speed: number = 100) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return displayText;
}

// Fade In Up Animation Component
function FadeInUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay }}
        >
            {children}
        </motion.div>
    );
}

export default function Home() {
    const typewriterText = useTypewriter("Inteligencia de Enjambre. Local. Resiliente.", 80);

    return (
        <main className="min-h-screen bg-black text-white">
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center"
                >
                    {/* Glitch Title */}
                    <div className="relative mb-8">
                        <h1 className="text-[8rem] md:text-[12rem] font-bold font-mono tracking-wider text-terminal relative">
                            YOLA
                            {/* Glitch layers */}
                            <span className="absolute inset-0 text-neon opacity-70 animate-pulse" style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}>
                                YOLA
                            </span>
                            <span className="absolute inset-0 text-red-500 opacity-50" style={{ clipPath: "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)", transform: "translateX(2px)" }}>
                                YOLA
                            </span>
                        </h1>
                    </div>

                    {/* Typewriter Subtitle */}
                    <p className="text-xl md:text-3xl mb-12 h-12 font-sans text-gray-300">
                        {typewriterText}
                        <span className="animate-pulse">|</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.a
                            href="LINK_YOUTUBE"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-terminal text-black font-bold text-lg rounded-lg shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:shadow-[0_0_30px_rgba(0,255,65,0.8)] transition-all"
                        >
                            <Youtube className="w-6 h-6" />
                            Ver el Documental
                        </motion.a>

                        <motion.a
                            href="https://discord.gg/ZNZ4GhZPa3"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-black transition-all"
                        >
                            <MessageCircle className="w-6 h-6" />
                            Unirse al Discord
                        </motion.a>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-terminal rounded-full flex items-start justify-center p-2"
                    >
                        <div className="w-1 h-2 bg-terminal rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* LA ARQUITECTURA */}
            <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-terminal/5 to-black" />

                <div className="max-w-6xl w-full relative z-10">
                    <FadeInUp>
                        <h2 className="text-5xl md:text-6xl font-bold font-mono mb-4 text-terminal text-center">
                            [ LA ARQUITECTURA ]
                        </h2>
                        <p className="text-center text-gray-400 text-xl mb-16">
                            Tu hardware viejo no es basura. Es un nodo.
                        </p>
                    </FadeInUp>

                    {/* Visual Diagram */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* PC Gamer - Cerebro */}
                        <FadeInUp delay={0.2}>
                            <div className="bg-gradient-to-br from-terminal/20 to-transparent border-2 border-terminal rounded-xl p-8 text-center hover:scale-105 transition-transform">
                                <div className="w-20 h-20 mx-auto mb-4 bg-terminal/20 rounded-full flex items-center justify-center">
                                    <Cpu className="w-12 h-12 text-terminal" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-terminal">PC Gamer</h3>
                                <p className="text-gray-400 mb-2">El Cerebro</p>
                                <p className="text-sm text-gray-500">Procesamiento principal e inferencia de IA</p>
                            </div>
                        </FadeInUp>

                        {/* Laptop Vieja - Voz */}
                        <FadeInUp delay={0.4}>
                            <div className="bg-gradient-to-br from-neon/20 to-transparent border-2 border-neon rounded-xl p-8 text-center hover:scale-105 transition-transform">
                                <div className="w-20 h-20 mx-auto mb-4 bg-neon/20 rounded-full flex items-center justify-center">
                                    <Laptop className="w-12 h-12 text-neon" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-neon">Laptop Vieja</h3>
                                <p className="text-gray-400 mb-2">La Voz</p>
                                <p className="text-sm text-gray-500">TTS, respaldo con batería, modo búnker</p>
                            </div>
                        </FadeInUp>

                        {/* Tablet - Cuerpo */}
                        <FadeInUp delay={0.6}>
                            <div className="bg-gradient-to-br from-blue-500/20 to-transparent border-2 border-blue-500 rounded-xl p-8 text-center hover:scale-105 transition-transform">
                                <div className="w-20 h-20 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                                    <Tablet className="w-12 h-12 text-blue-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-blue-500">Tablet/Móvil</h3>
                                <p className="text-gray-400 mb-2">El Cuerpo</p>
                                <p className="text-sm text-gray-500">Interfaz visual, control remoto, portabilidad</p>
                            </div>
                        </FadeInUp>
                    </div>

                    {/* Connection Lines (Visual) */}
                    <FadeInUp delay={0.8}>
                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center gap-4 text-gray-500">
                                <div className="w-16 h-1 bg-gradient-to-r from-terminal to-neon" />
                                <ArrowRight className="w-6 h-6" />
                                <div className="w-16 h-1 bg-gradient-to-r from-neon to-blue-500" />
                                <ArrowRight className="w-6 h-6" />
                                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-terminal" />
                            </div>
                            <p className="mt-4 text-gray-400">Comunicación UDP local. Sin nube. Sin latencia.</p>
                        </div>
                    </FadeInUp>
                </div>
            </section>

            {/* MURO DE LOS FUNDADORES */}
            <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#bc13fe10,transparent)]" />

                <div className="max-w-6xl w-full relative z-10">
                    <FadeInUp>
                        <h2 className="text-5xl md:text-6xl font-bold font-mono mb-4 text-neon text-center">
                            [ ARQUITECTOS DE LA COLMENA ]
                        </h2>
                        <p className="text-center text-gray-400 text-xl mb-16">
                            Los pioneros que hacen posible la revolución
                        </p>
                    </FadeInUp>

                    {/* Founders Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { name: "Usuario Pionero", role: "Fundador #001" },
                            { name: "Arquitecto Alpha", role: "Fundador #002" },
                            { name: "Nodo Genesis", role: "Fundador #003" },
                            { name: "Resistencia Uno", role: "Fundador #004" },
                        ].map((founder, i) => (
                            <FadeInUp key={i} delay={i * 0.1}>
                                <div className="bg-gradient-to-br from-terminal/10 to-neon/10 border-2 border-terminal/50 rounded-lg p-6 text-center hover:border-terminal hover:scale-105 transition-all">
                                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-terminal/30 to-neon/30 rounded-full flex items-center justify-center">
                                        <Users className="w-12 h-12 text-terminal" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{founder.name}</h3>
                                    <p className="text-sm text-gray-500">{founder.role}</p>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>

                    {/* CTA de Pago */}
                    <FadeInUp delay={0.5}>
                        <div className="bg-gradient-to-r from-neon/20 to-terminal/20 border-2 border-neon rounded-xl p-8 text-center">
                            <Gift className="w-16 h-16 mx-auto mb-4 text-neon" />
                            <h3 className="text-3xl font-bold mb-4 text-neon">¿Quieres aparecer aquí?</h3>
                            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                Apoya el proyecto y tu nombre quedará inmortalizado en el código de esta web para siempre.
                                Además, obtendrás acceso anticipado al Core y rol especial en Discord.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-neon text-white font-bold text-xl rounded-lg shadow-[0_0_20px_rgba(188,19,254,0.5)] hover:shadow-[0_0_30px_rgba(188,19,254,0.8)] transition-all"
                            >
                                Donar con Yape
                            </motion.button>
                        </div>
                    </FadeInUp>
                </div>
            </section>

            {/* ROADMAP */}
            <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-terminal/5 to-black" />

                <div className="max-w-4xl w-full relative z-10">
                    <FadeInUp>
                        <h2 className="text-5xl md:text-6xl font-bold font-mono mb-16 text-terminal text-center">
                            [ ROADMAP ]
                        </h2>
                    </FadeInUp>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-terminal via-neon to-gray-600" />

                        {/* Hito 1 - Completado */}
                        <FadeInUp delay={0.2}>
                            <div className="relative pl-20 pb-12">
                                <div className="absolute left-4 top-2 w-9 h-9 rounded-full bg-terminal border-4 border-black flex items-center justify-center">
                                    <Check className="w-5 h-5 text-black" />
                                </div>
                                <div className="bg-terminal/10 border-2 border-terminal rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Zap className="w-6 h-6 text-terminal" />
                                        <h3 className="text-2xl font-bold text-terminal">Nacimiento del Core</h3>
                                    </div>
                                    <p className="text-gray-400 line-through">Arquitectura de enjambre distribuido implementada</p>
                                </div>
                            </div>
                        </FadeInUp>

                        {/* Hito 2 - Completado */}
                        <FadeInUp delay={0.3}>
                            <div className="relative pl-20 pb-12">
                                <div className="absolute left-4 top-2 w-9 h-9 rounded-full bg-terminal border-4 border-black flex items-center justify-center">
                                    <Check className="w-5 h-5 text-black" />
                                </div>
                                <div className="bg-terminal/10 border-2 border-terminal rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Laptop className="w-6 h-6 text-terminal" />
                                        <h3 className="text-2xl font-bold text-terminal">Fusión Linux/Windows</h3>
                                    </div>
                                    <p className="text-gray-400 line-through">Compatibilidad multiplataforma lograda</p>
                                </div>
                            </div>
                        </FadeInUp>

                        {/* Hito 3 - Actual */}
                        <FadeInUp delay={0.4}>
                            <div className="relative pl-20 pb-12">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute left-4 top-2 w-9 h-9 rounded-full bg-neon border-4 border-black flex items-center justify-center"
                                >
                                    <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                                </motion.div>
                                <div className="bg-neon/10 border-2 border-neon rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Users className="w-6 h-6 text-neon" />
                                        <h3 className="text-2xl font-bold text-neon">Lanzamiento de Comunidad</h3>
                                    </div>
                                    <p className="text-gray-300">Construcción del ecosistema y onboarding de fundadores</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-neon text-white text-sm font-bold rounded animate-pulse">
                                        EN CURSO
                                    </span>
                                </div>
                            </div>
                        </FadeInUp>

                        {/* Hito 4 - Futuro */}
                        <FadeInUp delay={0.5}>
                            <div className="relative pl-20 pb-12">
                                <div className="absolute left-4 top-2 w-9 h-9 rounded-full bg-gray-600 border-4 border-black" />
                                <div className="bg-gray-900/50 border-2 border-gray-600 rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Rocket className="w-6 h-6 text-gray-400" />
                                        <h3 className="text-2xl font-bold text-gray-400">Yola USB Kit</h3>
                                    </div>
                                    <p className="text-gray-500">Hardware plug-and-play para expandir nodos</p>
                                </div>
                            </div>
                        </FadeInUp>

                        {/* Hito 5 - Futuro */}
                        <FadeInUp delay={0.6}>
                            <div className="relative pl-20">
                                <div className="absolute left-4 top-2 w-9 h-9 rounded-full bg-gray-600 border-4 border-black" />
                                <div className="bg-gray-900/50 border-2 border-gray-600 rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Zap className="w-6 h-6 text-gray-400" />
                                        <h3 className="text-2xl font-bold text-gray-400">Open Source Release</h3>
                                    </div>
                                    <p className="text-gray-500">Liberación completa del código fuente</p>
                                </div>
                            </div>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-4 border-t border-terminal/30 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-terminal/5 to-transparent" />

                <FadeInUp>
                    <div className="max-w-6xl mx-auto text-center relative z-10">
                        <p className="text-gray-500 mb-2">
                            Hecho con <span className="text-neon">Vibe Coding</span> por
                        </p>
                        <p className="text-2xl font-bold text-terminal mb-6">
                            ROSALDEV S.A.C.
                        </p>

                        {/* Social Links */}
                        <div className="flex justify-center gap-6 mb-6">
                            <a href="LINK_YOUTUBE" className="text-gray-400 hover:text-terminal transition-colors">
                                <Youtube className="w-6 h-6" />
                            </a>
                            <a href="LINK_DISCORD" className="text-gray-400 hover:text-neon transition-colors">
                                <MessageCircle className="w-6 h-6" />
                            </a>
                        </div>

                        <p className="text-gray-600 text-sm">
                            © 2026 YOLA Project. Resistencia Tecnológica.
                        </p>
                    </div>
                </FadeInUp>
            </footer>
        </main>
    );
}
