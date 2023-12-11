import { useQuiosco } from '../hooks/useQuiosco';
import { Categoria as CategoriaInterface} from '../interfaces/Categoria.interface';

interface Props {
    categoria: CategoriaInterface;
}
export const Categoria = ({categoria}: Props) => {
    const {handleClickCategoria, categoriaSeleccionada} = useQuiosco();
    const { icono, id, nombre } = categoria;

    const onClick = () => {
        handleClickCategoria(id);
    }
    return (
        <div
            className={`${id == categoriaSeleccionada?.id && 'bg-amber-400' } flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}
            onClick={onClick}
        >
            <img
                alt='Imagen Icono'
                src={`/img/icono_${icono}.svg`}
                className='w-12'
            />
            <p
                className='text-lg font-bold truncate'  
            >
                {nombre}
            </p>
        </div>
    )
}
