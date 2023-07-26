"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import (
    db,
    Usuario,
    Cliente,
    Empresa,
    TipoComida,
    TipoComidaEmpresa,
    Productos,
    Factura,
    Reseñas,
    Favoritos,
    HorariosEmpresas,
    HistorialPedidos,
)
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from geopy.geocoders import Nominatim
import os
import cloudinary
import cloudinary.uploader
from datetime import datetime
import stripe
from argon2 import PasswordHasher

ph = PasswordHasher()
stripe.api_key = "sk_test_51NShHZGaOqlS5geCWJ4pA2RkcPB3jcXCFTp15A8ARNaJciSz6ezxsS12MGRrSsfVe1xtTrhlA5W4nyPKqE5w6DBu00vfdqAxLm"




api = Blueprint("api", __name__)

cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), api_secret=os.getenv('API_SECRET'))

def geopy_processinator(address):
    geolocator = Nominatim(user_agent="dishdash")
    location = geolocator.geocode(address, language="es", timeout=None)
    return location

def checkout (product_id, quantity, price, delivery, pay_id, user_id, time, date):
    product = Productos.query.filter_by(id = product_id).first()

    if not product:
        return False

    

    checkoutData = {
        "price": price ,
        "quantity" : quantity,
        "product_id" : product_id,
        "company_id" : product.empresa.id,
        "delivery" : delivery,
        "pay_id": pay_id,
        "user_id" : user_id,
        "time" : time,
        "date" : date
    }
    
    bill_to_add = Factura(idCliente = checkoutData.get("user_id"), idEmpresa = checkoutData.get("company_id"), idPago = checkoutData.get("pay_id"), delivery = checkoutData.get("delivery"),  hora = checkoutData.get("time"), fecha = checkoutData.get("date"))
    db.session.add(bill_to_add)
    db.session.commit()

    history_to_add = HistorialPedidos(idFactura =bill_to_add.id , idProducto = checkoutData.get("product_id") , cantidad = checkoutData.get("quantity"), precioActual = checkoutData.get("price"))
    db.session.add(history_to_add)
    db.session.commit()

    print(history_to_add.serialize())
    print(bill_to_add.serialize())

    return True
    
@api.route("/hello", methods=["POST", "GET"])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def loginator():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Missing mail or password"}), 400
    else:
        hash = ph.hash(password)
        user = Usuario.query.filter_by(email=email).first()
        
        if not user:
            return jsonify({"message": "Wrong username or password"}), 400
        else:
            try:
                if(not ph.verify(user.password,password)):
                    return jsonify({"message": "Wrong username or password"}), 400
            except: 
                return jsonify({"message": "Wrong username or password"}), 400
            role = user.role
            
            if role == "Cliente":
                
                user_data = user.cliente[0].serialize()
            elif role == "Empresa":
                user_data = user.empresa[0].serialize()
                user_data["horario"] = user.empresa[0].horarios[0].serialize()

            else:
                return (
                    jsonify(
                        {
                            "message": "Role does not exists, this user creation failed. Everybody panic"
                        }
                    ),
                    400,
                )

            token = create_access_token(identity=user.id)
            

            user_data["email"] = user.email
            user_data["direccion"] = user.direccion
            user_data["role"] = user.role

            geo_adress = geopy_processinator(user.direccion)
            lng = geo_adress.longitude
            lat = geo_adress.latitude
            user_data["lng"] = lng
            user_data["lat"] = lat

            return jsonify({"userdata": user_data, "token": token, "message":"login success"}),200

@api.route("/signupCliente", methods = ["POST"])
def signupCliente():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    role = "Cliente"
    nombre = data.get("nombre")
    apellido = data.get("apellido")
    telefono = data.get("telefono")
    nacimiento = data.get("nacimiento")
    sexo = data.get("sexo")
    direccion = data.get("direccion")
    instrucciones = data.get("instrucciones")

    if not email or not password or not nombre or not apellido or not telefono or not nacimiento :
        return jsonify({"message": "missing data"}),400
    
    existe = Usuario.query.filter_by(email=email).first()
    
    if existe: 
        return jsonify({"message": "el usuario existe"}),400
    
    realaddress = geopy_processinator(direccion)
    if (realaddress == None) :
        return jsonify({"message": "Address not found try again"}),400
    
    hash = ph.hash(password)
    print(hash)

    
    addUsuario = Usuario(role=role, email=email, password=hash, direccion=realaddress.address)
    db.session.add(addUsuario)
    db.session.commit()

    
    addCliente = Cliente(nombre=nombre, apellido=apellido, sexo=sexo, nacimiento=nacimiento, telefono=telefono, instrucciones=instrucciones, is_active=True, idUsuario = addUsuario.id)
    db.session.add(addCliente)
    db.session.commit()

    
    return jsonify({"message": "Sign up successfull"})
    

