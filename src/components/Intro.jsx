function Intro({ onEmpezar }) {
  return (
    <div className="intro">
      <span className="intro__tag">20 años de jenesaispop</span>
      <h1>¿De qué <em>año</em> eres?</h1>
      <p className="intro__bajada">
        Veinte años de discazos, hypes que no llegaron a nada y alguna que otra pifia memorable. ¿Con qué época te quedas?
      </p>
      <button className="btn-primario" onClick={onEmpezar}>Descúbrelo</button>
    </div>
  )
}

export default Intro
