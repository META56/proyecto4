import React, { useEffect, useState } from 'react';
import './PizzaApp.css'; 

const PizzaApp = () => {
  const [pizzas, setPizzas] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pizzas'); 
        if (!response.ok) {
          throw new Error('Error al obtener las pizzas');
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  
  if (loading) {
    return <p>Cargando pizzas...</p>;
  }

  
  if (error) {
    return <p>{`Error: ${error}`}</p>;
  }

  return (
    <div className="pizzas-container">
      {pizzas.map((pizza) => (
        <div key={pizza.id} className="card-pizza">
          <img src={pizza.image} alt={`Pizza ${pizza.name}`} className="pizza-image" />
          <h3>{pizza.name}</h3>
          <p>Precio: ${pizza.price}</p>
          <p>Ingredientes: {pizza.ingredients.join(', ')}</p>
          <p>{pizza.description}</p>
          <button>Añadir al carrito</button>
        </div>
      ))}
    </div>
  );
};

export default PizzaApp;

