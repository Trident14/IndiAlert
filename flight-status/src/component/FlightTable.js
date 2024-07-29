import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import '../style/Global.css';

const FlightTable = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch flights from the API
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:4060/api/flights');
        setFlights(response.data);
      } catch (error) {
        console.error('Failed to fetch flights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();

    // Socket.IO setup
    const socket = io('http://localhost:4060');

    socket.on('flightUpdate', (message) => {
      console.log('Flight update received:', message);
      
      // Parse the flight update message
      const updates = parseFlightUpdate(message);
      
      // Update flight data
      setFlights(prevFlights => {
        const updatedFlights = prevFlights.map(flight => {
          if (flight.flightNumber === updates.flightNumber) {
            return { ...flight, ...updates };
          }
          return flight;
        });

        if (!updatedFlights.some(f => f.flightNumber === updates.flightNumber)) {
          updatedFlights.push({ ...updates });
        }

        return updatedFlights;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Helper function to parse flight update messages
  const parseFlightUpdate = (message) => {
    const updates = {};

    // Extract flight number and details from message
    const regex = /Flight (\w+):\s*(.*)/;
    const match = message.match(regex);
    
    if (match) {
      updates.flightNumber = match[1];
      const details = match[2].split('. ').map(detail => detail.trim());

      details.forEach(detail => {
        if (detail.startsWith('status changed to')) {
          updates.status = detail.replace('status changed to ', '');
        } else if (detail.startsWith('departure time updated to')) {
          updates.departureTime = detail.replace('departure time updated to ', '');
        } else if (detail.startsWith('arrival time updated to')) {
          updates.arrivalTime = detail.replace('arrival time updated to ', '');
        } else if (detail.startsWith('destination city updated to')) {
          updates.destinationCity = detail.replace('destination city updated to ', '');
        } else if (detail.startsWith('origin city updated to')) {
          updates.originCity = detail.replace('origin city updated to ', '');
        } else if (detail.startsWith('gate changed to')) {
          updates.gate = detail.replace('gate changed to ', '');
        }
      });
    }

    return updates;
  };

  if (loading) return <p>Loading flights...</p>;

  return (
    <div className="flight-table-container">
      <h1>Flight Information</h1>
      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Status</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Origin City</th>
            <th>Destination City</th>
            <th>Gate</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight.flightNumber}>
              <td>{flight.flightNumber}</td>
              <td>{flight.status}</td>
              <td>{flight.departureTime ? new Date(flight.departureTime).toLocaleString() : ''}</td>
              <td>{flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleString() : ''}</td>
              <td>{flight.originCity}</td>
              <td>{flight.destinationCity}</td>
              <td>{flight.gate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
