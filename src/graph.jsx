import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

export default function SurfacePlot() {
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

  // Prepare data for the first 3D scatter plot
  const prepareScatterData = () => {
    if (!D) return null;

    const x = D.map(item => item.heavy_rains_combined);
    const y = D.map(item => item.storms_combined);
    const z = D.map(item => item.probability_combined);

    return {
      type: 'scatter3d',
      mode: 'markers',
      x: x,
      y: y,
      z: z,
      marker: {
        color: z,
        colorscale: 'Jet', // Space-themed colorscale
        size: 6,
        opacity: 0.8,
        line: { width: 1, color: 'black' }, // White marker borders
      },
    };
  };

  // Prepare surface data for the first plot
  const prepareSurfaceData = () => {
    if (!D) return null;

    const x = D.map(item => item.heavy_rains_combined);
    const y = D.map(item => item.storms_combined);
    const z = D.map(item => item.probability_combined);

    return {
      type: 'surface',
      x: [x],
      y: [y],
      z: [z],
      colorscale: 'Jet', // Space-themed colorscale
    };
  };

  // Prepare second 3D scatter plot with connections like a line graph
  const prepareSecondLineGraphData = () => {
    if (!D) return null;

    const x = D.map(item => item.heavy_rains_combined);
    const y = D.map(item => item.storms_combined);
    const z = D.map(item => item.probability_combined);

    return {
      type: 'scatter3d',
      mode: 'lines',
      x: x,
      y: y,
      z: z,
      line: {
        color: 'black', // Space-like color for line
        width: 3,
      },
    };
  };

  // Prepare second surface plot data
  const prepareSecondSurfaceData = () => {
    if (!D) return null;

    const x = D.map(item => item.heavy_rains_combined);
    const y = D.map(item => item.storms_combined);
    const z = D.map(item => item.probability_combined);

    return {
      type: 'surface',
      x: [x],
      y: [y],
      z: [z],
      colorscale: 'Inferno', // Dark, space-like colorscale
    };
  };

  return (
    <>
      <div style={{ backgroundColor: 'white', height: '100vh' }}>
        {/* Heading Section */}
        <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffff' }}>
          <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
            Data Visualization of Habitable Combinations
          </h1>
        </header>

        <div style={{ display: 'flex', justifyContent: 'space-between', height: '800px', padding: '20px' }}>
          {/* First Plot */}
          <div style={{ width: '48%' }}>
            <Plot
              data={[prepareScatterData(), prepareSurfaceData()]}
              layout={{
                title: {
                  text: '3D - SCATTER PLOT',
                  font: { size: 24, color: '#333' },
                  x: 0.5,
                  y: 0.95,
                },
                scene: {
                  xaxis: {
                    title: 'Heavy Rains Combined',
                    titlefont: { size: 18, color: '#333' },
                  },
                  yaxis: {
                    title: 'Storms Combined',
                    titlefont: { size: 18, color: '#333' },
                  },
                  zaxis: {
                    title: 'Probability Combined',
                    titlefont: { size: 18, color: '#333' },
                  },
                  camera: {
                    eye: { x: 1.5, y: 1.5, z: 1.5 },
                  },
                  gridcolor: 'rgb(200, 200, 200)', // Light gridlines
                },
                paper_bgcolor: 'white', // White background for space theme
                plot_bgcolor: '#f4f4f4', // Slightly lighter background
                font: { family: 'Arial, sans-serif', color: '#333' }, // Dark text
              }}
            />
          </div>

          {/* Second Plot with Line Graph */}
          <div style={{ width: '48%' }}>
            <Plot
              data={[prepareSecondLineGraphData(), prepareSecondSurfaceData()]}
              layout={{
                title: {
                  text: '3D PATTERN VISUALIZER',
                  font: { size: 24, color: '#333' },
                  x: 0.5,
                  y: 0.95,
                },
                scene: {
                  xaxis: {
                    title: 'Heavy Rains Combined',
                    titlefont: { size: 18, color: '#333' },
                  },
                  yaxis: {
                    title: 'Storms Combined',
                    titlefont: { size: 18, color: '#333' },
                  },
                  zaxis: {
                    title: 'Probability Combined',
                    titlefont: { size: 18, color: '#333' },
                  },
                  camera: {
                    eye: { x: 1.5, y: 1.5, z: 1.5 },
                  },
                  gridcolor: 'rgb(200, 200, 200)', // Light gridlines
                },
                paper_bgcolor: 'white', // White background for space theme
                plot_bgcolor: '#f4f4f4', // Slightly lighter background
                font: { family: 'Arial, sans-serif', color: '#333' }, // Dark text
              }}
            />
          </div>
        </div>

        {/* Home Button */}
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            backgroundColor: '#007bff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          }}
          onClick={() => window.location.href = '/'} // Change this URL to your home route
        >
          <span style={{ color: 'white', fontSize: '24px' }}>🏠</span>
        </div>
      </div>
    </>
  );
}
