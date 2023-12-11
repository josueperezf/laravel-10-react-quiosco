// esta funcion formatea no convierte ejemplo de pesos a dolares, solo le pone el icono de la moneda

export const formatearDinero = (cantidad : number) => {
    return cantidad.toLocaleString("en-US", {style:"currency", currency:"USD"});
}