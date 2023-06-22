"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db,Usuario,Cliente,Empresa,TipoComida,TipoComidaEmpresa,Productos,Factura,Reseñas,Favoritos,HorariosEmpresas,HistorialPedidos
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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
        return jsonify({"message": "Missing mail or password"}),400
    else:
        user = Usuario.query.filter_by(email=email, password=password).first()
    
        if not user :
            return jsonify({"message": "User does not exists"}),400
        else:

            role = user.role
            
            if (role == "cliente"):
                alldata = user.cliente[0].serialize()
            elif (role =="empresa"):
                alldata = user.empresa[0].serialize()
            else:
                
                return jsonify({"message": "Role does not exists, this user creation failed. Everybody panic"}),400
            
            token = create_access_token(identity=user.idUsuario)
            print(token)


            alldata["email"] = user.email
            alldata["direccion"] = user.direccion
            alldata["role"] = user.role


            
            print(alldata)

            return jsonify(alldata)


    
    
