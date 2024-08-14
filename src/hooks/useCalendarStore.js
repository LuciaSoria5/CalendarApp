import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent} = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {

        if ( calendarEvent._id ) {
            // estoy actualizando
            dispatch( onUpdateEvent( { ...calendarEvent } ) );
        } else {

            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent( {...calendarEvent, id: data.evento.id, user: user } ) );
        }
    }

    const startDeletingEvent = async() => {
        // TODO: llegar al backend
        dispatch( onDeleteEvent() );
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
