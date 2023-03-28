new Vue({
	el: "#formulario", 
	data: {
		formulario: data_formulario,
	},
	methods: {
		alerta: function (event) {
	  		Swal.fire('PRODUCTO REGISTRADO', 'El registro del producto ha sido exitoso','success')
			    .then(() => {
			       window.location.href = '/productos'; 
			    });
	    },
	    alertaEdicion: function (event) {
	  		Swal.fire('PRODUCTO ACTUALIZADO', 'El registro del producto se ha actualizado con exito','success').then(() => {
			       window.location.href = '/productos'; 
			    });
	    },
	    alertaEliminar: function (event) {
	  		Swal.fire('PRODUCTO ELIMINADO', 'El registro del producto se ha eliminado de la base de datos', 'success').then(() => {
			       window.location.href = '/productos'; 
			    });
	    },
		sendData: function(){
			
			if(this.formulario.nombre == ""){
				return Swal.fire('Error', 'Es necesario colocar un nombre','error');
            };
            if(this.formulario.descripcion == ""){
				return Swal.fire('Error', 'Es necesario colocar una descripción','error');
            };
			if(this.formulario.precioCompra == ""){
				return Swal.fire('Error', 'Es necesario colocar un precio de compra','error');
            };
            if(this.formulario.precioVenta == ""){
				return Swal.fire('Error', 'Es necesario colocar un precio de venta','error');
            };
            if(this.formulario.fecha == ""){
				return Swal.fire('Error', 'Es necesario colocar una fecha','error');
            };
            if(this.formulario.activo == "Seleccione una opción"){
				return Swal.fire('Error', 'Es necesario colocar un estatus','error');
            };
            if(this.formulario.cantidad == ""){
				return Swal.fire('Error', 'Es necesario colocar una cantidad','error');
            };
            

			document.getElementById("loading").style.display = "block";
			fetch('/v1/nuevo-producto', {
                method: 'POST',
                body: JSON.stringify(this.formulario),
                headers:{
                	'Content-Type': 'application/json'
                }
            }).then(() => {
			    document.getElementById("loading").style.display = "none";
            	this.alerta();
			}).catch(function (error){
            	Swal.fire("Error","Error al guardar registro del producto: " + error,'error');
                console.error(error);
            });
		},
		actualizarProducto: function(id){
			if(this.formulario.nombre == ""){
				return Swal.fire('Error', 'Es necesario colocar un nombre','error');
            };
            if(this.formulario.descripcion == ""){
				return Swal.fire('Error', 'Es necesario colocar una descripción','error');
            };
			if(this.formulario.precioCompra == ""){
				return Swal.fire('Error', 'Es necesario colocar un precio de compra','error');
            };
            if(this.formulario.precioVenta == ""){
				return Swal.fire('Error', 'Es necesario colocar un precio de venta','error');
            };
            if(this.formulario.fecha == ""){
				return Swal.fire('Error', 'Es necesario colocar una fecha','error');
            };
            if(this.formulario.activo == "Seleccione una opción"){
				return Swal.fire('Error', 'Es necesario colocar un estatus','error');
            };
            if(this.formulario.cantidad == ""){
				return Swal.fire('Error', 'Es necesario colocar una cantidad','error');
            };
			document.getElementById("loading").style.display = "block";
			fetch('/v1/actualizar-producto/' + id, {
                method: 'POST',
                body: JSON.stringify(this.formulario),
                headers:{
                	'Content-Type': 'application/json'
                }
            }).then(() => {
            	document.getElementById("loading").style.display = "none";
            	this.alertaEdicion(); 
			}).catch(function (error){
				Swal.fire("Error","Error al actualizar el registro del producto: " + error,'error');
                console.error(error);
            });
			
		},
		eliminarProducto: function(id){
			Swal.fire({
			  title: 'Cuidado, eliminando registro del producto...',
			  text: "El registro se eliminara definitivamente",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Eliminar'
			}).then((result) => {
				if (result.isConfirmed) {
					fetch('/v1/eliminar-producto/' + id, {
	                method: 'POST',
	                body: JSON.stringify(this.formulario),
	                headers:{
	                	'Content-Type': 'application/json'
	                }
		            }).then(() => {
		            	this.alertaEliminar(); 
					}).catch(function (error){
		            	Swal.fire("Error","Error al eliminar el registro del producto: " + error,'error');
		                console.error(error);
		            });
		        }
			});
			
		}
	},
	
})