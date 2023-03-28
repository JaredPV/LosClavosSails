new Vue({
	el: "#formulario", 
	data: {
		formulario: data_formulario,
	},
	methods: {
		alerta: function (event) {
	  		Swal.fire('USUARIO REGISTRADO', 'El registro del usuario ha sido exitoso','success')
			    .then(() => {
			       window.location.href = '/usuarios'; 
			    });
	    },
	    alertaEdicion: function (event) {
	  		Swal.fire('USUARIO ACTUALIZADO', 'El registro del usuario se ha actualizado con exito','success').then(() => {
			       window.location.href = '/usuarios'; 
			    });
	    },
	    alertaEliminar: function (event) {
	  		Swal.fire('USUARIO ELIMINADO', 'El registro del usuario se ha eliminado de la base de datos', 'success').then(() => {
			       window.location.href = '/usuarios'; 
			    });
	    },
		sendData: function(){
			
			if(this.formulario.nombre == ""){
				return Swal.fire('Error', 'Es necesario colocar un nombre','error');
            };
            if(this.formulario.correo == ""){
				return Swal.fire('Error', 'Es necesario colocar un correo electrónico','error');
            };
			if(this.formulario.usuario == ""){
				return Swal.fire('Error', 'Es necesario colocar un usuario','error');
            };
            if(this.formulario.psw == ""){
				return Swal.fire('Error', 'Es necesario colocar una contraseña','error');
            };
            if(this.formulario.tipoUsuario == "Seleccione una opción"){
				return Swal.fire('Error', 'Es necesario colocar el tipo de usuario','error');
            };
            if(this.formulario.activo == "Seleccione una opción"){
				return Swal.fire('Error', 'Es necesario colocar un estatus','error');
            };
            

			document.getElementById("loading").style.display = "block";
			fetch('/v1/nuevo-usuario', {
                method: 'POST',
                body: JSON.stringify(this.formulario),
                headers:{
                	'Content-Type': 'application/json'
                }
            }).then(() => {
			    document.getElementById("loading").style.display = "none";
            	this.alerta();
			}).catch(function (error){
            	Swal.fire("Error","Error al guardar registro del usuario: " + error,'error');
                console.error(error);
            });
		},
		actualizarUsuario: function(id){
			if(this.formulario.nombre == ""){
				return Swal.fire('Error', 'Es necesario colocar un nombre','error');
            };
            if(this.formulario.correo == ""){
				return Swal.fire('Error', 'Es necesario colocar un correo electrónico','error');
            };
			if(this.formulario.usuario == ""){
				return Swal.fire('Error', 'Es necesario colocar un usuario','error');
            };
            if(this.formulario.psw == ""){
				return Swal.fire('Error', 'Es necesario colocar una contraseña','error');
            };
            if(this.formulario.tipoUsuario == "Seleccione una opción"){
				return Swal.fire('Error', 'Es necesario colocar el tipo de usuario','error');
            };
            if(this.formulario.activo == "Seleccione una opción"){
				return Swal.fire('Error', 'Es necesario colocar un estatus','error');
            };
			document.getElementById("loading").style.display = "block";
			fetch('/v1/actualizar-usuario/' + id, {
                method: 'POST',
                body: JSON.stringify(this.formulario),
                headers:{
                	'Content-Type': 'application/json'
                }
            }).then(() => {
            	document.getElementById("loading").style.display = "none";
            	this.alertaEdicion(); 
			}).catch(function (error){
				Swal.fire("Error","Error al actualizar el registro del usuario: " + error,'error');
                console.error(error);
            });
			
		},
		eliminarUsuario: function(id){
			Swal.fire({
			  title: 'Cuidado, eliminando registro de usuario...',
			  text: "El registro se eliminara definitivamente",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Eliminar'
			}).then((result) => {
				if (result.isConfirmed) {
					fetch('/v1/eliminar-usuario/' + id, {
	                method: 'POST',
	                body: JSON.stringify(this.formulario),
	                headers:{
	                	'Content-Type': 'application/json'
	                }
		            }).then(() => {
		            	this.alertaEliminar(); 
					}).catch(function (error){
		            	Swal.fire("Error","Error al eliminar el registro del usuario: " + error,'error');
		                console.error(error);
		            });
		        }
			});
			
		}
	},
	
})