@api.route("/signupEmpresa", methods = ["POST"])
def signupEmpresa():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    role = "Empresa"
    direccion = data.get("direccion")
    cif = data.get("cif")
    nombre = data.get("nombre")
    reserva = data.get("reserva") 
    delivery = data.get("delivery")
    # dia = data.get("dia")
    mañana = data.get("mañana")
    tarde = data.get("tarde")
    img = data.get("img")
    categories = data.get("categories")
    banner = data.get("banner")

    if not categories:
        return jsonify({"message": "No categories were given"}),400
    
    
    
    if not email or not password or not cif or not direccion or not nombre : #cambio esto? para validar todos los datos
        return jsonify({"message": "missing data"}),400
    
    existemail = Usuario.query.filter_by(email=email).first()
    if existemail: 
        return jsonify({"message": "Mail already registered"}), 400
    
    existecif = Empresa.query.filter_by(cif=cif).first()
    if existecif:
        return jsonify({"message": "Tax code already registered"}), 400

    
    realaddress = geopy_processinator(direccion)
    
    if (realaddress == None):
        return jsonify({"message": "Address not found try again"}),400

    hash = ph.hash(password)
    print(hash)
    
    addUsuario = Usuario(role = role, email = email, password = hash,  direccion = realaddress.address)
    db.session.add(addUsuario)
    db.session.commit()

    addEmpresa = Empresa(nombre = nombre, cif = cif, is_active=True, reserva = reserva, delivery = delivery, idUsuario = addUsuario.id, imagen = img, banner = banner)
    db.session.add(addEmpresa)
    db.session.commit()

    addHorario = HorariosEmpresas(mañana = mañana, tarde = tarde, idEmpresa = addEmpresa.id)
    db.session.add(addHorario)
    db.session.commit()
    for i in categories: 
        food = TipoComida.query.filter_by(tipoComida = i).first()
        food_to_add = TipoComidaEmpresa(idEmpresa = addEmpresa.id, idTipoComida = food.id)
        db.session.add(food_to_add)
    db.session.commit()

    

    return jsonify({"message": "Sign up successfull"}),200

@api.route("/category", methods = ["POST"])
def category_creatinator():
    
    tipo = request.json
    tipotext = (tipo.get("tipo"))

    if not tipotext: 
        return jsonify({"message": "no type of food given"}),400
    
    type = TipoComida(tipoComida = tipo.get("tipo"))

    
    exists = TipoComida.query.filter_by(tipoComida = tipotext).first()
    
    if exists:
        return jsonify({"message": "already exists"}),400

    db.session.add(type)
    db.session.commit()

    return jsonify({"message": "añadido"}),200


@api.route("/category", methods = ["GET"])
def category_loadinator():
    all_categories = TipoComida.query.all()
    serialized_categories = []
    for i in all_categories:
        serialized_categories.append(i.serialize()["tipoComida"])
    
    
    return jsonify({"message": "returned", "categories":serialized_categories}),200



@api.route("/top_sales", methods = ["GET"])
def top_sales_loadinator():

    companys = Empresa.query.all()
    companys_id = {}
    for i in companys:
        companys_id[i.id] = 0 

    facturas = Factura.query.all()
    for i in facturas:
        companys_id[i.idEmpresa] += 1

   
    sorted_companys_id =  sorted(companys_id, key=companys_id.get, reverse=True)
    
    c = 0
    top_5 = []
    while(c<5):
        if(c > len(sorted_companys_id)-1):
            break

        top_5.append(sorted_companys_id[c])
        c+=1

    data_to_return = []
    for i in companys:
        if ( i.id in top_5 ):
            print(i)
            company = i.serialize()
            data_to_return.append(company)

    return jsonify({"top_5_data":data_to_return}),200

@api.route("/address", methods = ["POST"])
def address_convertinator():

    data = request.json
    address = data.get("address")
    
    
    
    location = geopy_processinator(address)
    if (location == None):
        return jsonify({"message": "Address not found try again"}),400
    
    lat_lon = [location.latitude,location.longitude]
    



    return jsonify({"coordinates": lat_lon, "address":location.address}),200

