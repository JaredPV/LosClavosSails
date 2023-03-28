const jwt = require("jwt-simple");

module.exports = async function (request, response, proceed) {

	const tokenVendedor = request.cookies["token-vendedor"];
	const tokenAdministrador = request.cookies["token-administrador"];

	if (tokenAdministrador) {
		response.cookie('token-administrador', '', {
			maxAge: 0,
			overwrite: true,
		});
	}

	if (!tokenVendedor) {
		return response.redirect("/login");
	}
    var code = jwt.decode(tokenVendedor, "proyectoFinal")
    var data_user= await Usuarios.getDatastore().sendNativeQuery(
        "SELECT * FROM usuarios WHERE idUsuario="+code
    );
	
	if (data_user.rows) {
		response.data_user = JSON.parse(JSON.stringify(data_user.rows[0]));
		return proceed();
	}

	return response.forbidden();
	
};