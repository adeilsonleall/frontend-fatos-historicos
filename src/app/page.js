'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [year, setYear] = useState('');
  const [fact, setFact] = useState('');

  const fetchFact = async () => {
    try {
      const response = await axios.get(`https://backend-fatos-historicos.vercel.app/?fato=${year}`); 
      setFact(response.data.fato);
    } catch (error) { if (error.response) { // O servidor respondeu com um status diferente de 2xx 
      if (error.response.status === 400) { 
        setFact('Erro 400: Dados inválidos fornecidos.'); 
      } else { 
        setFact(`Erro ${error.response.status}: ${error.response.data.message}`); } 
      } else if (error.request) { // A requisição foi feita, mas nenhuma resposta foi recebida 
        setFact('Erro de conexão: Não foi possível conectar à API.'); } 
        else { // Algo aconteceu ao configurar a requisição 
          setFact('Erro: Algo deu errado ao configurar a requisição.'); } 
    }
  };

  return (
    <div>
      <h1>Fatos Históricos</h1>
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Digite um ano"
      />
      <button onClick={fetchFact}>Buscar Fato</button>
      {fact && <p>{fact}</p>}
    </div>
  );
}
