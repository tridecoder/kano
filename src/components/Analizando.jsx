import { useState, useEffect } from 'react'

const MENSAJES = [
  'Rebobinando la cinta...',
  'Consultando los archivos...',
  'Calculando tu era...',
]

function Analizando({ onListo }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % MENSAJES.length)
    }, 600)

    const timeout = setTimeout(onListo, 1800)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="analizando">
      <p className="analizando__texto" key={idx}>{MENSAJES[idx]}</p>
      <div className="analizando__barra" />
    </div>
  )
}

export default Analizando
