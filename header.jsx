import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Mi Aplicación</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto"> {/* Cambié ml-auto a ms-auto para Bootstrap 5 */}
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#profile">Perfil</Nav.Link>
          <Nav.Link href="#logout">Cerrar Sesión</Nav.Link>
          <Nav.Link href="#login">Iniciar Sesión</Nav.Link>
          <Nav.Link href="#registro">Registro</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};


const Home = ({ pizzas }) => {
  return (
    <div className="pizza-container">
      {pizzas.length ? (
        pizzas.map((pizza) => (
          <div key={pizza.id} className="card" style={{ width: '18rem' }}>
            <img src={pizza.image} alt={pizza.name} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{pizza.name}</h5>
              <p className="card-text">{pizza.description}</p>
              <p className="card-price">${pizza.price}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay pizzas disponibles.</p>
      )}
    </div>
  );
};


const App = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    
    const fetchPizzas = async () => {
      try {
        const response = await fetch('URL_DE_LA_API'); 
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        setPizzas(data); 
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div>
      <Header />
      <Home pizzas={pizzas} />
    </div>
  );
};

export default App;



