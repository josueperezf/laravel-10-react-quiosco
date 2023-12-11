<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PedidoCollection;
use App\Models\Pedido;
use App\Models\PedidoProducto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //* LISTAMOS LOS PEDIDOS QUE AUN NO SE HAN HECHO, ES DECIR LO DE ESTADO 0
    public function index() {
        //!IMPORTANTE:
        //* EL with es para decirle que traiga ademas del pedido una data adicional,
        //* que esa data adicional la vaya a buscar de un metodo del modelo Pedido, este metodo que esta en pedido se llama user()
        return new PedidoCollection(
            Pedido::with('user')
                    ->with('productos')->where('estado', 0)->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // almacenar un pedido u orden, siempre llegara aqui autenticado
    // pedido es como factura, guarda el usuario y el total a pagar, el detalle de factura lo guarda en otra tabla
    public function store(Request $request)
    {
        //!PARA VER EJEMPLOS DE VALIDACIONES PROFESIONAL, VER EN https://www.youtube.com/watch?v=-EjAKSjMYjQ
        /**
         * IMPORTANTE:
         * 1. este bloque de codigo tiene un try un catch que evalua todas con operaciones sql de la metodo,
         * 2. si algo falla entra al catch y hace un rollback de la base de datos, data incompleta, ejemplo que guarde factura con su total, pero no que productos compro
         * 3. para que ese rollback funcione se debe:
         *      a) antes de try colocar DB::beginTransaction();
         *      b) dentro del bloque try antes de hacer el return debemos ejecutar DB::commit(); si no lo hacemos no insertara nada en la base de datos
         *      c) detro del catch el mismo debe ser del tipo \Exception, y si entra en ese lugar debemos hacer un rollback
         */
        DB::beginTransaction();
        try {
            $pedido = new Pedido;
            $pedido->user_id = $request->user()->id;
            // tambien lo puedo hacer asi:
            // $pedido->user_id = Auth::user()->id;
            $pedido->total = $request->total;
            $pedido->save();

            // Obtenemos el id del pedido al cual pertenecen los productos
            $id = $pedido->id;
            // obtenemos los productos
            $productos = $request->productos;

            // Formatear un arreglo
            $pedido_producto = [];
            // cada producto tiene ejemplo: [id =>1, cantidad => 2]; // id del producto, cantidad de productos que quiere comprar el cliente
            foreach ($productos as $producto) {
                $pedido_producto[] = [
                    'pedido_id' => $id,
                    'producto_id' => $producto['id'],
                    'cantidad' => $producto['cantidad'],
                    // tenemos que colocar las fechas manualmente, ya que el metodo insert() de laravel no crea las fechas de creacion y demas, de manera automatica
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];
            }

            // Almacenar en la base de datos ..insert permite insertar un arreglo a la database
            PedidoProducto::insert($pedido_producto);
            //* correr el commit si todo los sql se hicieron con exito
            DB::commit();
            return [
                'message' => 'Su pedido almacenado con exito. los cocineros prepararan su plata de comida en unos minutos',
                'pedido'=> $pedido
            ];

        } catch (\Exception $e) {
            DB::rollback();
            return $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pedido  $pedido
     * @return \Illuminate\Http\Response
     */
    public function show(Pedido $pedido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pedido  $pedido
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pedido $pedido)
    {
        $pedido->estado = 1;
        $pedido->update();
        return ['pedido' => $pedido];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pedido  $pedido
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pedido $pedido)
    {
        //
    }
}
