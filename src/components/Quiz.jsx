import { useEffect } from 'react'

const LETRAS = ['A', 'B', 'C', 'D']

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
              <button className="quiz__opcion" onClick={() => onResponder(opcion.era)}>
                <span className="quiz__letra">{LETRAS[i]}</span>
                {opcion.texto}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Quiz
