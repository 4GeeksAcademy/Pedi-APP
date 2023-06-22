"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db,Usuario,Cliente,Empresa,TipoComida,TipoComidaEmpresa,Productos,Factura,Reseñas,Favoritos,HorariosEmpresas,HistorialPedidos
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/login", methods = ["POST"])
def loginator():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "no email o contraseña"}),400
    
    user = Usuario.query.filter_by(email=email, password=password).first()
    
    role = user.role
    print(user.cliente)

    return jsonify({"message": "no email o contraseña"})

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



    if not mail or not password or not nombre or not apellido or not telefono or not calleNumero:
        return jsonify({"message": "no email o contraseña"}),400
    
    existe = Usuario.query.filter_by(email=mail).first
    if existe: 
        return jsonify({"message": "el usuario existe"})

    addCliente = Cliente(nombre=nombre, apellido=apellido, sexo=sexo, nacimiento=nacimiento, telefono=telefono, is_active=True)
    db.session.add(addCliente)
    db.session.commit()

    addUsuario = Usuario(role="cliente", email=mail, password=password, direccion=direccion)
    db.session.add(addUsuario)
    db.session.commit()
    return jsonify({"message": "Sign up successfull"})
    
    # role = cliente.role
    # print(cliente.cliente)


    
    
