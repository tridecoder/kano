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

  const maxPuntos = Math.max(...Object.values(puntos))
  const empates = Object.entries(puntos)
    .filter(([, v]) => v === maxPuntos)
    .map(([k]) => k)

  if (empates.length === 1) return empates[0]

  // En caso de empate, gana la era del último voto emitido
  for (let i = respuestas.length - 1; i >= 0; i--) {
    if (empates.includes(respuestas[i])) return respuestas[i]
  }
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