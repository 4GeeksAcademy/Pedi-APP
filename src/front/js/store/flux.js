import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      cart: {
        products: [],
        ammount: 0,
      },
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
          if (response.status == 200) {
            console.log(response);
            return true;
          }
          return result.message;
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
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  lat: result.userdata.lat,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  lng: result.userdata.lng,
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
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  lat: result.userdata.lat,
                },
              });
              setStore({
                current_user_data: {
                  ...store.current_user_data,
                  lng: result.userdata.lng,
                },
              });
            }

            localStorage.setItem(
              "user",
              JSON.stringify(store.current_user_data)
            );
            getActions().favorites_loadinator();
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
        const cart = localStorage.getItem("cart");

        // Check if the token exists and is not expired
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
          const currentTime = Date.now();

          if (currentTime >= expirationTime) {
            toast.error("Session timed out", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setStore({ isloged: false });
            localStorage.clear();
            return false;
          }

          setStore({ jwt_token: token });
          setStore({ isloged: true });
          setStore({ current_user_data: JSON.parse(user) });
          setStore({ cart: JSON.parse(cart) });
          if (cart == null) {
            setStore({
              cart: {
                products: [],
                ammount: 0,
              },
            });
          }
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
                direccion: result.address,
              },
            });
            setStore({
              current_user_data: {
                ...store.current_user_data,
                lng: result.coordinates[1],
              },
            });
            setStore({
              current_user_data: {
                ...store.current_user_data,
                lat: result.coordinates[0],
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

      filterFavorites: async () => {
        const store = getStore();
        const filtrarfavoritos = {
          // lo que se ponga aquí tiene que coincidir con el back nombre:
          idCliente: store.current_user_data.id,
        };
        const token = localStorage.getItem("jwt-token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/filterFavorites",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: JSON.stringify(filtrarfavoritos),
            }
          );
          const result = await response.json();

          if (response.status == 401) {
            toast.error(result.msg, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            navigate("/", { replace: true });
          }
          setStore({ searchCompany: result });
        } catch (error) {
          console.log("Error loading message from backend");
        }
      },
      caregory_filtrator: async (category) => {
        const store = getStore();
        const response = await fetch(
          process.env.BACKEND_URL + "/api/filter_category",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
          }
        );

        const result = await response.json();
        setStore({ searchCompany: result });
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
        setStore({ current_user_data: {} });
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

        try {
          const token = localStorage.getItem("jwt-token");
          const response = await fetch(
            process.env.BACKEND_URL + "/api/addProduct",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: JSON.stringify(newProduct),
            }
          );
          const result = await response.json();
          if (response.status == 401) {
            toast.error(result.msg, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            navigate("/", { replace: true });
          }
          if (response.status == 200) {
            console.log(response);
            return true;
          }
          return false;
        } catch (error) {
          console.log(error);
        }
      },
      buyProduct: (
        nombre,
        precio,
        descripcion,
        img,
        cantidad,
        id,
        company_id,
        company_name
      ) => {
        const store = getStore();
        let newProduct = {
          nombre: nombre,
          precio: precio,
          descripcion: descripcion,
          img: img,
          cantidad: cantidad,
          id: id,
          company_id: company_id,
          company_name: company_name,
        };

        let company_exists = store.cart.products.findIndex((x) => {
          return x.hasOwnProperty(company_id);
        });

        if (company_exists != -1) {
          let product_exists = store.cart.products[company_exists][
            company_id
          ].findIndex((x) => x.id === newProduct.id);
          if (product_exists != -1) {
            newProduct.cantidad =
              store.cart.products[company_exists][company_id][product_exists]
                .cantidad + 1;
            let products = store.cart.products;
            products[company_exists][company_id][product_exists] = newProduct;
            setStore({
              cart: {
                products: products,
                ammount: store.cart.ammount,
              },
            });
          } else {
            let products = store.cart.products;

            products[company_exists][company_id].push(newProduct);
            setStore({
              cart: {
                products: products,
                ammount: store.cart.ammount,
              },
            });
          }
        } else {
          console.log(store.cart.products);
          setStore({
            cart: {
              products: [
                ...store.cart.products,
                { [company_id]: [newProduct] },
              ],
              ammount: store.cart.ammount + 1,
            },
          });
        }

        localStorage.setItem("cart", JSON.stringify(store.cart));
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
      top_5_searchinator: () => {
        const store = getStore();
        setStore({ searchCompany: store.top_5 });
      },
      product_deletinator: (product_id, company_id) => {
        const store = getStore();
        let products = store.cart.products;

        let company_index = products.findIndex((x) => {
          return x.hasOwnProperty(company_id);
        });

        let company_products = products[company_index][company_id];

        let product_index = company_products.findIndex(
          (x) => x.id === product_id
        );
        company_products.splice(product_index, 1);
        if (company_products.length > 0) {
          products[company_index][company_id] = company_products;
          setStore({
            cart: {
              products: products,
              ammount: store.cart.ammount,
            },
          });
          localStorage.setItem("cart", JSON.stringify(store.cart));
        } else {
          getActions().company_deletinator(company_id);
        }
      },
      company_deletinator: (company_id) => {
        const store = getStore();
        let products = store.cart.products;

        let company_index = products.findIndex((x) => {
          return x.hasOwnProperty(company_id);
        });

        products.splice(company_index, 1);
        setStore({
          cart: {
            products: products,
            ammount: store.cart.ammount - 1,
          },
        });
        localStorage.setItem("cart", JSON.stringify(store.cart));
      },
      favorites_loadinator: async () => {
        const store = getStore();
        console.log(store.current_user_data.id);
        try {
          const token = localStorage.getItem("jwt-token");
          const response = await fetch(
            process.env.BACKEND_URL +
              `/api/favorites/${store.current_user_data.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          const result = await response.json();
          if (response.status == 401) {
            toast.error(result.msg, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          if (response.status == 200) {
            setStore({
              current_user_data: {
                ...store.current_user_data,
                user_fav: result,
              },
            });
          }
          return false;
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
