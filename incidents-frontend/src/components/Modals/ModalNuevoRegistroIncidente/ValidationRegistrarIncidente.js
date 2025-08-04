import * as Yup from 'yup';
import dayjs from 'dayjs';

// Importar el plugin para validar si la fecha es antes o después de la actual
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

export const ValidationRegistrarIncidente = Yup.object().shape({
  // Validación para id_equipo: debe ser un string requerido
  id_equipo: Yup.string()
    .required('El ID del equipo es obligatorio.'),
    
  // Validación para fecha:
  fecha: Yup.string()
    .required('La fecha es obligatoria.')
    .test(
      'is-before-present', // Nombre de la prueba de validación
      'La fecha debe ser anterior o igual a la actual.', // Mensaje de error
      (value) => {
        // La validación solo se ejecuta si hay un valor
        if (!value) {
          return true; // Si no hay valor, la validación de 'required' se encargará.
        }
        // Convierte el valor de la fecha a un objeto Day.js
        const fechaSeleccionada = dayjs(value);
        // Obtiene la fecha actual
        const fechaActual = dayjs();
        // Usa el plugin isSameOrBefore para comparar
        return fechaSeleccionada.isSameOrBefore(fechaActual, 'day');
      }
    ),
  
  // Validación para descripcion: debe ser un string requerido
  descripcion: Yup.string()
    .required('La descripción del incidente es obligatoria.'),

  // Validación para estado: debe ser un string requerido
  estado: Yup.string()
    .required('El estado es obligatorio.'),
});