@api.route("/addProduct", methods = ["POST"])
@jwt_required()
def addProduct():
    data = request.json
    nombre = data.get("nombre")
    precio = data.get("precio")
    descripcion = data.get("descripcion")
    idEmpresa = data.get("idEmpresa")
    img = data.get("img")

    if not nombre or not precio :
        return jsonify({"message": "Complete all data of your product"}), 400
    

    addOneProduct = Productos(nombre = nombre, precio= precio, descripcion = descripcion, idEmpresa = idEmpresa, img = img)
    db.session.add(addOneProduct)
    db.session.commit()

    return jsonify({"message": "Product add successfull"}), 200

@api.route("/companyimg", methods=['POST'])
def img_uploadinator():
        
    
    try:
        
        file_to_upload = request.files['company_img']
        
        if file_to_upload:
            upload_result = cloudinary.uploader.upload(file_to_upload)
            
            if upload_result:
                return jsonify({"message" : "exito", "img" : upload_result.get("secure_url")}),200
            
    except Exception as ex:
        print(ex)

    return jsonify({"message" : "error"}),400
    

@api.route("/menu/<int:idEmpresa>", methods=['GET']) #la url tiene que coincidir con el fetch
@jwt_required()
def menu_empresa(idEmpresa):
    # Obtener los productos del menú asociados al usuario
    empresa = Empresa.query.get(idEmpresa)
    if not empresa:
        return jsonify({"message": "company not found"}), 404

    menu = Productos.query.filter_by(idEmpresa = empresa.id).all()

    # Serializar los productos del menú
    serialized_menu = []
    for producto in menu:
        serialized_menu.append(producto.serialize()) #append agrega elemento a la lista de arriba (array)

    return jsonify({"menu": serialized_menu}), 200

@api.route("/bill", methods=['POST'])
@jwt_required()
def bill_getinator():
    data = request.json
    user_id = data.get("id")
    role = data.get("role")
    print(data)
   
    if not user_id or not role:
        return jsonify({"message" : "user not loged in"}), 400
    
    serialized_bills = []

    if (role == "Cliente"):
        bills = Factura.query.filter_by(idCliente = user_id).all()
    elif (role =="Empresa"):
        bills = Factura.query.filter_by(idEmpresa = user_id).all()
    
    
    if not bills:
        return jsonify({"bills" : []}),200
    
    if (role == "Cliente"):
        for i in bills:
            company = Empresa.query.filter_by(id = i.serialize().get("idempresa")).first()
            serialized_bills.append({"bill" : i.serialize(), "company" : company.serialize()})
        return jsonify({"bills":serialized_bills}),200
    elif (role =="Empresa"):
        for i in bills:
            
            user = Cliente.query.filter_by(id = i.serialize().get("idcliente")).first()
            serialized_bills.append({"bill" : i.serialize(), "user" : user.serialize().get("nombre"), "company_img" : i.empresa.imagen})
        return jsonify({"bills":serialized_bills}),200


@api.route("/billCreator", methods=['POST'])
def bill_creatinator():
    data = request.json
    client_id = data.get("client_id")
    company_id = data.get("company_id")
    pay_id = data.get("pay_id")
    delivery = data.get("delivery")
    time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
    
    

    if not client_id or not company_id or not pay_id or not delivery or not date or not time:
        return jsonify({"message":"Error, missing data"}),400
    
    to_add = Factura(idCliente = client_id, idEmpresa = company_id, idPago = pay_id, delivery = delivery, hora = time, fecha = date)
    
    db.session.add(to_add)
    db.session.commit()
    return jsonify({"message" : "added" , "bill" : to_add.serialize()}),200

@api.route("/historyCreator", methods=['POST'])
def history_addinator():
    data = request.json
    bill_id = data.get("bill_id")
    product_id = data.get("product_id")
    amount = data.get("amount")
    price = data.get("price")

   

    if not bill_id or not product_id or not amount or not price:
         return jsonify({"message":"Error, missing data"}),400
    to_add = HistorialPedidos(idFactura = bill_id, idProducto = product_id, cantidad = amount, precioActual = price)
    db.session.add(to_add)
    db.session.commit()

    return jsonify({"message" : "added" , "to_history" : to_add.serialize()}),200

@api.route("/history", methods=['POST'])
@jwt_required()
def history_getinator():
    data = request.json
    bill_id = data.get("id")

    

    if not bill_id:
        return jsonify({"message" : "Error, need to know the bill"})
    bill_history = HistorialPedidos.query.filter_by(idFactura = bill_id).all()
    

    if not bill_history:
        return jsonify({"bill_history" : []}),200
    
    serialized_bill_history = []
    for i in bill_history:
        product = Productos.query.filter_by(id = i.serialize().get("idProducto")).first()
        serialized_bill_history.append({"detail" : i.serialize(), "product" : product.serialize()})

    
    return jsonify({"history":serialized_bill_history}),200
    
    
