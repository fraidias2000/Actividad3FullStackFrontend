import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  BookOpen,      // icono de libro
  Sparkles,      // icono de brillos
  Truck,         // icono de camión
  ShieldCheck,   // icono de escudo
  ArrowRight,    // flecha derecha
  Star,          // estrella
} from "lucide-react";
import "./LandingPage.css";
import heroImage from "../../assets/imagen_relatos_papel__hero_landing_page.png";
import ImageBackground from "../../assets/imagen_relatos_papel__background_landing_page.png";


/**Iconos cartas */
const features = [
  {
    icon: BookOpen,
    title: "Diseño Sin Distracciones",
    desc: "Una interfaz limpia y minimalista para ayudar al cliente a encontrar su libro de una forma fácil.",
    variant: "indigo",
  },
  {
    icon: Truck,
    title: "Envíos Gratuitos",
    desc: "Recibe tus libros favoritos en la puerta de tu casa sin costo adicional en pedidos sobre 20€.",
    variant: "green",
  },
  {
    icon: ShieldCheck,
    title: "Compra 100% Segura",
    desc: "Proceso de pago encriptado y garantizado. Tu información y tus datos están siempre protegidos.",
    variant: "amber",
  },
];

export function Landing() {


     

  return (
    /**Contenedor principal */
    <div className="landing"> 
    
      <section className="landing-hero">
       
        <div className="landing-container landing-hero-grid">
          {/**Otorga animaciones al recargar la pagina */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="landing-hero-content"
          >
            <div className="landing-badge">
              <Sparkles className="landing-icon-sm" />
              <span>Tu próxima historia te espera</span>
            </div>

            <h1 className="landing-title">
              Descubre tu libro entre más de <span>200 ejemplares </span>diferentes.
            </h1>

            <p className="landing-text landing-hero-text">
              Contamos con un gran catálogo de libros tanto en formato físico como digital para que tu única preocupación sea leer.
            </p>

            {/**Boton para explorar el catalogo */}
            <div className="landing-actions">
              <Link to="/catalogo" className="landing-btn landing-btn-primary">
                    Explorar Catálogo
                <ArrowRight className="landing-icon-md" />
              </Link>

              <Link to="/chat" className="landing-btn landing-btn-secondary">
                Hablar con el asistente
                <ArrowRight className="landing-icon-md" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="landing-hero-image-wrapper"
          >
            {/**Imagen que aparece a la derecha de un hombre leyendo */}
            <div className="landing-hero-image ">
              <img
                src={heroImage}
                alt="Relatos de papel"
              />
            </div>

            {/**Cartel solapado +10000 lectores satisfechos */}
            <div className="landing-floating-card">
              <div className="landing-floating-icon">
                <Star className="landing-icon-lg" />
              </div>
              <div>
                <p className="landing-floating-number">+10,000</p>
                <p className="landing-floating-text">Lectores satisfechos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/**Texto mitad pagina centrado ¿Por que elegir Relatos de Papel?*/}
      <section id="features" className="landing-section landing-container">
        {/**3 cartas*/}
        <div className="landing-features-grid">
          
          {features.map((feature, idx) => (
            /*Hace una animación al cargar la página y luego se encoge al pasar el raton por encima*/ 
           <motion.article 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 0.97 }}
              viewport={{ once: true }}
              transition={{
                opacity: { delay: idx * 0.1, duration: 0.4 },
                y: { delay: idx * 0.1, duration: 0.4 },
                scale: { duration: 0.2 },
              }}
              className="landing-feature-card"
            >
              <div className={`landing-feature-icon landing-feature-icon-${feature.variant}`}>
                <feature.icon className="landing-icon-xl" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>
  
      {/**Card Listo para tu proxima aventura*/}
      <section className="landing-section landing-container">
        <div className="landing-cta">
          <div className="landing-cta-bg">
            <img
              src={ImageBackground}
              alt="Image Background"
            />
          </div>
          <div className="landing-cta-content">
            <h2>¿Por qué elegir Relatos de Papel?</h2>
            <p>
              Somos una empresa con más de 10 años en el sector y contamos con más de 20 géneros diferentes de relatos para cualquier tipo de lector.
            </p>
            <Link to="/catalogo" className="landing-btn landing-btn-cta">
              Ir al catálogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
