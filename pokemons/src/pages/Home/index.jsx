import React, { useState, useEffect } from 'react';
import './styles.css';
import { Card } from '../../components/Card';
import { PieChart } from '../../components/PieChart';
import { BarChart } from '../../components/BarChart';
import {fetchPokemonData, fetchPokemonDetailedData} from "../../API/pokemonInfo";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function Home() {
  const [pokemons, setPokemons] = useState([])
  const [pokemonTypeGeneralInfo, setPokemonTypeGeneralInfo] = useState([]);
  const [pokemonSkillInfos, setPokemonSkillInfos] = useState([])
  async function fillPokemonInfos(){
    const pokemonList = await fetchPokemonData();
    let arrayPokemons = [];
    let arrayPokemonTypes = [];
    let arrayPokemonTypeGeneralInfo = [];
    let arraySkills = [0,0,0,0];
    for (let i = 0; i < pokemonList.length; i++) {
      let url = pokemonList[i].url
      const detailedData = await fetchPokemonDetailedData(url);
      let skills = detailedData.abilities.length
      if(skills === 1){
        arraySkills[0] += 1;
      }
      else if(skills === 2){
        arraySkills[1] += 1;
      }
      else if(skills === 3){
        arraySkills[2] += 1;
      }
      else{
        arraySkills[3] += 1;
      }
      let type = [];
      for (let j = 0; j < detailedData.types.length; j++) {
        let typeName = detailedData.types[j].type.name;

        type.push(capitalizeFirstLetter(typeName))
        if(!arrayPokemonTypes.includes(typeName)){
          arrayPokemonTypes.push(typeName);
          arrayPokemonTypeGeneralInfo.push({
            name: typeName,
            amount: 1,
          })

        }
        else{
          for (let k = 0; k < arrayPokemonTypeGeneralInfo.length; k++) {
            if(arrayPokemonTypeGeneralInfo[k].name == typeName){
              arrayPokemonTypeGeneralInfo[k].amount++;
            }

          }
        }

      }
      if(type.length == 2){
        type = type.join(' e ')
      }
      else{
        type = type.join(', ')
        let lastOccurrence = type.lastIndexOf(',');
        if(lastOccurrence !== -1)
          type = type.substring(0, lastOccurrence) + ' e ' + type.substring(lastOccurrence + 1)
      }

      let avatar = detailedData.sprites.front_default;

      let newPokemon = {
        name: capitalizeFirstLetter(pokemonList[i].name),
        key: i,
        skills: skills,
        type: type,
        avatar: avatar
      }
      arrayPokemons[i] = newPokemon;
    }
    setPokemons(arrayPokemons);
    setPokemonTypeGeneralInfo(arrayPokemonTypeGeneralInfo);
    setPokemonSkillInfos(arraySkills)
  }
  useEffect(() => {
    fillPokemonInfos()
  }, [])
  return (

    <div className="container">
      <header>
        <h1>Lista de Pokemons</h1>
      </header>
      {pokemons.length === 0 ?
        <div id="loading">
          <img src="../../../public/loading.gif" alt=""/>
          <h2>Carregando informações dos pokemons, por favor aguarde.</h2>
        </div> :
          <>
          <div id="chartsWrapper">
            <PieChart chartData={pokemonTypeGeneralInfo}/>
            <BarChart chartData={pokemonSkillInfos}/>
          </div>

          {pokemons.map(pokemons =>

          <Card
            key={pokemons.key}
            name={pokemons.name}
            skills={pokemons.skills}
            type={pokemons.type}
            avatar={pokemons.avatar}/>)}
          </>
      }
    </div>
  )
}
