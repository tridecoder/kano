import { useEffect } from 'react'

const LETRAS = ['A', 'B', 'C', 'D']

function TiltButton({ className, onClick, children }) {
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    e.currentTarget.style.transform = `perspective(600px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) translateY(-4px)`
  }

  function handleMouseLeave(e) {
    e.currentTarget.style.transform = ''
  }

  return (
    <button
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}

function Quiz({ questions, respuestaActual, onResponder }) {
  const pregunta = questions[respuestaActual]
  if (!pregunta) return null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [respuestaActual])

  const progreso = (respuestaActual / questions.length) * 100

  return (
    <div className="quiz">
      <div className="quiz__cabecera">
        <div className="quiz__numero-wrap">
          <span className="quiz__numero">
            {String(respuestaActual + 1).padStart(2, '0')}
          </span>
          <span className="quiz__total">de {questions.length}</span>
        </div>
        <div className="quiz__barra-wrap">
          <div className="quiz__barra">
            <div className="quiz__barra-fill" style={{ width: `${progreso}%` }} />
          </div>
          <span className="quiz__de">Pregunta {respuestaActual + 1} de {questions.length}</span>
        </div>
      </div>

      <div className="quiz__contenido" key={respuestaActual}>
        <h2>{pregunta.pregunta}</h2>
        <ul className="quiz__opciones">
          {pregunta.opciones.map((opcion, i) => (
            <li key={i}>
              <TiltButton
                className="quiz__opcion"
                onClick={() => onResponder(opcion.era)}
              >
                <span className="quiz__letra">{LETRAS[i]}</span>
                {opcion.texto}
              </TiltButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Quiz
