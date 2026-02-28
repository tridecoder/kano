import ShareCard from './ShareCard'

function Result({ resultado, onReiniciar }) {
  const url = window.location.href
  const texto = `Soy del ${resultado.era} de jenesaispop. ${resultado.titulo}. ¿Y tú? 🎵`

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
        <a
          href="https://jenesaispop.com/foros"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-foros"
        >
          Coméntalo en los foros
        </a>
        <button className="btn-repetir" onClick={onReiniciar}>Repetir el test</button>
      </div>
    </div>
  )
}

export default Result
