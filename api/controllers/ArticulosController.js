/**
 * ArticulosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    get: async(request, response) => {
        var search = ""
        var query = "SELECT a.idArticulos, a.nombre, a.descripcion, i.cantidad AS cantidad,";
        query = query+" a.precioVenta, a.precioCompra FROM articulos a INNER JOIN inventario i ON a.idArticulos=i.idArticulos"
        var select = await Usuarios.getDatastore().sendNativeQuery(query);
        select = JSON.parse(JSON.stringify(select.rows));
        if(request.query.search){
            if(isNaN(request.query.search)){
                search = request.query.search; 
                search = search.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
            }else search = request.query.search;
        }
        console.log(search);
        return response.view('pages/productos', {
            layout: 'layouts/layout',
            products_data: select,
            search: search,
            admin : response.data_user.tipoUsuario
        });
    },
    getNuevo: async(request, response) => {
        return response.view('pages/nuevo-producto', {
            layout: 'layouts/layout',
            admin : response.data_user.tipoUsuario
        });
    },
    getProducto: async(request, response) => {
        var select = await Inventario.getDatastore().sendNativeQuery(
            "SELECT * FROM inventario WHERE idArticulos="+request.param("id")
        );
        const inventario = JSON.parse(JSON.stringify(select.rows[0]));
        select = await Articulos.getDatastore().sendNativeQuery(
            "SELECT * FROM articulos WHERE idArticulos="+request.param("id")
        );
        const articulo = JSON.parse(JSON.stringify(select.rows[0]));
        var Fecha = articulo.fecha.split("");
        var soloFecha="";
        for (let index = 0; index < 10; index++) {
            soloFecha = soloFecha+Fecha[index]; 
        }
        return response.view('pages/editar-producto', {
            layout: 'layouts/layout',
            inventario: inventario,
            articulo: articulo,
            fecha: soloFecha,
            admin : response.data_user.tipoUsuario
        });
    },
    post : async(request, response) => {
        var columnas="(nombre, descripcion, fecha, precioCompra, precioVenta, activo)";
        const body = request.body
        var valores="('"+body["nombre"]+"', '"+body["descripcion"]+"', '"+body["fecha"]+"', "+body["precioCompra"]+", "+body["precioVenta"]+", "+body["activo"]+")";
        var insertado = await Articulos.getDatastore().sendNativeQuery(
            "INSERT INTO articulos "+columnas+" VALUES "+valores
        );
        var select = await Articulos.getDatastore().sendNativeQuery(
            "SELECT * FROM articulos WHERE nombre='"+body["nombre"]+"' AND descripcion='"+body["descripcion"]+"' LIMIT 1"
        )
        var articulo = JSON.parse(JSON.stringify(select.rows[0]));
        columnas="(idArticulos, cantidad)";
        valores="("+articulo.idArticulos+", "+body["cantidad"]+")"
        await Inventario.getDatastore().sendNativeQuery(
            "INSERT INTO inventario "+columnas+" VALUES "+valores
        );
        return response.send({success:'ok'});
    },
    actualizar : async(request, response) => {
        const idArcticulos = request.param("id");
        const body = request.body;
        var update="nombre='"+body["nombre"]+"', descripcion='"+body["descripcion"]+"', fecha='"+body["fecha"];
        update=update+"', precioCompra="+body["precioCompra"]+", precioVenta="+body["precioVenta"]+", activo="+body["activo"];
        await Articulos.getDatastore().sendNativeQuery(
            "UPDATE articulos SET "+update+" WHERE idArticulos="+idArcticulos
        );
        await Inventario.getDatastore().sendNativeQuery(
            "UPDATE inventario SET cantidad="+body["cantidad"]+" WHERE idArticulos="+idArcticulos
        );
        return response.send({success:'ok'});
    },
    eliminar : async(request, response) => {
        const idArticulos = request.param("id");
        
        await Inventario.getDatastore().sendNativeQuery(
            "DELETE FROM inventario WHERE idArticulos="+idArticulos
        );
        await Articulos.getDatastore().sendNativeQuery(
            "DELETE FROM articulos WHERE idArticulos="+idArticulos
        );
        return response.send({success: 'ok'})

    }
};

