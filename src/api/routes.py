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

api = Blueprint("api", __name__)


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

            if role == "cliente":
                user_data = user.cliente[0].serialize()
            elif role == "empresa":
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
            user_data["direccion"] = user.direccion
            user_data["role"] = user.role

                
            return jsonify({"userdata": user_data, "token": token, "message":"login success"}),200
            

@api.route("/signupCliente", methods = ["POST"])
def signupCliente():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    nombre = data.get("nombre")
    apellido = data.get("apellido")
    telefono = data.get("telefono")
    nacimiento = data.get("nacimiento")
    sexo = data.get("sexo")
    direccion = data.get("direccion")



    if not email or not password or not nombre or not apellido or not telefono:
        return jsonify({"message": "no email o contraseña"}),400
    
    existe = Usuario.query.filter_by(email=email).first()
    
    
    if existe: 
        return jsonify({"message": "el usuario existe"})
    
    addUsuario = Usuario(role="cliente", email=email, password=password, direccion=direccion)
    db.session.add(addUsuario)
    db.session.commit()

    id_usuario = Usuario.query.filter_by(email=email).first()

    addCliente = Cliente(nombre=nombre, apellido=apellido, sexo=sexo, nacimiento=nacimiento, telefono=telefono, is_active=True, idUsuario = id_usuario.id)
    db.session.add(addCliente)
    db.session.commit()

    
    return jsonify({"message": "Sign up successfull"})
    
    # role = cliente.role
    # print(cliente.cliente)

@api.route("/signupEmpresa", methods = ["POST"])
def signupEmpresa():
    data = request.json
    email = data.get['email']
    password = data.get['password']
    role = "Empresa"
    direccion = data.get['direccion']
    cif = data.get['cif']
    nombre = data.get['nombre']
    reserva = data.get['reserva'] 
    delivery = data.get['delivery'] 
    mañana = data.get['mañana']
    tarde = data.get['tarde']

    if not email or not password:
        return jsonify({"message": "Por favor introduce un email o password válidos"})
    
    existe = Usuario.query.filter_by(email=email).first()
    print(existe)
    if existe: 
        return jsonify({"message": "el usuario existe"})

    addUsuario = Usuario(email = email, password = password, role = role, direccion = direccion)
    db.session.add(addUsuario)
    db.session.commit()

    id_usuario = Usuario.query.filter_by(email=email).first()

    addEmpresa = Empresa(cif = cif, nombre = nombre, reserva = reserva, delivery = delivery, is_active=True, idUsuario = id_usuario.id)
    db.session.add(addEmpresa)
    db.session.commit()

    id_empresa = Empresa.query.filter_by().first()

    addHorario = HorariosEmpresas(mañana = mañana, tarde = tarde, idEmpresa = id_empresa)
    db.session.add(addHorario)
    db.session.commit()

    print(data)

    return jsonify({"message": "Sign up successfull"})

    # mañana = True if data['mañana'] == "true" else False
    # tarde = True if data['tarde'] == "true" else False
    # delivery = True if data['delivery'] == "true" else False
    # reserva = True if data['reserva'] == "true" else False

@api.route("/category", methods = ["POST"])
def category_creatinator():
    
    tipo = request.json

    type = TipoComida(tipoComida = tipo.get("tipo"))

    if type:
        a = TipoComida.query.all()
        print(a[0].tipoComida)
        return jsonify({"message": "ya ta ese"})

    db.session.add(type)
    db.session.commit()

    return jsonify({"message": "añadido"})

@api.route("/category", methods = ["get"])
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
    print(data_to_return)

    return jsonify({"company_ids":top_5})