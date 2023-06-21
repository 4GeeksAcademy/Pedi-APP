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
    
    if (role == "cliente"):

        alldata = user.cliente[0].serialize()
        alldata["email"] = user.email
        alldata["direccion"] = user.direccion
        alldata["role"] = user.role
    elif (role =="empresa"):
        alldata = user.empresa[0].serialize()
    else:
        
        return jsonify({"message": "rol no existe, el usuario se creo mal todos entren en panico"}),400
    
    alldata["email"] = user.email
    alldata["direccion"] = user.direccion
    alldata["role"] = user.role

    
    print(alldata)

    return jsonify({"message": "no email o contraseña"})


    
    
