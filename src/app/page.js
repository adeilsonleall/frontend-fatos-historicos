'use client';

import styles from './page.module.css';
import { useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [year, setYear] = useState('');
  const [fact, setFact] = useState('');

  const fetchFact = async () => {
    try {
      const response = await axios.get(`https://backend-fatos-historicos.vercel.app/?fato=${year}`); 
      setFact(response.data.fato);
    } catch (error) { 
        if (error.response) { // O servidor respondeu com um status diferente de 2xx 
          if (error.response.status === 400) { 
            setFact('Erro 400: Dados inválidos fornecidos.'); 
          } else { 
            setFact(`Erro ${error.response.status}: ${error.response.data.message}`); 
          } 
        } else if (error.request) { // A requisição foi feita, mas nenhuma resposta foi recebida 
          setFact('Erro de conexão: Não foi possível conectar à API.'); 
        } 
        else { // Algo aconteceu ao configurar a requisição 
          setFact('Erro: Algo deu errado ao configurar a requisição.'); 
        } 
    }
  };

  return (
    <div className={styles.main_container}>

      <header className={styles.header}>
        <h1>Fatos Históricos</h1>
      </header>

      <main >

        <div className={styles.container_search}>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Digite um ano"
            className={styles.input}
          />
          <button onClick={fetchFact} className={styles.button}><FaSearch className={styles.icon}/></button>
        </div>

        {fact && <p>{fact}</p>}
      </main>
      
    </div>
  );
}
