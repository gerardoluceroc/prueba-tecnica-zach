import { useState, useEffect } from 'react';
import useIncidents from '../../../hooks/useIncidents';
import DatagridResponsive from '../../DatagridResponsive/DatagridResponsive';
import ButtonTypeOne from '../../ButtonTypeOne/ButtonTypeOne';
import { Box } from '@mui/material';
import "./HomePageComponent.css"
import dayjs from "dayjs";
import 'dayjs/locale/es'; 

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

    // Por si la actualización interna de 'useIncidents' ocurre un poco después de 'getAllIncidents'
    useEffect(() => {
        if (incidents && !loading && !error) {
        setRowsOriginales(incidents);
        }
    }, [incidents, loading, error]);


    function setFechaAFormatoLegible(fechaString) {
        dayjs.locale('es'); 

        // Parsea la fecha string y formatea
        const fechaFormateada = dayjs(fechaString).format('DD [de] MMMM [de] YYYY');

        return fechaFormateada;
    }

    // Información que irá en la tabla
    const columns = ["Identificador", "Equipo", "Descripcion", "Fecha", "Status"];
    const data = rowsOriginales?.map((row) => {
        return[
            `${row.id}`,
            `${row.teamId}`,
            `${row.description}`,
            `${setFechaAFormatoLegible(row.date)}`,
            `${row.status}`,
        ]
    })

    return (
        <Box id="ContainerReporteIncidentePageComponent">
            <Box id="BotonCrearNuevoReporteIncidente">
                <ButtonTypeOne
                    defaultText="Nuevo reporte de incidente"
                    // handleClick={handleOpenModalCrearReporteIncidencias}
                    handleClick={()=>{}}
                />
            </Box>
            <DatagridResponsive title="" columns={columns} data={data} selectableRows="none" downloadCsvButton={false} /> 
        </Box>
    );
    };

export default HomePageComponent;