import './styles.css';

export function Card({name, skills, type, avatar}){

  return(
    <div className="card">
      <div className="wrapPokemonInformations">
        <h2>Nome do pokemon: {name}</h2>
        <h4>Quantidade de habilidades: {skills}</h4>
        <h3>Tipo: {type}</h3>
      </div>
      <img src={avatar} alt=""/>
    </div>
  )
}