import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			user:{nombre: "",
				apellido:"",
				telefono:"",
				nacimiento:"",
				direccion:"",
				email:"", 
				password:"", 
				role: "",
			},
			empresa: {
				email:"",
				password:"",
				role:"",
				direccion:"",
				nombre: "",
				delivery: "",
				mañana: "",
				tarde:"",
				cif: "",
				reserva: ""
			},

			isloged: false,
			current_user_data: {

			}
		},
		
		actions: {
			signupCliente:(nombre, apellido, telefono, nacimiento, sexo, calleNumero, pisoPuerta, instrucciones, codigoPostal, estado, ciudad) => {
				const store= getStore()
				const newClient = { //lo que ponga aqui tiene que coincidir con el models
					nombre : nombre,
					apellido: apellido,
					telefono : telefono,
					nacimiento: nacimiento,
					sexo: sexo,
					direccion: `${calleNumero}, ${pisoPuerta}, ${instrucciones}, ${codigoPostal}, ${estado}, ${ciudad}`,
					email: store.user.email,
					password: store.user.password,
					role: store.user.role

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
			},

			// Use getActions to call a function within a fuction
			getNewUser: (email, password, role) => {
				setStore({
					user: {
						email: email,
						password: password,
						role: role
					}
				});
			},
			signupEmpresa: (email, password, role, nombre, cif, calleNumero, pisoPuerta, codigoPostal, estado, ciudad, delivery, reserva, horarios ) => {
			const newUser = { // lo que se ponga aquí tiene que coincidir con el back nombre: 
				email : email,
				password : password,
				role: role,
				nombre: nombre,
				cif: cif,
				delivery: delivery,
				reserva: reserva,
				horarios: horarios,
				direccion: `${calleNumero}, ${pisoPuerta}, ${codigoPostal}, ${estado}, ${ciudad}`
			}
			fetch(process.env.BACKEND_URL + "api/signupEmpresa", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newUser)
			})
			.then (response => response.json())
			.then (response => console.log({user: {id: response.user.id, email:response.user.email, password: response.user.password, role: response.user.role}, empresa: {id: response.empresa.id, direccion: response.empresa.direccion, cif: response.empresa.cif, delivery: response.empresa.delivery, reserve: response.empresa.reserve, horarios: response.empresa.horarios}}))
			.catch(error => console.log(error))
		},
			
			login_handlinator: async (user) => {
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
						
						/*  EDITAR ESTO CON LA INFO DEL USUARIO QUE HAGA FALTA*/
						setStore({current_user_data:{ nombre : result.userdata.nombre}})
						setStore({current_user_data:{ direccion : result.userdata.direccion}})
						
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
			search_handlinator : (address) =>{

				/*add geopy stuff Here -------------------------------------------------------------------------------*/

				setStore({user: {direccion: address}})
				
			},
			category_loadinator : () =>{
				
				  
				fetch("https://diuca-x-congenial-space-trout-x66jxv9w4r526v9q-3001.preview.app.github.dev/api/category", {
					method:"GET",
					headers: { 
						"Content-Type": "application/json",
						} 
				})
				.then(response => response.json())
				.then(result =>setStore({"categories" : result.categories }) )
					/*setStore({"categories" : result.categories }) */
				.catch(error => console.log('error', error));
			}


		}
	}
};


export default getState;

