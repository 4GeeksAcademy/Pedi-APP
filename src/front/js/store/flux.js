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
		}
		},
		actions: {
			// Use getActions to call a function within a fuction
			getNewUser: (email, password, role) => {
				const { setStore } = getActions();
				setStore((prevState) => ({
					...prevState,
					user: {
						...prevState.user,
						email: email,
						password: password,
						role: role
					}
				}));
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
			}
			

			
		}
	};
};

export default getState;