# ----------------------------------------------------------------------------------------- delete this function when the addproduct enters
@api.route("/productCreator", methods=['POST'])
def product_addinator():
    data = request.json
    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    company_id = data.get("company_id")

    if not name or not description or not company_id or not price:
         return jsonify({"message":"Error, missing data"}),400
    to_add = Productos(nombre = name, descripcion = description, precio = price, idEmpresa=company_id)
    db.session.add(to_add)
    db.session.commit()

    return jsonify({"message" : "added" , "product" : to_add.serialize()}),200
# -----------------------------------------------------------------------------------------  

@api.route("/favoriteCreator", methods=['POST'])
def favorite_addinator():
    data = request.json
    user_id = data.get("user_id")
    company_id = data.get("company_id")
    
    if not user_id or not company_id:
        return jsonify({"message":"Error, missing data"}),400
    to_add = Favoritos (idCliente = user_id, idEmpresa = company_id)
    
    db.session.add(to_add)
    db.session.commit()

    return jsonify({"message" : "added" , "faved" : to_add.serialize()}),200

@api.route("/favorites", methods=['POST'])
@jwt_required()
def favorites_getinator():
    data = request.json
    user_id = data.get("id")

    if not user_id:
        return jsonify({"message" : "Error, need to know the user"})
    favorites = Favoritos.query.filter_by(idCliente = user_id).all()
    
    if not favorites:
        return jsonify({"favorites" : []}),200
    
    serialized_favorites = []
    for i in favorites:
        add = i.empresa.serialize()
        add["direccion"] = i.empresa.usuario.direccion
        serialized_favorites.append(add)

    
    return jsonify({"favorites":serialized_favorites}),200

@api.route("/stars", methods=['POST'])
@jwt_required()
def stars_poll():
    data = request.json
    user_id = data.get("idCliente")
    company_id = data.get("idEmpresa")
    puntuacion = data.get("puntuacion")
    reseña = "Nada"
    time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
    print(data)

    if not user_id or not company_id or not puntuacion:
         return jsonify({"message":"Error, missing data"}),400

    addReseña = Reseñas(idCliente = user_id, idEmpresa = company_id, puntuacion = puntuacion, reseña = reseña, hora = time, fecha = date)
    db.session.add(addReseña)
    db.session.commit()

    return jsonify({"message": "You have valued successfully, thank you!"}),200

@api.route("/empresa/<id>", methods=['GET'])
def infoEmpresa(id):
    empresa = Empresa.query.get(id)
    if not empresa:
        return jsonify({"message": "empresa not found"}), 400
    
    idUsuario = empresa.id
    usuario = Usuario.query.get(idUsuario)
    print("asd")
    print (usuario)
    if not usuario:
        return jsonify({"message": "usuario not found"}), 400
    
    return jsonify({"empresa": empresa.serialize(), "usuario": usuario.serialize()}), 200
    
# @api.route("/empresa/<id>", methods=['GET'])
# def infoEmpresa(id):
#     empresa = Empresa.query.get(id)
#     if not empresa:
#         return jsonify({"message": "empresa not found"}), 400
    
#     usuario = Usuario.query.get(empresa.idUsuario)
#     if not usuario:
#         return jsonify({"message": "usuario not found"}), 400

#     return jsonify({"empresa": empresa.serialize(), "usuario": usuario.serialize()}), 200

# @api.route("/empresa/<id>", methods=['GET']) #la url tiene que coincidir con el fetch
# def infoEmpresa(id):
#     usuario = Usuario.query.get(id)
#     if not usuario:
#         return jsonify({"message": "usuario not found"}), 400
#     empresa = Empresa.query.filter_by(idUsuario=usuario.id).all()
#     if not empresa:
#         return jsonify({"message": "empresa not found"}), 400
#     return jsonify({"usuario": usuario.serialize(), "empresas": [e.serialize() for e in empresa]}), 200


@api.route("/empresa/menu/<id>", methods=['GET'])
def menuEmpresa(id):
    empresa = Empresa.query.get(id)
    if not empresa:
        return jsonify({"message": "empresa not found"}), 400
    
    productos = empresa.productos
    if not productos:
        return jsonify({"message": "productos not found"}), 400
    
    serialized_productos = [producto.serialize() for producto in productos]
    return jsonify(serialized_productos), 200

