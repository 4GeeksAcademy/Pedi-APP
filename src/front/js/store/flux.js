import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      empresa: {
        /*dia: "", o horario: {lunes: {mañana: "", tarde: ""}*/
      },

      isloged: false,
      current_user_data: {},
      product: {},
      searchCompany: [],
      // company: null,
    },

    actions: {
      signupCliente: async (
        nombre,
        apellido,
        telefono,
        nacimiento,
        sexo,
        calleNumero,
        pisoPuerta,
        instrucciones,
        codigoPostal,
        estado,
        ciudad
      ) => {
        const store = getStore();
        const newClient = {
          //lo que ponga aqui tiene que coincidir con el models
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          nacimiento: nacimiento,
          sexo: sexo,
          direccion: `${calleNumero}, ${pisoPuerta}, ${codigoPostal}, ${estado}, ${ciudad}`,
          instrucciones: instrucciones,
          email: store.user.email,
          password: store.user.password,
          role: store.user.role,
        };
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signupCliente",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newClient),
            }
          );
          const result = await response.json();
          Swal.fire(result.message);
          if (response.status == 200) {
            console.log(response);
            return true;
          }
          return false;
        } catch (error) {
          console.log(error);
        }
      },
      getNewUser: (email, password, role) => {
        setStore({
          user: {
            email: email,
            password: password,
            role: role,
          },
        });
      },

      signupEmpresa: async (
        nombre,
        cif,
        calleNumero,
        pisoPuerta,
        codigoPostal,
        estado,
        ciudad,
        delivery,
        reserva,
        mañana,
        tarde,
        img,
        categories,
        banner
      ) => {
        const store = getStore();
        console.log(
          nombre,
          cif,
          calleNumero,
          pisoPuerta,
          codigoPostal,
          estado,
          ciudad,
          delivery,
          reserva,
          mañana,
          tarde,
          img
        );
        const newUser = {
          // lo que se ponga aquí tiene que coincidir con el back nombre:
          role: store.user.role,
          email: store.user.email,
          password: store.user.password,
          direccion: `${calleNumero}, ${pisoPuerta}, ${codigoPostal}, ${ciudad}, ${estado}`,
          nombre: nombre,
          cif: cif,
          reserva: reserva,
          delivery: delivery,
          mañana: mañana,
          tarde: tarde,
          img: img,
          categories: categories,
          banner: banner,
          /*dia: {lunes,martes...} o 	dia: dia, o horario: {lunes: {mañana: "", tarde: ""}*/
        };
        console.log(newUser);
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signupEmpresa",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            }
          );
          const result = await response.json();
          Swal.fire(result.message);
          if (response.status == 200) {
            return true;
          }
          return result.message;
        } catch (error) {
          console.log(error);
        }
      },

      login_handlinator: async (user) => {
        const store = getStore();
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();

          if (response.status == 200) {
            localStorage.setItem("jwt-token", result.token);
            setStore({ isloged: true });
            setStore({ jwt_token: result.token });
            /*  EDITAR ESTO CON LA INFO DEL USUARIO QUE HAGA FALTA*/
            if (result.userdata.role == "Cliente") {
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  nombre: result.userdata.nombre,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  direccion: result.userdata.direccion,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  role: result.userdata.role,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  email: result.userdata.email,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  telefono: result.userdata.telefono,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  id: result.userdata.id,
                },
              });
            } else if (result.userdata.role == "Empresa") {
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  nombre: result.userdata.nombre,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  direccion: result.userdata.direccion,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  role: result.userdata.role,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  idEmpresa: result.userdata.id,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  cif: result.userdata.cif,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  email: result.userdata.email,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  delivery: result.userdata.delivery,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  reserva: result.userdata.reserva,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  mañana: result.userdata.horario.mañana,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  tarde: result.userdata.horario.tarde,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  id: result.userdata.id,
                },
              });
            }

            localStorage.setItem(
              "user",
              JSON.stringify(store.current_user_data)
            );

            return true;
          } else {
            return result.message;
          }
        } catch (error) {
          console.log("Error loading message from backend");
        }
      },

      isloged: () => {
        const token = localStorage.getItem("jwt-token");
        const user = localStorage.getItem("user");

        // Check if the token exists and is not expired
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
          const currentTime = Date.now();

          if (currentTime >= expirationTime) {
            Swal.fire("Session timed out");
            setStore({ isloged: false });
            localStorage.clear();
            return false;
          }

          setStore({ jwt_token: token });
          setStore({ isloged: true });
          setStore({ current_user_data: JSON.parse(user) });
          return true;
        }

        // Token doesn't exist
        setStore({ isloged: false });
        localStorage.clear();
        return false;
      },
      search_handlinator: async (address) => {
        const store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/address",
            {
              method: "POST",
              body: JSON.stringify(address),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();

          if (response.status == 200) {
            setStore({
              current_user_data: {
                ...store.current_user_data,
                direccion: result,
              },
            });

            return "exito";
          } else {
            return result.message;
          }
        } catch (error) {
          console.log("Error loading message from backend");
        }
      },
      category_loadinator: () => {
        fetch(process.env.BACKEND_URL + "/api/category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => setStore({ categories: result.categories }))
          .catch((error) => console.log("error", error));
      },
      top_5_loadinator: () => {
        fetch(process.env.BACKEND_URL + "/api/top_sales", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => setStore({ top_5: result.top_5_data }))
          .catch((error) => console.log("error", error));
      },

      searchEmpresa: (nombre) => {
        const store = getStore();
        const busquedaEmpresa = {
          // lo que se ponga aquí tiene que coincidir con el back nombre:
          nombre: nombre,
        };
        console.log(busquedaEmpresa);
        fetch(process.env.BACKEND_URL + "/api/searchEmpresa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(busquedaEmpresa),
        })
          .then((response) => response.json())
          .then((result) => setStore({ searchCompany: result }))
          .catch((error) => console.log(error));
      },

      filterDelivery: () => {
        const store = getStore();

        fetch(process.env.BACKEND_URL + "/api/filterDelivery", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => setStore({ searchCompany: result }))
          .catch((error) => console.log(error));
      },

      filterFavorites: () => {
        const store = getStore();
        const filtrarfavoritos = {
          // lo que se ponga aquí tiene que coincidir con el back nombre:
          idCliente: store.current_user_data.id,
        };
		const token = localStorage.getItem('jwt-token');
        fetch(process.env.BACKEND_URL + "/api/filterFavorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
			'Authorization': 'Bearer '+token
          },
          body: JSON.stringify(filtrarfavoritos),
        })
          .then((response) => response.json())
		  .then((result) => { 
			if(response.status == 401){
				Swal.fire(result.msg)
				
				navigate("/", { replace: true });

			}
		  })
          .then((result) => setStore({ searchCompany: result }))
          .catch((error) => console.log(error));
      },

      img_uploadinator: async (img) => {
        const store = getStore();

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/companyimg",
            {
              method: "POST",
              body: img,
            }
          );
          const result = await response.json();
          if (response.status == 400) {
            return { message: "Max image size is 10MB" };
          } else if (response.status == 200) {
            return result;
          } else {
            return { message: "Error uploading image" };
          }
        } catch (error) {
          console.log("Error loading message from backend");
        }
      },
      logoutinator: () => {
        setStore({ isloged: false });
        localStorage.clear();
      },
      addProduct: async (nombre, precio, descripcion, img) => {
        const store = getStore();
        const newProduct = {
          nombre: nombre,
          precio: precio,
          descripcion: descripcion,
          idEmpresa: store.current_user_data.idEmpresa,
          img: img,
        };
        console.log(newProduct);
        try {
          const token = localStorage.getItem("jwt-token");
          const response = await fetch(
            process.env.BACKEND_URL + "/api/addProduct",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
              },
              body: JSON.stringify(newProduct),
            }
          );
          const result = await response.json();
		  if(response.status == 401){
			Swal.fire(result.msg)
			
			navigate("/", { replace: true });

		}
          Swal.fire(result.message);
          if (response.status == 200) {
            console.log(response);
            return true;
          }
          return false;
        } catch (error) {
          console.log(error);
        }
      },
      buyProduct: (nombre, precio, descripcion, img, cantidad, id) => {
        setStore({
          product: {
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            img: img,
            cantidad: cantidad,
            id: id,
          },
        });
      },
      checkout_configurator(checkout_data) {
        const store = getStore();
        if (getActions().isloged()) {
          setStore({ checkout_data: checkout_data });
          return true;
        } else {
          return false;
        }
        /*this in checkoutform */
      },
    },
  };
};

export default getState;
