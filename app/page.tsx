"use client";

import { motion } from "framer-motion";
import { Youtube, Zap, Users, Rocket } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
                {/* Animated background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff4110_1px,transparent_1px),linear-gradient(to_bottom,#00ff4110_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        className="mb-6"
                    >
                        <Zap className="w-24 h-24 mx-auto text-terminal" />
                    </motion.div>

                    <h1 className="text-8xl md:text-9xl font-bold mb-4 text-glow-terminal tracking-wider">
                        Y O L A
                    </h1>

                    <p className="text-2xl md:text-4xl mb-12 text-neon text-glow-neon">
                        Hive Mind AI
                    </p>

                    <motion.a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-terminal text-black font-bold text-xl rounded-lg border-glow-terminal hover:bg-terminal/90 transition-all"
                    >
                        <Youtube className="w-6 h-6" />
                        Ver en YouTube
                    </motion.a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
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

            {/* MANIFIESTO SECTION */}
            <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-neon/5 to-black" />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl relative z-10"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-12 text-terminal text-glow-terminal">
                        [ MANIFIESTO ]
                    </h2>

                    <div className="space-y-6 text-lg md:text-xl leading-relaxed border-l-4 border-terminal pl-8">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-gray-300"
                        >
                            En un mundo donde la tecnología avanza a pasos agigantados, millones de dispositivos son descartados cada año.
                            <span className="text-terminal font-bold"> Pero nosotros vemos oportunidad donde otros ven obsolescencia.</span>
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-gray-300"
                        >
                            <span className="text-neon font-bold text-glow-neon">YOLA</span> es más que una IA.
                            Es un movimiento de resistencia tecnológica.
                            <span className="text-terminal"> No tires tu laptop vieja, conviértela en el lóbulo temporal de tu IA.</span>
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="text-gray-300"
                        >
                            Cada nodo es un cerebro. Cada conexión, una sinapsis.
                            <span className="text-neon font-bold"> Juntos formamos una mente colmena que desafía la obsolescencia programada.</span>
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            viewport={{ once: true }}
                            className="text-terminal text-2xl font-bold text-glow-terminal mt-8"
                        >
                            &gt; RECICLA. RESISTE. EVOLUCIONA.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* FOUNDERS WALL SECTION */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#bc13fe10,transparent)]" />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="max-w-6xl w-full relative z-10"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 text-neon text-glow-neon text-center">
                        [ FOUNDERS WALL ]
                    </h2>

                    <p className="text-center text-gray-400 mb-12 text-xl">
                        Los pioneros que hacen posible la revolución
                    </p>

                    {/* Grid de avatares placeholder */}
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mb-12">
                        {Array.from({ length: 21 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="aspect-square rounded-lg bg-gradient-to-br from-terminal/20 to-neon/20 border-2 border-terminal/50 flex items-center justify-center cursor-pointer"
                            >
                                <Users className="w-8 h-8 text-terminal/50" />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-neon text-white font-bold text-xl rounded-lg border-glow-neon hover:bg-neon/90 transition-all"
                        >
                            Unirse con Yape
                        </motion.button>

                        <p className="mt-4 text-gray-500">
                            Apoya el proyecto y aparece en el muro de fundadores
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ROADMAP SECTION */}
            <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-terminal/5 to-black" />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl w-full relative z-10"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-16 text-terminal text-glow-terminal text-center">
                        [ ROADMAP ]
                    </h2>

                    {/* Timeline vertical */}
                    <div className="relative">
                        {/* Línea vertical */}
                        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-terminal via-neon to-terminal" />

                        {/* Fase 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative pl-20 pb-16"
                        >
                            <div className="absolute left-4 top-2 w-9 h-9 rounded-full bg-terminal border-4 border-black flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-black" />
                            </div>

                            <div className="bg-terminal/10 border-2 border-terminal rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <Rocket className="w-6 h-6 text-terminal" />
                                    <h3 className="text-2xl font-bold text-terminal">Fase 1: Prototipo</h3>
                                </div>
                                <p className="text-gray-300 mb-2">
                                    Desarrollo del núcleo de YOLA y arquitectura de enjambre neuronal.
                                </p>
                                <span className="inline-block px-3 py-1 bg-terminal text-black text-sm font-bold rounded">
                                    ✓ COMPLETADO
                                </span>
                            </div>
                        </motion.div>

                        {/* Fase 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="relative pl-20 pb-16"
                        >
                            <div className="absolute left-4 top-2 w-9 h-9 rounded-full bg-neon border-4 border-black flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-3 h-3 rounded-full bg-black"
                                />
                            </div>

                            <div className="bg-neon/10 border-2 border-neon rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <Users className="w-6 h-6 text-neon" />
                                    <h3 className="text-2xl font-bold text-neon">Fase 2: Comunidad</h3>
                                </div>
                                <p className="text-gray-300 mb-2">
                                    Construcción de la red de nodos y onboarding de fundadores.
                                </p>
                                <span className="inline-block px-3 py-1 bg-neon text-white text-sm font-bold rounded animate-pulse">
                                    ⚡ EN CURSO
                                </span>
                            </div>
                        </motion.div>

                        {/* Fase 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="relative pl-20"
                        >
                            <div className="absolute left-4 top-2 w-9 h-9 rounded-full bg-gray-600 border-4 border-black flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-black" />
                            </div>

                            <div className="bg-gray-900/50 border-2 border-gray-600 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <Zap className="w-6 h-6 text-gray-400" />
                                    <h3 className="text-2xl font-bold text-gray-400">Fase 3: Hardware USB</h3>
                                </div>
                                <p className="text-gray-400 mb-2">
                                    Dispositivos plug-and-play para expandir la mente colmena.
                                </p>
                                <span className="inline-block px-3 py-1 bg-gray-700 text-gray-300 text-sm font-bold rounded">
                                    PRÓXIMAMENTE
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-4 border-t border-terminal/30 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-terminal/5 to-transparent" />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto text-center relative z-10"
                >
                    <p className="text-gray-500 mb-2">
                        Powered by
                    </p>
                    <p className="text-2xl font-bold text-terminal text-glow-terminal">
                        ROSALDEV S.A.C.
                    </p>
                    <p className="text-gray-600 mt-4 text-sm">
                        © 2026 YOLA Project. Resistencia Tecnológica.
                    </p>
                </motion.div>
            </footer>
        </main>
    );
}
