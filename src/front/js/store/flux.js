import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			isloged: false,
			current_user_data: {

			}
		},
		actions: {
			// Use getActions to call a function within a fuction
			
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
						console.log(result)
						/*  EDITAR ESTO CON LA INFO DEL USUARIO QUE HAGA FALTA*/
						setStore({current_user_data:{ nombre : result.userdata.nombre}})
						console.log(getStore())
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
	};
};

export default getState;
