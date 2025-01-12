'use client';

import styles from './page.module.css';
import { useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import Header from '@/componentes/header/Header';

export default function Home() {
  const [year, setYear] = useState('');
  const [fact, setFact] = useState('');

  const fetchFact = async () => {
    setFact('Pesquisando...');
    try {
      const response = await axios.get(`https://backend-fatos-historicos.vercel.app/?fato=${year}`); 
      setFact(response.data.fato);
    } catch (error) { 
        if (error.response) { // O servidor respondeu com um status diferente de 2xx 
          if (error.response.status === 400) {
            alert('Erro 400: Os dados digitados são inválidos'); 
            setFact(''); 
          } else { 
            setFact(`Erro ${error.response.status}: ${error.response.data.message}`); 
          } 
        } else if (error.request) { // A requisição foi feita, mas nenhuma resposta foi recebida 
          alert('Erro de conexão: Não foi possível conectar à API.');
          setFact(''); 
        } 
        else { // Algo aconteceu ao configurar a requisição 
          alert('Erro: Algo deu errado ao configurar a requisição.');
          setFact(''); 
        } 
    }
  };

  return (
    <div className={styles.main_container}>

      <Header />

      <main className={styles.main_content}>
        <div className={styles.search}>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Digite um ano entre 1920 e 2020"
            className={styles.input}
          />
          <button onClick={fetchFact} className={styles.button}><FaSearch className={styles.icon}/></button>
        </div>
        <div className={styles.fact}>
          {fact && <p>{fact}</p>}
        </div>
      </main>
      
    </div>
  );
}
