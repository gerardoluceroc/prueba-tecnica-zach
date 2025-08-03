import { useState, useEffect } from 'react';
import useIncidents from '../../../hooks/useIncidents';

const HomePageComponent = () => {
    // Invoca el hook useIncidents para acceder a sus estados y funciones
    const { incidents, loading, error, getAllIncidents } = useIncidents();

    // Crea el estado rowsOriginales
    const [rowsOriginales, setRowsOriginales] = useState([]);
    useEffect(() => {console.log("📌 rowsOriginales, => ",rowsOriginales)}, [rowsOriginales,]);


    // Usa useEffect para invocar getAllIncidents una vez al montar el componente
    useEffect(() => {
        const fetchIncidents = async () => {
        const fetchedIncidents = await getAllIncidents();
        };

        fetchIncidents();
    }, []);

    // Puedes añadir un useEffect adicional para reaccionar a cambios en 'incidents' del hook
    // por si la actualización interna de 'useIncidents' ocurre un poco después de 'getAllIncidents'
    useEffect(() => {
        if (incidents && !loading && !error) {
        setRowsOriginales(incidents);
        }
    }, [incidents, loading, error]); // Dependencias para reaccionar a cambios en el estado 'incidents' del hook

    return (
        <div>
        <h2>HomePageComponent</h2>
        {loading && <p>Cargando incidentes...</p>}
        {error && <p style={{ color: 'red' }}>Error al cargar incidentes: {JSON.stringify(error)}</p>}

        {/* Aquí puedes mostrar los datos de rowsOriginales */}
        {!loading && rowsOriginales.length > 0 && (
            <div>
            <h3>Incidentes Originales Cargados:</h3>
            <ul>
                {rowsOriginales.map(incident => (
                <li key={incident.id}>
                    ID: {incident.id}, Descripción: {incident.description}, Estado: {incident.status}
                </li>
                ))}
            </ul>
            </div>
        )}
        {!loading && !error && rowsOriginales.length === 0 && <p>No hay incidentes para mostrar o aún no se han cargado.</p>}
        </div>
    );
    };

export default HomePageComponent;