/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': { action: 'articulos/get'},
  'GET /venta' : {action: 'venta/get'},
  'GET /nueva-compra' : {action: 'compra/getNueva'},
  'GET /login' : {action: 'login/getLogin'},
  'GET /logout' : {action: 'login/getLogout'},
  'GET /recover' : {action: 'login/getRecover'},
  'GET /usuarios' : {action: 'usuarios/get'},
  'GET /usuarios/:id' : {action: 'usuarios/getUsuario'},
  'GET /nuevo-usuario' : {action: 'usuarios/getNuevo'},
  'GET /productos': { action: 'articulos/get'},
  'GET /productos/:id': { action: 'articulos/getProducto'},
  'GET /nuevo-producto': { action: 'articulos/getNuevo'},
  'GET /obtener-producto/:id': {action: 'venta/getProducto'},
  'GET /compra': { action: 'compra/get'},
  'GET /compra/:id': { action: 'compra/getCompra'},

  'POST /v1/nuevo-usuario': { action: 'usuarios/post'},
  'POST /v1/actualizar-usuario/:id': { action: 'usuarios/actualizar'},
  'POST /v1/eliminar-usuario/:id': { action: 'usuarios/eliminar'},
  'POST /v1/nuevo-producto': { action: 'articulos/post'},
  'POST /v1/actualizar-producto/:id': { action: 'articulos/actualizar'},
  'POST /v1/eliminar-producto/:id': { action: 'articulos/eliminar'},
  'POST /v1/login': {action: 'login/postLogin'},
  'POST /v1/recover': {action: 'login/postRecover'},
  'POST /v1/realizar-venta': {action: 'venta/postVenta'},
  'POST /v1/realizar-compra': {action: 'compra/postCompra'},
  'POST /v1/generar-factura': {action: 'venta/postFactura'},
  


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
