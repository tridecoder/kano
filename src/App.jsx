import { useState, useCallback, useMemo } from 'react'
import { questions } from './data/questions'
import { profiles } from './data/profiles'
import Intro from './components/Intro'
import Quiz from './components/Quiz'
import Analizando from './components/Analizando'
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
  const preguntasBarajadas = useMemo(() => {
    function shuffle(arr) {
      const result = [...arr]
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
      }
      return result
    }
    return questions.map(q => ({ ...q, opciones: shuffle(q.opciones) }))
  }, [])

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

    if (nuevasRespuestas.length === preguntasBarajadas.length) {
      const eraGanadora = calcularResultado(nuevasRespuestas)
      setResultado(profiles[eraGanadora])
      cambiarPantalla('analizando')
    }
  }

  const handleAnalizandoListo = useCallback(() => {
    cambiarPantalla('result')
  }, [cambiarPantalla])

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
            questions={preguntasBarajadas}
            respuestaActual={respuestas.length}
            onResponder={handleResponder}
          />
        )}
        {pantalla === 'analizando' && (
          <Analizando onListo={handleAnalizandoListo} />
        )}
        {pantalla === 'result' && resultado && (
          <Result resultado={resultado} onReiniciar={handleReiniciar} />
        )}
      </div>
    </div>
  )
}

export default App
