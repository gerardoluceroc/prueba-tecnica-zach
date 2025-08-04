import { useState } from "react";
import axios from 'axios';
import { path_createIncident, path_getAllIncidents, path_updateIncident } from "../services/API/Incidents-backend";

const useIncidents = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [incidents, setIncidents] = useState(null);
  const [error, setError] = useState(null); // Asegúrate de tener este estado

  const getAllIncidents = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setResponseStatus(null);

    try {
      const response = await axios.get(path_getAllIncidents);

      const incidentsData = response?.data || [];
      const status = response?.status || null;

      setResponse(response.data);
      setResponseStatus(status);
      setIncidents(incidentsData);

      return incidentsData;
    } catch (error) {
      const dataError = error?.response?.data || error?.message || 'Error desconocido';
      const status = error?.response?.status ?? error?.status ?? null;

      setError(dataError);
      setResponseStatus(status);

      return dataError;
    } finally {
      setLoading(false);
    }
  };

  const updateIncident = async (id, incidentData) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setResponseStatus(null);

    try {
      const url = `${path_updateIncident}/${id}`;
      const response = await axios.put(url, incidentData);

      const status = response?.status || null;
      const responseData = response?.data || null;

      setResponse(responseData);
      setResponseStatus(status);

      return responseData;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Error desconocido';
      const status = error?.response?.status ?? error?.status ?? null;

      setError(errorMessage);
      setResponseStatus(status);

      return error;
    } finally {
      setLoading(false);
    }
  };

  const createIncident = async (newIncidentData) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setResponseStatus(null);

    try {
      // La petición POST se hace directamente a la URL base de incidentes
      const response = await axios.post(path_createIncident, newIncidentData);

      const status = response?.status || null;
      const responseData = response?.data || null; // La data del incidente creado

      setResponse(responseData);
      setResponseStatus(status);

      return responseData; // Retorna los datos del incidente recién creado
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Error desconocido';
      const status = error?.response?.status ?? error?.status ?? null;

      setError(errorMessage); // Almacena el objeto/mensaje de error
      setResponseStatus(status); // Almacena el status del error

      return error; // Retorna el objeto de error completo
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    response,
    responseStatus,
    incidents,
    error,
    getAllIncidents,
    updateIncident,
    createIncident,
  };
};

export default useIncidents;