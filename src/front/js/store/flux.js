const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user:{nombre: "",
				apellido:"",
				telefono:"",
				nacimiento:"",
				direccion:""


			}
		},
		actions: {
			signupCliente:(nombre, apellido, telefono, nacimiento, sexo, calleNumero, pisoPuerta, instrucciones, codigoPostal, estado, ciudad) => {
				const newClient = { //lo que ponga aqui tiene que coincidir con el models
					nombre : nombre,
					apellido: apellido,
					telefono : telefono,
					nacimiento: nacimiento,
					sexo: sexo,
					direccion: `${calleNumero}, ${pisoPuerta}, ${instrucciones}, ${codigoPostal}, ${estado}, ${ciudad}`
				}
				fetch(process.env.BACKEND_URL + "/api/signupCliente", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newClient)
				})
				.then (response =>response.json())
				.then (response => console.log(response))
				.catch(error => console.log(error))
			}
		}
	};
};

export default getState;
