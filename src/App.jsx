import { useState, useCallback } from 'react'
import { questions } from './data/questions'
import { profiles } from './data/profiles'
import Intro from './components/Intro'
import Quiz from './components/Quiz'
import Result from './components/Result'
import './App.css'

const DURACION_TRANSICION = 280

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

  for (let i = respuestas.length - 1; i >= 0; i--) {
    if (empates.includes(respuestas[i])) return respuestas[i]
  }
}

function App() {
  const [pantalla, setPantalla] = useState('intro')
  const [visible, setVisible] = useState(true)
  const [respuestas, setRespuestas] = useState([])
  const [resultado, setResultado] = useState(null)

  const cambiarPantalla = useCallback((siguiente) => {
    setVisible(false)
    setTimeout(() => {
      setPantalla(siguiente)
      setVisible(true)
    }, DURACION_TRANSICION)
  }, [])

  function handleEmpezar() {
    cambiarPantalla('quiz')
  }

  function handleResponder(era) {
    const nuevasRespuestas = [...respuestas, era]
    setRespuestas(nuevasRespuestas)

    if (nuevasRespuestas.length === questions.length) {
      const eraGanadora = calcularResultado(nuevasRespuestas)
      setResultado(profiles[eraGanadora])
      cambiarPantalla('result')
    }
  }

  function handleReiniciar() {
    setRespuestas([])
    setResultado(null)
    cambiarPantalla('intro')
  }

  return (
    <div className="app">
      <div className={`pantalla ${visible ? 'pantalla--visible' : 'pantalla--saliendo'}`}>
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
        {pantalla === 'result' && resultado && (
          <Result resultado={resultado} onReiniciar={handleReiniciar} />
        )}
      </div>
    </div>
  )
}

export default App
