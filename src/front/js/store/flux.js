import Swal from "sweetalert2";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			user:{nombre: "",
				apellido:"",
				telefono:"",
				nacimiento:"",
				direccion:"",
				instrucciones: "",
				email:"", 
				password:"", 
				role: "",
			},
			empresa: {
				role:"",
				email:"",
				password:"",
				direccion:"",
				nombre: "",
				cif: "",
				reserva: "",
				delivery: "",
				mañana: "",
				tarde:""
				/*dia: "", o horario: {lunes: {mañana: "", tarde: ""}*/
			},

			isloged: false,
			current_user_data: {

			}
		},
		
		actions: {			
      signupCliente: async (nombre, apellido, telefono, nacimiento, sexo, calleNumero, pisoPuerta, instrucciones, codigoPostal, estado, ciudad) => {
				const store= getStore()
				const newClient = { //lo que ponga aqui tiene que coincidir con el models
					nombre : nombre,
					apellido: apellido,
					telefono : telefono,
					nacimiento: nacimiento,
					sexo: sexo,
					direccion: `${calleNumero}, ${pisoPuerta}, ${codigoPostal}, ${estado}, ${ciudad}`,
					instrucciones: instrucciones,
					email: store.user.email,
					password: store.user.password,
					role: store.user.role
				}
				try{
					const response = await fetch(process.env.BACKEND_URL + "/api/signupCliente", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(newClient)
					})
					const result = await response.json()
					Swal.fire(result.message)
					if(response.status == 200){
						console.log(response)
					}
				}catch(error) {console.log(error)
				}
			},
			getNewUser: (email, password, role) => {
				setStore({
					user: {
						email: email,
						password: password,
						role: role
					}
				});
			},

			signupEmpresa: async (nombre, cif, calleNumero, pisoPuerta, codigoPostal, estado, ciudad, delivery, reserva, mañana, tarde) => {
				const store = getStore()
				console.log(nombre, cif, calleNumero, pisoPuerta, codigoPostal, estado, ciudad, delivery, reserva, mañana, tarde,img)
				const newUser = { // lo que se ponga aquí tiene que coincidir con el back nombre: 
					role: store.user.role,
					email : store.user.email,
					password : store.user.password,
					direccion: `${calleNumero}, ${pisoPuerta}, ${codigoPostal}, ${ciudad}, ${estado}`,
					nombre: nombre,
					cif: cif,
					reserva: reserva,
					delivery: delivery,
					mañana: mañana,
					tarde: tarde,
					img : img
					/*dia: {lunes,martes...} o 	dia: dia, o horario: {lunes: {mañana: "", tarde: ""}*/
				}
				try{
					const response = await fetch(process.env.BACKEND_URL + "/api/signupEmpresa", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newUser)
					})
					const result = await response.json()
					Swal.fire(result.message)
					if(response.status == 200){
						console.log(response)
					}
				}catch(error) {console.log(error)
				}
			},
			
			login_handlinator: async (user) => {
				const store = getStore()
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method : "POST",
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					Swal.fire(result.message)
					if (response.status == 200){
						localStorage.setItem("jwt-token", result.token);
						setStore({isloged:true})
						console.log(result.userdata)
						/*  EDITAR ESTO CON LA INFO DEL USUARIO QUE HAGA FALTA*/
						setStore({current_user_data:{...store.current_user_data, nombre : result.userdata.nombre}})
						setStore({current_user_data:{...store.current_user_data, direccion : result.userdata.direccion}})
						
						return true
					} else {
						
						return false
					}

				}catch(error){
					console.log("Error loading message from backend")
				}		
			},

			isloged: () => {
				

				const token = localStorage.getItem('jwt-token');
  
				// Check if the token exists and is not expired
				if (token) {
					const decodedToken = JSON.parse(atob(token.split('.')[1]));
					const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
					const currentTime = Date.now();

					
					if( currentTime >= expirationTime){
						Swal.fire("session timed out")
						setStore({isloged:false})
						localStorage.clear();
						return false;
					}
					

					

				
				setStore({isloged:true})
				return true;
				}
				
				// Token doesn't exist
				setStore({isloged:false})
				localStorage.clear();
				return false;

			},
			search_handlinator : async (address) =>{
				const store = getStore()
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/address", {
						method : "POST",
						body: JSON.stringify(address),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					
					if (response.status == 200){
	
						setStore({ current_user_data: {...store.current_user_data,direccion: result}})
						
						
						return "exito"
					} else {
						
						return result.message
					}

				}catch(error){
					console.log("Error loading message from backend")
				}		

				
				
			},
			category_loadinator : () =>{
				
				  
				fetch(process.env.BACKEND_URL + "/api/category", {
					method:"GET",
					headers: { 
						"Content-Type": "application/json",
						} 
				})
				.then(response => response.json())
				.then(result =>setStore({"categories" : result.categories }) )
				.catch(error => console.log('error', error));
			},
			top_5_loadinator: () =>{
				fetch(process.env.BACKEND_URL + "/api/top_sales", {
					method:"GET",
					headers: { 
						"Content-Type": "application/json",
						} 
				})
				.then(response => response.json())
				.then(result => setStore({top_5: result.top_5_data}))
				.catch(error => console.log('error', error));

			},
			img_uploadinator: async (img) =>{
				const store = getStore()
				
				
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/companyimg", {
						method : "POST",
						body: img
						
					})
					const result = await response.json()
					if(response.status == 400){
						return {"message" : "Max image size is 10MB"}
					}else if( response.status == 200){
						return result
					} else {					
						return {"message" : "Error uploading image"}
					}
					

				}catch(error){
					console.log("Error loading message from backend")
				}		
			}


		}
	}
};


export default getState;

