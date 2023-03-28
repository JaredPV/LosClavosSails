/**
 * VentaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { PDFDocument } = require("pdf-lib");
const {readFile, writeFile} = require('fs/promises');
const fs = require('fs');

async function crearPDF(input,output,body){
  try {
    const pdfDoc = await PDFDocument.load(await readFile(input))
    const form = pdfDoc.getForm()
    form.getTextField("sr").setText(body.NombreFactura)
    form.getTextField("direccion").setText(body.DireccionFactura)
    form.getTextField("ciudad").setText(body.CiudadFactura)
    form.getTextField("telefono").setText(body.TelefonoFactura)

    const hoy = new Date()
    const yyyy = hoy.getFullYear()
    let mm = hoy.getMonth()+1
    let dd = hoy.getDate()
    const vencimiento = new Date(yyyy,mm,0)
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    form.getTextField("emision").setText(dd+'/'+mm+'/'+yyyy)
    dd = vencimiento.getDate()    
    form.getTextField("vencimiento").setText(dd+'/'+mm+'/'+yyyy)

    if (Array.isArray(body.Nombre)) {
      for (let index = 0; index < body.Nombre.length; index++) {
        if(index==0){
          form.getTextField("item").setText(body.Nombre[index])
          form.getTextField("precio").setText("$ "+body.Unitario[index]+".00")
          form.getTextField("cantidad").setText(body.Numero[index])
          form.getTextField("totalItem").setText("$ "+body.Subtotal[index]+".00")
        }else{
          form.getTextField("item").setText(form.getTextField("item").getText()+"\n"+body.Nombre[index])
          form.getTextField("precio").setText(form.getTextField("precio").getText()+"\n$ "+body.Unitario[index]+".00")
          form.getTextField("cantidad").setText(form.getTextField("cantidad").getText()+"\n"+body.Numero[index])
          form.getTextField("totalItem").setText(form.getTextField("totalItem").getText()+"\n$ "+body.Subtotal[index]+".00")
        }
        
      }
    }else{
      form.getTextField("item").setText(body.Nombre)
      form.getTextField("precio").setText("$ "+body.Unitario+".00")
      form.getTextField("cantidad").setText(body.Numero)
      form.getTextField("totalItem").setText("$ "+body.Subtotal+".00")
    }
    var total = parseInt(body.Total) * 1.16
    total = total.toFixed(2).toString()
    form.getTextField("subtotal").setText("$ "+body.Total+".00")
    form.getTextField("total").setText("$ "+total)

    const pdfBytes = await pdfDoc.save()
    await writeFile(output,pdfBytes)
    console.log('PDF creado');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  get: async(req,res)=>{
    var select = await Articulos.getDatastore().sendNativeQuery(
        "SELECT * FROM articulos a INNER JOIN inventario i ON a.idArticulos=i.idArticulos WHERE a.activo=1 AND i.cantidad>0"
    )
    select = JSON.parse(JSON.stringify(select.rows))
    return res.view('pages/venta',{
        layout: 'layouts/layout',
        admin: res.data_user.tipoUsuario,
        articulos: select
    })
  },
  getProducto: async(req,res)=>{
    var select = await Articulos.getDatastore().sendNativeQuery(
      "SELECT * FROM articulos a INNER JOIN inventario i on a.idArticulos=i.idArticulos WHERE a.idArticulos="+req.params.id
    )
    if(select.rows.length==0){
      return res.json({})
    }
    select = JSON.parse(JSON.stringify(select.rows[0]))
    return res.json(select)
  },
  postFactura: async(req,res)=>{
    const body = req.body
    console.log(body);
    const nombrePDF = "factura_" + Date.now() +".pdf"
    await crearPDF('./assets/templates/Factura_Plantilla.pdf','./assets/templates/'+nombrePDF,body)

    fs.readFile('./assets/templates/'+nombrePDF,function(err,data){
      res.contentType("application/pdf")
      res.send(data)
    })
  },
  postVenta: async(req,res)=>{
    const body = req.body
    if (Array.isArray(body.Id)) {
      for (let index = 0; index < body.Id.length; index++) {
        await Inventario.getDatastore().sendNativeQuery(
          "UPDATE inventario SET cantidad = cantidad-"+body.Numero[index]+" WHERE idArticulos="+body.Id[index]
        )
      }
    }else{
      await Inventario.getDatastore().sendNativeQuery(
        "UPDATE inventario SET cantidad = cantidad-"+body.Numero+" WHERE idArticulos="+body.Id
      )
    }
    return res.redirect("/")
  }

};