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



api = Blueprint("api", __name__)

cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), api_secret=os.getenv('API_SECRET'))

def geopy_processinator(address):
    geolocator = Nominatim(user_agent="dishdash")
    location = geolocator.geocode(address, language="es", timeout=None)
    return location

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
        user = Usuario.query.filter_by(email=email, password=password).first()
        
        if not user:
            return jsonify({"message": "Wrong username or password"}), 400
        else:
            role = user.role
            
            if role == "Cliente":
                
                user_data = user.cliente[0].serialize()
            elif role == "Empresa":
                user_data = user.empresa[0].serialize()
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
            user_data["direccion"] = geopy_processinator(user.direccion).address #esto hay que ponerlo en el signup en realidad -----------------------------
            user_data["role"] = user.role

                
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

    if not email or not password or not nombre or not apellido or not telefono:
        return jsonify({"message": "no email o contraseña"}),400
    
    existe = Usuario.query.filter_by(email=email).first()
    
    if existe: 
        return jsonify({"message": "el usuario existe"})
    
    realaddress = geopy_processinator(direccion)
    if (realaddress == None) :
        return jsonify({"message": "Address not found try again"}),400
    
    
    
    addUsuario = Usuario(role=role, email=email, password=password, direccion=realaddress.address)
    db.session.add(addUsuario)
    db.session.commit()

    
    addCliente = Cliente(nombre=nombre, apellido=apellido, sexo=sexo, nacimiento=nacimiento, telefono=telefono, instrucciones=instrucciones, is_active=True, idUsuario = addUsuario.id)
    db.session.add(addCliente)
    db.session.commit()

    
    return jsonify({"message": "Sign up successfull"})
    
    # role = cliente.role
    # print(cliente.cliente)

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

    if not email or not password or not cif or not direccion:
        return jsonify({"message": "Por favor introduce un email, password, dirección y cif válidos"}),400
    
    existemail = Usuario.query.filter_by(email=email).first()
    if existemail: 
        return jsonify({"message": "el usuario existe"}), 400
    
    existecif = Empresa.query.filter_by(cif=cif).first()
    if existecif:
        return jsonify({"message": "el usuario existe"}), 400

    realaddress = geopy_processinator(direccion)
    if (realaddress == None):
        return jsonify({"message": "Address not found try again"}),400
    
    addUsuario = Usuario(role = role, email = email, password = password,  direccion = realaddress.address)
    db.session.add(addUsuario)
    db.session.commit()

    addEmpresa = Empresa(nombre = nombre, cif = cif, is_active=True, reserva = reserva, delivery = delivery, idUsuario = addUsuario.id, imagen = img)
    db.session.add(addEmpresa)
    db.session.commit()

    addHorario = HorariosEmpresas(mañana = mañana, tarde = tarde, idEmpresa = addEmpresa.id)
    db.session.add(addHorario)
    db.session.commit()

    return jsonify({"message": "Sign up successfull"}),200

@api.route("/category", methods = ["POST"])
def category_creatinator():
    
    tipo = request.json
    tipotext = (tipo.get("tipo"))
    type = TipoComida(tipoComida = tipo.get("tipo"))

    exists = TipoComida.query.filter_by(tipoComida = tipotext).first()
    
    if exists:
        return jsonify({"message": "ya ta ese"})

    db.session.add(type)
    db.session.commit()

    return jsonify({"message": "añadido"})


@api.route("/category", methods = ["GET"])
def category_loadinator():
    all_categories = TipoComida.query.all()
    serialized_categories = []
    for i in all_categories:
        serialized_categories.append(i.serialize()["tipoComida"])
    
    
    return jsonify({"message": "returned", "categories":serialized_categories})



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
        id ( i.id in top_5 )
        company = i.serialize()
        data_to_return.append(company)


    return jsonify({"top_5_data":data_to_return})

@api.route("/address", methods = ["POST"])
def address_convertinator():

    data = request.json
    address = data.get("address")
    

    
    location = geopy_processinator(address)
    if (location == None):
        return jsonify({"message": "Address not found try again"}),400
    
    lat_lon = [location.latitude,location.longitude]
    



    return jsonify({"coordinates": lat_lon, "address":location.address}),200


@api.route("/companyimg", methods=['POST'])
def img_uploadinator():
        

    try:
        
        file_to_upload = request.files['company_img']
        
        if file_to_upload:
            upload_result = cloudinary.uploader.upload(file_to_upload)
            print(upload_result)
            if upload_result:
                return jsonify({"message" : "exito", "img" : upload_result.get("secure_url")}),200
            
    except Exception as ex:
        print(ex)

    return jsonify({"message" : "error"}),400
    
@api.route("/bill", methods=['POST'])
def bill_getinator():
    data = request.json
    return jsonify({"message":"asd"})



@api.route("/billCreator", methods=['POST'])
def bill_creatinator():
    data = request.json
    client_id = data.get("client_id")
    company_id = data.get("company_id")
    pay_id = data.get("pay_id")
    delivery = data.get("delivery")
    time = data.get("time")
    date = data.get("date")

    print("asd")

    if not client_id or not company_id or not pay_id or not pay_id or not delivery or not date or not time:
        return jsonify({"message":"Error, missing data"}),400
    
    to_add = Factura(idCliente = client_id, idEmpresa = company_id, idPago = pay_id, delivery = delivery, hora = time, fecha = date)
    return jsonify({"factura":to_add})
    #db.session.add(to_add)
    #db.session.commit()

    return jsonify({"message":"asd"})