import '@google/model-viewer';
import '../styles/styleLanding.css';
import { Navbar } from '../components/navbar/navbar';
import { FeatureCard } from '../components/FeatureCard';
import { featuresData } from '../data/features';
import { Footer } from '../components/footer/footer';



function PruebaLanding() {
     const ModelViewerTag = 'model-viewer' as any;
     return(
        <div>
            <Navbar />
            <section className="pincipal">
                <div className="p-izquierda">
                    <h1 className="encabezado">Tu Entrenador Personal en la Palma de tu Mano</h1>
                    <div className="letrasGrandes">
                        <p>Sin Gym.</p>
                        <p style={{ color: '#36E077' }}>Sin Excusas.</p>
                        <p>Sin Tiempo.</p>
                        
                    </div>
                    <div className="informacion">
                        La app de ejercicios en casa para personas con agendas imposibles. 
                        IA que genera rutinas personalizadas y un cuerpo 3D que te muestra exactamente qué músculo trabajas.
                    </div>
                    <button className="btn-p-izquierda" onClick={() => (window.location.href = 'registro.html')}>Comienza Ahora</button>
                </div>
   

                <div className="p-derecha">
                <ModelViewerTag
                    className="modelo3d"
                    src="/models/Push_Up.glb"
                    autoplay
                    animation-name="Push_Up"
                    camera-controls
                    ar
                    style={{ width: '100%', height: '500px' }}
                    />
                </div>
            </section>

            <section className="problematica">
                    <div className="col-texto">
                        <span className="subtitulo">EL PROBLEMA REAL</span>
                        <h2 className="hProblema">COLOMBIA TIENE UN PROBLEMA DE MOVIMIENTO</h2>
                        <p style={{ color: 'gray', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: '30px' }}>El trabajo remoto, las largas jornadas y la falta de espacios seguros han convertido el sedentarismo en una epidemia silenciosa.</p>
                    </div>

                    <div className="col-stats">
                        <div className="stat-item">
                            <span className="numero">90%</span>
                            <p className="inStats">de los jóvenes colombianos son físicamente inactivos según el MinSalud</p>
                            <span className="numero"> 3 de 5</span>
                            <p className="inStats">adultos tienen sobrepeso o malnutrición en el país.</p>
                            <span className="numero"> ↑72%</span>
                            <p className="inStats">aumento del trabajo remoto, reduciendo la actividad diaria</p>
                        </div>
                    </div>
            </section>

            
            <section className="funcionalidades" id="funcionalidades">
                <div className="funEncabezado">
                    <p className="pFuncionalidades">Funcionalidades</p>
                    <h2 className="h2Funcionalidades">
                        Todo lo que necesitas para ponerte en forma, sin salir de casa. Rutinas personalizadas, seguimiento de progreso y un cuerpo 3D que te muestra exactamente qué músculo trabajas.
                    </h2>
                </div>

                <div className="grid-cards">
                    {featuresData.map((item) => (
                    <FeatureCard 
                        key={item.id} 
                        numero={item.numero} 
                        titulo={item.titulo} 
                        descripcion={item.descripcion} 
                    />
                    ))}
                </div>
        
            </section>

            <section className="proceso" id="proceso">
                    <div className="procesoDiv">
                        <p>
                            proceso
                        </p>
                        <h2>
                            De cero a en forma en 4 pasos.
                        </h2>
                    </div>

                    <div className="box-pasos">
                        <div className="pasos">
                            <span className="numero-paso">01</span>
                            <h3>CREA TU PERFIL</h3>
                            <p>Ingresa tus datos, objetivos y equipo disponible. Nada mas.</p>
                        </div>
                        <div className="pasos">
                            <span className="numero-paso">02</span>
                            <h3>RECIBE TU RUTINA</h3>
                            <p>La IA genera tu rutina semanal personalizada en segundos.</p>
                        </div>    
                        <div className="pasos">
                            <span className="numero-paso">03</span>
                            <h3>ENTRENA EN CASA</h3>
                            <p>Sigue tu rutina, toca el cuerpo 3D para ver qué músculo trabajas.</p>
                        </div>   
                        <div className="pasos">
                            <span className="numero-paso">04</span>
                            <h3>CONTRUYE EL HABITO</h3>
                            <p>Racha diaria, recordatorios y gráficas para no parar nunca.</p>
                        </div>      
                    </div>
            </section>

            <section className="final">
                <div className="finalDiv">
                    <h2>¿LISTO PARA DEJAR DE POSPONER EL TIEMPO?</h2>
                    <button>COMENZAR AHORA</button>
                
                </div>
                <div className="infoFinalDiv">
                    <p>SIN TARJETA DE CRÉDITO</p>
                    <p>SIN DESCARGAR</p>
                    <p>SOLO TU NAVEGADOR</p>  
                </div>
            </section>

            <Footer />

        </div>

     )
    

}

export default PruebaLanding;