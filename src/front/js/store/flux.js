import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			isloged: false,
			current_user_data: {

			}
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
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			}
			

			
		}
	};
};

export default getState;
