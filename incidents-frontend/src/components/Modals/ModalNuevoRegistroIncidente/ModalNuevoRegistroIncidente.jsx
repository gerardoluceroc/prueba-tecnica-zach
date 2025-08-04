import { Box } from "@mui/material";
import "./ModalNuevoRegistroIncidente.css";
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ButtonTypeOne from "../../ButtonTypeOne/ButtonTypeOne";
import { Modal } from "@mui/material";
import { useFormik } from "formik";
import TextFieldUno from "../../TextFieldUno/TextFieldUno";
import TextFieldDate from "../../TextFieldDate/TextFieldDate";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog";
import useIncidents from "../../../hooks/useIncidents";

const ModalNuevoRegistroIncidente = ({ open, onClose, setRows }) => {

    // Se invoca la función para consultarle al usuario si desea enviar el formulario
    const { confirm, ConfirmDialogComponent } = useConfirmDialog();

    // Se obtienen las funciones y estados a utilizar del hook
    const {loading, createIncident} = useIncidents();

    const formik = useFormik ({
        initialValues: {
            id_equipo: '',
            fecha: '',
            descripcion: '',
            estado: 'abierto'
        },
        // validationSchema: ValidationAgregarAListaNegra,
        onSubmit: async (values) => {
            const confirmed = await confirm({
                title: "Registrar nuevo incidente",
                message: "¿Deseas registrar este nuevo incidente?"
            });

            if(confirmed){
                const cuerpoPeticion = {
                    date: values.fecha,
                    description: values.descripcion,
                    teamId: values.id_equipo,
                    status: values.estado
                }

                const respuesta = await createIncident(cuerpoPeticion);

                setRows(prevRows => [...prevRows, respuesta]);

                formik.resetForm();
            }
        }
    });

  return (
    <Modal open={open} onClose={onClose}>
        <Box id="ContainerModalNuevoRegistroIncidente">
            <Box id="HeaderModalNuevoRegistroIncidente">
                <Typography variant="h5" component="h5" gutterBottom>
                    {"Agregar a lista negra"}
                </Typography>

                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                    top: -8,
                    color: "black",
                    }}
                >
                    <CloseIcon sx={{fontSize: "30px"}} />
                </IconButton>
            </Box>

            <Box id="CuerpoModalNuevoRegistroIncidente">
                <TextFieldUno
                    name="id_equipo" 
                    value={formik.values.id_equipo}
                    label="Id del equipo" 
                    placeholder="Ingrese el id del equipo" 
                    onChange={formik.handleChange}
                    error={formik.touched.id_equipo && Boolean(formik.errors.id_equipo)}
                    helperText={formik.touched.id_equipo && formik.errors.id_equipo}
                />

                <TextFieldDate
                    name="fecha"
                    label="Fecha del reporte"
                    onChange={formik.handleChange}
                    error={formik.touched.fecha && Boolean(formik.errors.fecha)}
                    helperText={formik.touched.fecha && formik.errors.fecha}
                />

                <TextFieldUno
                    name="descripcion" 
                    value={formik.values.descripcion}
                    label="Descripción" 
                    placeholder="" 
                    onChange={formik.handleChange}
                    error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                    helperText={formik.touched.descripcion && formik.errors.descripcion}
                />

                
            </Box>

            <Box id="BoxButtonSubmitModalNuevoRegistroIncidente">
                <ButtonTypeOne
                    defaultText="Registrar incidente"
                    loadingText="Registrando incidente..."
                    handleClick={formik.handleSubmit}
                    // // handleClick={simularPeticion}
                    // disabled={formik.isSubmitting}
                />
            </Box>

            {ConfirmDialogComponent}

        </Box>
    </Modal>
  )
}

export default ModalNuevoRegistroIncidente