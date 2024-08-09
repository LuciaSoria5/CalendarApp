import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent} = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend
        if ( calendarEvent._id ) {
            // estoy actualizando
            dispatch( onUpdateEvent( { ...calendarEvent } ) );
        } else {
            // estoy creando
            dispatch( onAddNewEvent( {...calendarEvent, _id: new Date().getTime() } ) );
        }
    }

    const startDeletingEvent = async() => {
        // TODO: llegar al backend
        dispatch( onDeleteEvent() );
    }


    return {
        //* Propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent, // si es null retorna false

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}
