import { useState } from 'react'                                                                                                                                                                                   
import { questions } from './data/questions'
import { profiles } from './data/profiles'                                                                                                                                                                         
import Intro from './components/Intro'                    
import Quiz from './components/Quiz'
import Result from './components/Result'
import './App.css'

function calcularResultado(respuestas) {
  const puntos = {}
  respuestas.forEach((era) => {
    puntos[era] = (puntos[era] || 0) + 1
  })
  return Object.entries(puntos).sort((a, b) => b[1] - a[1])[0][0]
}

function App() {
  const [pantalla, setPantalla] = useState('intro') // 'intro' | 'quiz' | 'result'
  const [respuestas, setRespuestas] = useState([])
  const [resultado, setResultado] = useState(null)

  function handleEmpezar() {
    setPantalla('quiz')
  }

  function handleResponder(era) {
    const nuevasRespuestas = [...respuestas, era]
    setRespuestas(nuevasRespuestas)

    if (nuevasRespuestas.length === questions.length) {
      const eraGanadora = calcularResultado(nuevasRespuestas)
      setResultado(profiles[eraGanadora])
      setPantalla('result')
    }
  }

  function handleReiniciar() {
    setRespuestas([])
    setResultado(null)
    setPantalla('intro')
  }

  return (
    <div className="app">
      {pantalla === 'intro' && (
        <Intro onEmpezar={handleEmpezar} />
      )}
      {pantalla === 'quiz' && (
        <Quiz
          questions={questions}
          respuestaActual={respuestas.length}
          onResponder={handleResponder}
        />
      )}
      {pantalla === 'result' && (
        <Result resultado={resultado} onReiniciar={handleReiniciar} />
      )}
    </div>
  )
}

export default App