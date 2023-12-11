import { Producto } from "./producto.interface";

export interface Pedido extends Producto {
    cantidad: number;
}