import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { Model as MaleModel } from '../components/threeModel/Male_MuscleWiki';

function LandingPage() {
    return (
        <div className="min-h-screen bg-neutral-900 text-white selection:bg-red-500/30 overflow-x-hidden font-sans">
            {/* Header / Nav */}
            <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto relative z-30">
                <div className="text-3xl font-['Bebas_Neue'] tracking-wider italic">
                    FIT<span className="text-red-600">AI</span>3D
                </div>
                <div className="flex gap-4 md:gap-8 items-center">
                    <Link to="/login" className="text-sm font-bold uppercase tracking-widest hover:text-red-500 transition-colors">
                        Login
                    </Link>
                    <Link to="/formFill" className="bg-red-600 text-white px-6 py-2 rounded-md text-sm font-black uppercase tracking-tighter hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                        Registro
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-10 pb-20 relative">
                
                {/* Left Side: Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-20">
                    <div className="inline-block px-4 py-1 mb-6 rounded border border-red-900/30 bg-red-950/20 text-red-500 text-[10px] font-black tracking-[0.3em] uppercase">
                        Próxima Generación de Fitness
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-['Bebas_Neue'] leading-[0.9] mb-8 tracking-tight">
                        ENTRENA CON <br />
                        <span className="text-red-600">INTELIGENCIA</span> <br />
                        ANATÓMICA
                    </h1>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
                        Visualiza cada fibra muscular en 3D. Nuestra IA analiza tu selección 
                        y genera el plan de entrenamiento perfecto para tus objetivos.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link 
                            to="/rutina" 
                            className="px-10 py-4 bg-white text-black hover:bg-neutral-200 rounded font-black text-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-2 group"
                        >
                            Ir al Entrenador
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                        <Link 
                            to="/home" 
                            className="px-10 py-4 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 rounded font-black text-xl uppercase tracking-tighter transition-all flex items-center justify-center"
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* Stats / Features */}
                    <div className="mt-12 grid grid-cols-3 gap-8 border-t border-neutral-800 pt-8 w-full max-w-md">
                        <div>
                            <div className="text-2xl font-['Bebas_Neue'] text-white">100%</div>
                            <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Personalizado</div>
                        </div>
                        <div>
                            <div className="text-2xl font-['Bebas_Neue'] text-white">3D</div>
                            <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Anatómico</div>
                        </div>
                        <div>
                            <div className="text-2xl font-['Bebas_Neue'] text-white">AI</div>
                            <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Generativo</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: 3D Model */}
                <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-auto lg:h-[700px] z-10 cursor-grab active:cursor-grabbing">
                    {/* Efecto de luz detrás del modelo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
                    
                    <Suspense fallback={
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                    }>
                        <Canvas shadows camera={{ position: [0, 1.6, 4], fov: 45 }} dpr={[1, 2]}>
                            <Stage intensity={0.5} environment="city" adjustCamera={false} shadows="contact">
                                <MaleModel />
                            </Stage>
                            <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} />
                            <OrbitControls 
                                enableZoom={false} 
                                autoRotate 
                                autoRotateSpeed={0.8}
                                enablePan={false}
                                minPolarAngle={Math.PI / 2.5}
                                maxPolarAngle={Math.PI / 2}
                            />
                        </Canvas>
                    </Suspense>

                    {/* Hint */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] pointer-events-none">
                        Interactúa con el modelo
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-neutral-800 py-12 text-center text-neutral-600 text-[10px] uppercase font-bold tracking-[0.3em]">
                <p>&copy; 2026 FITAI3D &bull; Tecnología Fitness Avanzada</p>
            </footer>
        </div>
    );
}

export default LandingPage;