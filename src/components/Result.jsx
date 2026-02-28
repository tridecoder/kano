import { useState, useEffect } from 'react'
import ShareCard from './ShareCard'

function Result({ resultado, breakdown, onReiniciar }) {
  const [barrasAnimadas, setBarrasAnimadas] = useState(false)
  const url = window.location.href
  const texto = `Soy del ${resultado.era} de jenesaispop. ${resultado.titulo}. ¿Y tú? 🎵`

  useEffect(() => {
    const t = setTimeout(() => setBarrasAnimadas(true), 100)
    return () => clearTimeout(t)
  }, [])

  async function handleCompartirNativo() {
    try {
      await navigator.share({ title: '¿De qué año eres?', text: texto, url })
    } catch {
      // usuario canceló o no soportado
    }
  }

  function handleTwitter() {
    const tweet = encodeURIComponent(`${texto} ${url}`)
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank')
  }

  function handleWhatsapp() {
    const msg = encodeURIComponent(`${texto} ${url}`)
    window.open(`https://wa.me/?text=${msg}`, '_blank')
  }

  async function handleCopiar() {
    await navigator.clipboard.writeText(`${texto} ${url}`)
    alert('¡Enlace copiado!')
  }

  const tieneShareNativo = !!navigator.share

  return (
    <div className="result">
      <div className="result__header" style={{ backgroundColor: resultado.color }}>
        <p className="result__era">{resultado.era}</p>
        <h1>{resultado.titulo}</h1>
      </div>

      <p className="result__descripcion">{resultado.descripcion}</p>

      {breakdown && (
        <div className="result__breakdown">
          <p className="result__breakdown-titulo">Cómo te repartes</p>
          <ul className="breakdown__lista">
            {breakdown.map((item) => (
              <li key={item.key} className="breakdown__item">
                <div className="breakdown__cabecera">
                  <span className="breakdown__era">{item.era}</span>
                  <span className="breakdown__porcentaje">{item.porcentaje}%</span>
                </div>
                <div className="breakdown__barra-wrap">
                  <div
                    className="breakdown__barra-fill"
                    style={{
                      backgroundColor: item.color,
                      width: barrasAnimadas ? `${item.porcentaje}%` : '0%',
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="result__discos-titulo">Los discos de tu era</p>
      <ul className="result__discos">
        {resultado.discos.map((disco, i) => (
          <li key={i}>{disco}</li>
        ))}
      </ul>

      <ShareCard resultado={resultado} />

      <div className="result__compartir">
        <p className="result__compartir-titulo">¿Coincide con lo que esperabas? Compártelo</p>
        <div className="result__compartir-botones">
          {tieneShareNativo && (
            <button className="btn-share btn-share--nativo" onClick={handleCompartirNativo}>
              Compartir
            </button>
          )}
          <button className="btn-share btn-share--twitter" onClick={handleTwitter}>
            Twitter / X
          </button>
          <button className="btn-share btn-share--whatsapp" onClick={handleWhatsapp}>
            WhatsApp
          </button>
          {!tieneShareNativo && (
            <button className="btn-share btn-share--copiar" onClick={handleCopiar}>
              Copiar enlace
            </button>
          )}
        </div>
      </div>

      <div className="result__acciones">
        <button className="btn-repetir" onClick={onReiniciar}>Repetir el test</button>
      </div>
    </div>
  )
}

export default Result
