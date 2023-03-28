/**
 * UsuariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
    
    get: async(request, response) => {
        var search="";
        const query = "SELECT * FROM usuarios";
        var select = await Usuarios.getDatastore().sendNativeQuery(query);
        select = JSON.parse(JSON.stringify(select.rows));
        if(request.query.search){
            if(isNaN(request.query.search)){
                search =(request.query.search).toLowerCase();
            }else search = request.query.search;
        }
        return response.view('pages/usuarios', {
            layout: 'layouts/layout',
            users_data: select,
            search : search,
            admin : response.data_user.tipoUsuario
        });      
    },
    getNuevo: async(request, response) => {
        return response.view('pages/nuevo-usuario', {
            layout: 'layouts/layout',
            admin : response.data_user.tipoUsuario
        })
    },
    getUsuario: async(request, response) => {
        const id = request.param("id");
        var query = "SELECT * FROM usuarios WHERE idUsuario="+id+" LIMIT 1";
        var select = await Usuarios.getDatastore().sendNativeQuery(query);
        const selectUsuario = JSON.parse(JSON.stringify(select.rows[0]))
        query = "SELECT * FROM persona WHERE idPersona="+selectUsuario.idPersona+" LIMIT 1";
        select = await Persona.getDatastore().sendNativeQuery(query);
        const selectPersona = JSON.parse(JSON.stringify(select.rows[0]))
        return response.view('pages/editar-usuario', {
            layout: 'layouts/layout',
            usuario : selectUsuario,
            persona : selectPersona,
            admin : response.data_user.tipoUsuario
        });
    },
    
    post : async(request, response) => {
        var columnas="(nombre, correo, activo)";
        const body = request.body
        var valores="('"+body["nombre"]+"', '"+body["correo"]+"', "+body["activo"]+")";
        var resultado = await Persona.getDatastore().sendNativeQuery(
            "INSERT INTO persona "+columnas+" VALUES "+valores
        );
        const select = await Persona.getDatastore().sendNativeQuery(
            "SELECT * FROM persona WHERE nombre='"+body["nombre"]+"' AND correo='"+body["correo"]+"' LIMIT 1"
        )
        const persona = JSON.parse(JSON.stringify(select.rows[0]));
        columnas="(usuario, psw, activo, tipoUsuario, idPersona)";
        valores="('"+body["usuario"]+"', '"+body["psw"]+"', "+body["activo"]+", "+body["tipoUsuario"]+", "+persona.idPersona+")"
        resultado = await Usuarios.getDatastore().sendNativeQuery(
            "INSERT INTO usuarios "+columnas+" VALUES "+valores
        );
        return response.send({success:'ok'});
    },
    actualizar: async(request, response) => {
        const idUsuario = request.param("id");
        const body = request.body;
        var select = await Usuarios.getDatastore().sendNativeQuery(
            "SELECT * FROM usuarios WHERE idUsuario="+idUsuario+" LIMIT 1"
        );
        select = JSON.parse(JSON.stringify(select.rows[0]));
        var update="usuario='"+body["usuario"]+"', psw='"+body["psw"]+"', activo="+body["activo"]+", tipoUsuario="+body["tipoUsuario"]
        await Usuarios.getDatastore().sendNativeQuery(
            "UPDATE usuarios SET "+update+" WHERE idUsuario="+idUsuario
        );
        update="nombre='"+body["nombre"]+"', correo='"+body["correo"]+"', activo="+body["activo"];
        await Persona.getDatastore().sendNativeQuery(
            "UPDATE persona SET "+update+" WHERE idPersona="+select.idPersona
        );
        return response.send({success:'ok'});
    },
    eliminar: async(request, response) => {
        var user = await Usuarios.getDatastore().sendNativeQuery(
            "SELECT * FROM usuarios WHERE idUsuario="+request.param("id")+" LIMIT 1"
        );
        user = JSON.parse(JSON.stringify(user.rows[0]));
        await Usuarios.getDatastore().sendNativeQuery(
            "DELETE FROM usuarios WHERE idUsuario="+user.idUsuario
        );
        await Persona.getDatastore().sendNativeQuery(
            "DELETE FROM persona WHERE idPersona="+user.idPersona
        );
        return response.send({success: 'ok'})
    },
    

};

