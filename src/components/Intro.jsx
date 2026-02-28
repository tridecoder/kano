function Intro({ onEmpezar }) {
  return (
    <div className="intro">
      <span className="intro__tag">20 años de jenesaispop</span>
      <h1>¿De qué <em>año</em> eres?</h1>
      <p className="intro__bajada">
        Dos décadas de música, criterio y comunidad. Descubre en qué época de jenesaispop encaja tu forma de escuchar.
      </p>
      <button className="btn-primario" onClick={onEmpezar}>Descúbrelo</button>
    </div>
  )
}

export default Intro
