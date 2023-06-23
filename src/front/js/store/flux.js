import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user:{email:"", 
			password:"", 
			role: "",
			},
		company: {
			email:"",
			password:"",
			role:"",
			direccion:""
		},
		isloged: false,
		current_user_data: {
		}
	},
		actions: {
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
			signupCompanies: (email, password, role, nombre, cif, direccion, delivery, reserva, horarios ) => {
			const newUser = { // lo que se ponga aquí tiene que coincidir con el back nombre: 
				email : email,
				password : password,
				role: role,
				direccion: direccion,
				nombre: nombre,
				cif: cif,
				delivery: delivery,
				reserva: reserva,
				horarios: horarios
			}
			fetch(process.env.BACKEND_URL + "api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newUser)
			})
			.then (response => response.json())
			.then (response => console.log({email:response.user.email, password: response.user.password, role: response.user.role, direccion: response.user.direccion}))
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
			}	
		}
	}
};

export default getState
