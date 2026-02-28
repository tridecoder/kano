function Result({ resultado, onReiniciar }) {
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
      <div className="result__acciones">
        <button className="btn-repetir" onClick={onReiniciar}>Repetir el test</button>
      </div>
    </div>
  )
}

export default Result
