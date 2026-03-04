function Intro({ onEmpezar }) {
  return (
    <div className="intro">
      <span className="intro__tag">20 años de jenesaispop</span>
      <h1>
        <span className="intro__h1-pequeno">¿De qué época de <em className="intro__h1-jnsp">jenesaispop</em></span>
        <em className="intro__h1-eres">eres?</em>
      </h1>
      <p className="intro__bajada">
        Veinte años de discazos, hypes que no llegaron a ningún lado y alguna opinión de la que no nos arrepentimos. Responde con honestidad. Aquí todo el mundo encaja en algún sitio, aunque no donde esperabas.
      </p>
      <button className="btn-primario" onClick={onEmpezar}>Descúbrelo</button>
    </div>
  )
}

export default Intro
