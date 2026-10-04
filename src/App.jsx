import Navbar from "./componentes/Navbar"
import Hero from "./componentes/Hero"
import CardsCentrais from "./componentes/CardsCentrais"
import Redes from "./componentes/Redes"
import Cursos from "./componentes/Cursos"
import ComoFunciona from "./componentes/ComoFunciona"
import Comunidade from "./componentes/Comunidade"
import Eventos from "./componentes/Eventos"
import Depoimentos from "./componentes/Depoimentos"


function App() {
  return(
    <main className='min-h-screen bg-bg font-sans text-fg'>
      <Navbar />
      <Hero />
      <CardsCentrais />
      <Redes />
      <Cursos />
      <ComoFunciona />
      <Comunidade />
      <Eventos />
      <Depoimentos />
    </main>
  )
}

export default App
