import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent} = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        // console.log(calendarEvent);
        try {
            if ( calendarEvent.id ) { // estoy actualizando ese evento
                await calendarApi.put( `/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent( { ...calendarEvent, user } ) );
                return;
            }
            // estoy creando un evento nuevo
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent( {...calendarEvent, id: data.evento.id, user: user } ) );

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }


    const startDeletingEvent = async() => {
        try {
            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() );

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
    }


    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );

        } catch (error) {
            console.log('Error al cargar el evento.');
            console.log( error );
        }
    }


    return {
        //* Propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent, // si es null retorna false

        //* Metodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}
