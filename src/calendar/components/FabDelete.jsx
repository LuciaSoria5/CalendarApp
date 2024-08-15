import { useEffect, useState } from "react";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks"
import Swal from "sweetalert2";

export const FabDelete = () => {

    const { startDeletingEvent, activeEvent, hasEventSelected } = useCalendarStore();
    const { user } = useAuthStore();
    const [isMyEvent, setIsMyEvent] = useState(false);

    useEffect(() => {
        if ( activeEvent === null ) return;
        setIsMyEvent( user.uid === activeEvent.user._id || user.uid === activeEvent.user.uid );
    }, [activeEvent]);

    const handleDelete = () => {

        Swal.fire({
                    title: '¿Estas segura de que quieres eliminar el evento?', 
                    text: '¡No podrás revertirlo!', 
                    icon: 'warning', 
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Si, estoy segura.',
                    confirmButtonColor: '#c166e0',
                    cancelButtonColor: '#8126b6'
                }).then( result => {
                    if ( result.isConfirmed ) {
                        startDeletingEvent();
                        Swal.fire('¡Listo!','El evento fue eliminado.', 'success');
                    }            
                });
    }

  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
            display: hasEventSelected && isMyEvent ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
