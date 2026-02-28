const LOGO_URL = 'https://jenesaispop.com/wp-content/uploads/2021/02/jnsp-540-retina.png'

function cargarLogo() {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = LOGO_URL
  })
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  let line = ''
  let currentY = y
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY)
      line = words[n] + ' '
      currentY += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line.trim(), x, currentY)
  return currentY
}

function ShareCard({ resultado }) {
  async function generarCanvas() {
    await document.fonts.ready
    const logo = await cargarLogo()

    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1080
    const ctx = canvas.getContext('2d')

    // Fondo
    ctx.fillStyle = resultado.color
    ctx.fillRect(0, 0, 1080, 1080)

    // Comilla decorativa
    ctx.font = 'bold 580px "PT Sans", sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.1)'
    ctx.fillText('"', 680, 940)

    // Logo (badge con fondo rojo propio)
    if (logo) {
      const h = 52
      const w = (logo.naturalWidth / logo.naturalHeight) * h
      ctx.drawImage(logo, 64, 60, w, h)
    }

    // Tag top right
    ctx.font = 'bold 22px "PT Sans", sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.textAlign = 'right'
    ctx.fillText('¿DE QUÉ AÑO ERES?', 1016, 100)
    ctx.textAlign = 'left'

    // Era
    ctx.font = 'bold 26px "PT Sans", sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.fillText(resultado.era.toUpperCase(), 64, 460)

    // Título con "Soy" en vez de "Eres"
    const titulo = resultado.titulo.replace(/^Eres/, 'Soy')
    ctx.font = 'bold 82px "PT Sans", sans-serif'
    ctx.fillStyle = '#ffffff'
    const titleY = wrapText(ctx, titulo, 64, 560, 920, 96)

    // Descripción
    ctx.font = '400 30px "PT Sans", sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.75)'
    wrapText(ctx, resultado.descripcion, 64, titleY + 72, 820, 44)

    // URL
    ctx.font = 'bold 24px "PT Sans", sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.fillText('JENESAISPOP.COM', 64, 1024)

    return canvas
  }

  async function handleCompartir() {
    const canvas = await generarCanvas()
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    const file = new File([blob], `jenesaispop-${resultado.era}.png`, { type: 'image/png' })

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: '¿De qué año eres? — jenesaispop' })
    } else {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `jenesaispop-${resultado.era}.png`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const tituloCompartir = resultado.titulo.replace(/^Eres/, 'Soy')

  return (
    <div className="sharecard-wrap">
      <div className="sharecard" style={{ backgroundColor: resultado.color }}>
        <div className="sharecard__top">
          <img src={LOGO_URL} className="sharecard__logo-img" alt="jenesaispop" />
          <span className="sharecard__tag">¿De qué año eres?</span>
        </div>
        <div className="sharecard__centro">
          <p className="sharecard__era">{resultado.era}</p>
          <h2 className="sharecard__titulo">{tituloCompartir}</h2>
        </div>
        <div className="sharecard__bottom">
          <span className="sharecard__descripcion">{resultado.descripcion}</span>
          <span className="sharecard__url">jenesaispop.com</span>
        </div>
      </div>
      <button className="btn-descargar" onClick={handleCompartir}>
        Compartir imagen
      </button>
    </div>
  )
}

export default ShareCard
