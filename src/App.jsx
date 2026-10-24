import TechBackground from "./componentes/TechBackground"
import Navbar from "./componentes/Navbar"
import Hero from "./componentes/Hero"
import CardsCentrais from "./componentes/CardsCentrais"
import Redes from "./componentes/Redes"
import Cursos from "./componentes/Cursos"
import ComoFunciona from "./componentes/ComoFunciona"
import Comunidade from "./componentes/Comunidade"
import Eventos from "./componentes/Eventos"
import Depoimentos from "./componentes/Depoimentos"
import CtaForm from "./componentes/CtaForm"
import Footer from "./Footer"


function App() {
  return(
    <main className='min-h-screen pt-20 font-sans text-fg'>
      <Navbar />
      <div className="px-4 md:px-6 lg:px-12">
        <TechBackground />
        <Hero />
        <CardsCentrais />
        <Redes />
        <Cursos />
        <ComoFunciona />
        <Comunidade />
        <Eventos />
        <Depoimentos />
        <CtaForm />
        <Footer />
      </div>
    </main>
  )
}

export default App
