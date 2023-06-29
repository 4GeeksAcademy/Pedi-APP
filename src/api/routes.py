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
    mail = data.get("mail")
    password = data.get("password")
    nombre = data.get("nombre")
    apellido = data.get("apellido")
    telefono = data.get("telefono")
    nacimiento = data.get("nacimiento")
    sexo = data.get("sexo")
    direccion = data.get("direccion")


    
    if not mail or not password or not nombre or not apellido or not telefono:
        return jsonify({"message": "no email o contraseña"}),400
    
    existe = Usuario.query.filter_by(email=mail).first()
    
    
    if existe: 
        return jsonify({"message": "el usuario existe"})
    
    addUsuario = Usuario(role="cliente", email=mail, password=password, direccion=direccion)
    db.session.add(addUsuario)
    db.session.commit()

    id_usuario = Usuario.query.filter_by(email=mail).first()

    addCliente = Cliente(nombre=nombre, apellido=apellido, sexo=sexo, nacimiento=nacimiento, telefono=telefono, is_active=True, idUsuario = id_usuario.id)
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

    if not email or not password or not cif or not direccion:
        return jsonify({"message": "Por favor introduce un email, password, dirección y cif válidos"}),400
    
    existe = Usuario.query.filter_by(email=email).first()
    if existe: 
        return jsonify({"message": "el usuario existe"}), 400

    addUsuario = Usuario(role = role, email = email, password = password,  direccion = direccion)
    db.session.add(addUsuario)
    db.session.commit()

    addEmpresa = Empresa(nombre = nombre, cif = cif, is_active=True, reserva = reserva, delivery = delivery, idUsuario = addUsuario.id)
    db.session.add(addEmpresa)
    db.session.commit()

    addHorario = HorariosEmpresas(mañana = mañana, tarde = tarde, idEmpresa = addEmpresa.id)
    db.session.add(addHorario)
    db.session.commit()

    return jsonify({"message": "Sign up successfull"}),200

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