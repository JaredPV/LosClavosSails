/**
 * VentaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  get: async(request, response) => {
    var search = ""
    var select = await Compra.getDatastore().sendNativeQuery(
      "SELECT * FROM compra"
    );
    select = JSON.parse(JSON.stringify(select.rows));
    for (let index = 0; index < select.length; index++) {
      select[index].fecha = select[index].fecha.slice(0,10)
      
    }
    if(request.query.search){
        if(isNaN(request.query.search)){
            search = request.query.search; 
            search = search.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        }else search = request.query.search;
    }
    return response.view('pages/compras', {
        layout: 'layouts/layout',
        compras_data: select,
        search: search,
        admin : response.data_user.tipoUsuario
    });
},
  getNueva: async (req, res) => {
    var select = await Articulos.getDatastore().sendNativeQuery(
      "SELECT * FROM articulos a INNER JOIN inventario i ON a.idArticulos=i.idArticulos WHERE a.activo=1 AND i.cantidad>0"
    );
    select = JSON.parse(JSON.stringify(select.rows));
    return res.view("pages/nueva-compra", {
      layout: "layouts/layout",
      admin: res.data_user.tipoUsuario,
      articulos: select,
    });
  },
  getCompra: async (req,res) => {
    const query = "SELECT * FROM compraarticulos ca INNER JOIN articulos a ON ca.idArticulos=a.idArticulos INNER JOIN compra c ON ca.idCompra=c.idCompra WHERE ca.idCompra="+req.param("id")
    var select = await Compra.getDatastore().sendNativeQuery(
      query
    )
    select = JSON.parse(JSON.stringify(select.rows))
    console.log(select);
    for (let index = 0; index < select.length; index++) {
      select[index].subtotal=select[index].cantidadCompra*select[index].precioCompra
      
    }
    
    return res.view("pages/ver-compra",{
      layout: "layouts/layout",
      admin: res.data_user.tipoUsuario,
      compras: select
    })
  },
  postCompra: async (req, res) => {
    const body = req.body;
    console.log(body);
    var values =
      "'"+new Date().toISOString()+"'" +
      "," +
      body.Total +
      "," +
      body.ClaveProveedor +
      ",'" +
      body.NombreProveedor +
      "'";
    var query = "INSERT INTO compra (fecha, totalCompra, claveProveedor, nombreProveedor) VALUES (" + values +")"
    await Compra.getDatastore().sendNativeQuery(query);
    var idCompra = await Compra.getDatastore().sendNativeQuery("SELECT idCompra FROM compra ORDER BY idCompra DESC LIMIT 1")
    idCompra = idCompra.rows[0].idCompra
    console.log(idCompra);

    if (Array.isArray(body.Id)) {
      for (let index = 0; index < body.Id.length; index++) {
        await Inventario.getDatastore().sendNativeQuery(
          "UPDATE inventario SET cantidad = cantidad+"+body.Numero[index]+" WHERE idArticulos="+body.Id[index]
        )
        await Compraarticulos.getDatastore().sendNativeQuery(
          "INSERT INTO compraarticulos (idCompra, idArticulos,cantidadCompra) VALUES ("+idCompra+", "+body.Id[index]+", "+body.Numero[index]+")"
        )
      }
    }else{
      await Inventario.getDatastore().sendNativeQuery(
        "UPDATE inventario SET cantidad = cantidad+"+body.Numero+" WHERE idArticulos="+body.Id
      )
      await Compraarticulos.getDatastore().sendNativeQuery(
        "INSERT INTO compraarticulos (idCompra, idArticulos) VALUES ("+idCompra+", "+body.Id+")"
      )
    }

    return res.redirect("/compra");
  },
};
