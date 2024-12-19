import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Combination() {
  const [D, setD] = useState(null);

  // Fetch data from your API
  useEffect(() => {
    async function getOptimizedTheta() {
      try {
        const resp = await axios.get("http://localhost:3111/api/trainModel");
        setD(resp.data.habitable_combinations);
      } catch (error) {
        console.log(error);
      }
    }

    getOptimizedTheta();
  }, []);

  return (
    <>
    <style>
        {
            `
            #root{
            backgroud:black;

            }
            body{
            margin:0;
            padding:0;
            }
            `
        };
    </style>
    <div style={{ backgroundColor: '#0b0c10', color: '#66fcf1', minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '36px', color: '#45a29e' }}>
          Habitable Combinations 
        </h1>
      </header>

      {/* Fancy Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 10px rgba(0,0,0,0.6)' }}>
          <thead>
            <tr>
              <th style={headerStyle}>#</th>
              <th style={headerStyle}>Heavy Rains Combined</th>
              <th style={headerStyle}>Storms Combined</th>
              <th style={headerStyle}>Probability Combined</th>
            </tr>
          </thead>
          <tbody>
            {D &&
              D.map((item, index) => (
                <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                  <td style={cellStyle}>{index + 1}</td>
                  <td style={cellStyle}>{item.heavy_rains_combined}</td>
                  <td style={cellStyle}>{item.storms_combined}</td>
                  <td style={cellStyle}>{item.probability_combined}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

// Styles
const headerStyle = {
  padding: '15px',
  textAlign: 'left',
  backgroundColor: '#1f2833',
  color: '#66fcf1',
  fontWeight: 'bold',
  fontFamily: 'Orbitron, sans-serif',
  borderBottom: '2px solid #45a29e',
};

const evenRowStyle = {
  backgroundColor: '#1f2833',
  color: '#c5c6c7',
};

const oddRowStyle = {
  backgroundColor: '#0b0c10',
  color: '#c5c6c7',
};

const cellStyle = {
  padding: '12px',
  borderBottom: '1px solid #45a29e',
  textAlign: 'left',
};