def calculate_order_amount(items):
    amount = int(items.get("precio") * items.get("cantidad") * 100* 1.21)
    return amount

@api.route('/create-payment-intent', methods=['POST'])
@jwt_required()
def create_payment():
    try:
        
        data = request.json
        product_id = data.get("product_id")
        quantity = data.get("cantidad")
        price = data.get("precio")
        delivery = data.get("delivery")
        pay_id = data.get("pay_method")
        user_id = data.get("user_id")
        time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

        
        if not product_id or not quantity or not price or not pay_id or not user_id:
            return jsonify({"message": "Missing data"}), 400
    
        
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data),
            currency='usd'
        )
        print(data)
        
        pay_id = intent["client_secret"]

        checkout(product_id, quantity, price, delivery, pay_id, user_id, time, date)
        
        # ----------------------------------------------------------------------agregar para meter entradas a la tabla de facturas e historial de pedidos
        return jsonify({
          'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403



@api.route("/searchEmpresa", methods = ["POST"])
def search_empresa(): 
   data = request.json
   searchEmpresa = (data.get("nombre"))

   print(f"{searchEmpresa[:5]}%")
   empresas = Empresa.query.filter(Empresa.nombre.ilike(f"{searchEmpresa[:4]}%")).all()
#  empresas = Empresa.query.filter(Empresa.nombre.startswith(searchEmpresa[:3])).all()

#  empresas = Empresa.query.filter(Empresa.nombre.ilike(f"%{searchEmpresa}%")).all()
   resultados = []
   for empresa in empresas:
        resultados.append(empresa.serialize())
    
   print(resultados)

   if not empresas:
       return jsonify({"message": "Not found"}), 400
   return jsonify(resultados)

@api.route("/filterDelivery", methods=["GET"])
def filterByDelivery():
    empresas = Empresa.query.filter_by(delivery = True).all()
    resultados = []

    if not empresas:
       return jsonify({"message": "No company does delivery"}), 400
    
    for empresa in empresas:
        resultados.append(empresa.serialize())

    return jsonify(resultados)

@api.route("/filterFavorites", methods=["POST"])
@jwt_required()
def filterByFavorites():
    data = request.json
    idCliente = data.get("idCliente")
    empresas = Favoritos.query.filter_by(idCliente = idCliente).all()
    resultados = []
    if not empresas:
        return jsonify([])
    
    for empresa in empresas:
        resultados.append(empresa.serialize())
    
    return jsonify(resultados),200

@api.route("/allcompanies", methods=["GET"])
def company_getinator():
    
    empresas = Empresa.query.all()
    company_locations = []
    if not empresas:
        return jsonify({"companies": company_locations}),200

    for i in empresas:
        company_data = i.serialize()
        location = geopy_processinator(i.usuario.direccion)
        if (location == None):
            continue
        company_data["direccion"] = location.address
        company_data["longitude"] = location.longitude
        company_data["latitude"] = location.latitude
        company_locations.append(company_data)
    
    return jsonify({"companies": company_locations}),200


@api.route("/checkout_data", methods=["POST"])
@jwt_required()
def checkout_configurator():
    data = request.json
    product_id = data.get("product_id")
    quantity = data.get("cantidad")
    price = data.get("precio")
    delivery = data.get("delivery")
    pay_id = data.get("pay_method")
    user_id = data.get("user_id")
    time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    if not product_id or not quantity or not price or not pay_id or not user_id:
        return jsonify({"message": "Missing data"}), 400 
    
    checkout(product_id, quantity, price, delivery, pay_id, user_id, time, date)

    if (checkout):
        return jsonify({"message" : "asd"}),200
    else :
        return jsonify({"message": "product doesnt exist"}), 400 
    
    

@api.route("/companyget", methods=["POST"])
@jwt_required()
def company_selectinator():     
    data = request.json
    product_id = data.get("id")

    product = Productos.query.filter_by(id = product_id).first()
    
    if not product: 
        return jsonify({"message": "product doesnt exist"}), 400 
    return jsonify({"company": product.empresa.serialize()}), 200 


@api.route("/filter_category", methods=["POST"])
def category_filtrator():
    data = request.json
    
    category_id = TipoComida.query.filter_by(tipoComida = data).first()
    
    companies = TipoComidaEmpresa.query.filter_by(idTipoComida = category_id.id).all()

    resultados = []
    if not companies:
        return jsonify([])
    
    for i in companies:
        resultados.append(i.empresa.serialize())
    
    return jsonify(resultados),200