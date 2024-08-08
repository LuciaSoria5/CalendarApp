import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';

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


    return {
        //* Propiedades
        events, 
        activeEvent,

        //* Metodos
        setActiveEvent,
        startSavingEvent,
    }
}
