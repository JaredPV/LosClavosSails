/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require("jwt-simple");
const Usuario = require("../policies/Usuario");
module.exports = {
    getLogin: async(request, response) => {
        return response.view('pages/login', {
			layout: 'layouts/public'
		});
    },
    getLogout: async(request, response) => {
        response.cookie("token-vendedor", '', {
			maxAge: 0,
			overwrite: true
		});
		return response.redirect("/");
    },
    postLogin: async(request, response) => {
        const user = await Usuarios.getDatastore().sendNativeQuery(
            "SELECT * FROM usuarios WHERE usuario='"+request.body.usuario+"' AND psw='"+request.body.psw+"' LIMIT 1"
        );
		if(!user.rows) throw "El usuario no fue encontrado.";
		const send_user = JSON.parse(JSON.stringify(user.rows[0]));
		const token = jwt.encode(send_user.idUsuario, "proyectoFinal");
		response.cookie("token-vendedor", token, {
			maxAge: 86400000,
			overwrite: true
		});
		return response.redirect("/");
    },
    getRecover: async(request, response) => {
        return response.view('pages/recover', {
			layout: 'layouts/public'
		});
    },
    postRecover: async(request, response) => {
        const user = await Persona.getDatastore().sendNativeQuery(
            "SELECT * FROM persona WHERE correo='"+request.body.correo+"' LIMIT 1"
        );
        var datos="";
        if(!user.rows){
            throw "El correo no fue encontrado.";
        }else{
            datos = JSON.parse(JSON.stringify(user.rows[0]));
            await Usuarios.getDatastore().sendNativeQuery(
                "UPDATE usuarios SET psw='"+request.body.psw+"' WHERE idPersona="+datos.idPersona
            );
        } 
        return response.redirect("/");
    },    

};

