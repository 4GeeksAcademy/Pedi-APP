from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.Bolean(), unique=False, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(30), unique=False, nullable=False)
    direccion = db.Column(db.String(120), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "rol": self.rol,
            "email": self.email,
            "direccion": self.direccion
    }

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=False, nullable=False)
    apellido = db.Column(db.String(70), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    sexo = db.Column(db.String(20), unique=False, nullable=True)
    nacimiento = db.Column (db.DateTime, unique=False, nullable=False)
    telefono = db.Column (db.Integer, unique=False, nullable=False)
    idUsuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nulleable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "sexo": self.sexo,
            "nacimiento": self.nacimiento,
            "telefono": self.telefono,
            "idUsuario": self.idUsuario
            # do not serialize the password, its a security breach
        }
    
class Empresa (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=False, nullable=False)
    cif = db.Column(db.String(30), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    reserva = db.Column(db.Boolean(), unique=False, nullable=False)
    delivery = db.Column(db.Boolean(), unique=False, nullable=False)
    idUsuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nulleable=False)
    
    def __repr__(self):
        return f'<Empresa {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "cif": self.cif,
            "reserva": self.reserva,
            "delivery": self.delivery,
            "idUsuario": self.idUsuario
            # do not serialize the password, its a security breach
        }
    
class TipoComida (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipoComida = db.Column(db.String(120), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "tipoComida": self.tipoComida,
        }
    
class TipoComidaEmpresa (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idEmpresa = db.Column(db.Integer, db.ForeignKey('empresa.id'), nulleable=False)
    idTipoComida = db.Column(db.Integer, db.ForeignKey('tipoComida.id'), nulleable=False)

    def __repr__(self):
        return f'<Empresa {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "idEmpresa": self.idEmpresa,
            "idTipoComida": self.idTipoComida,
        }
    
class Productos (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    descripcion = db.Column(db.String(240), unique=False, nullable=False)
    precio = db.Column(db.Float(2), unique=False,nullable=True)
    idEmpresa = db.Column(db.Integer, db.ForeignKey('empresa.id'), nulleable=False)

    def __repr__(self):
        return f'<Producto {self.id}>'

    def serialize(self):
            return {
                "id": self.id,
                "nombre": self.nombre,
                "descripcion": self.descripcion,
                "precio" : self.precio,
                "idEmpresa": self.idEmpresa
            }

class Factura (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idCliente = db.Column(db.Integer, db.ForeignKey('cliente.id'), unique=False,nulleable=False)
    idEmpresa = db.Column(db.Integer, db.ForeignKey('empresa.id'), unique=False,nulleable=False)
    idPago = db.Column(db.String(50), nulleable = False)
    delivery = db.Column(db.Boolean(), unique=False, nullable=False)
    hora = db.Column (db.DateTime, unique=False, nullable=False)
    fecha = hora = db.Column (db.DateTime, unique=False, nullable=False)

    def __repr__(self):
        return f'<Factura {self.id}>'

    def serialize(self):
            return {
                "id": self.id,
                "idcliente": self.idCliente,
                "idempresa": self.idEmpresa,
                "codigoDePago" : self.idPago,
                "delivery": self.delivery,
                "hora" : self.hora,
                "fecha" : self.fecha

            }

class Reseñas (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idCliente = db.Column(db.Integer, db.ForeignKey('cliente.id'), unique=False,nulleable=False)
    idEmpresa = db.Column(db.Integer, db.ForeignKey('empresa.id'), unique=False,nulleable=False)
    puntuacion = db.Column(db.Integer, unique=False, nulleable=False)
    reseña = db.Column(db.String(240), nulleable = False)
    hora = db.Column (db.DateTime, unique=False, nullable=False)
    fecha = hora = db.Column (db.DateTime, unique=False, nullable=False)

    def __repr__(self):
        return f'<Reseñas {self.id}>'

    def serialize(self):
            return {
                "id": self.id,
                "idcliente": self.idCliente,
                "idempresa": self.idEmpresa,
                "puntuacion" : self.puntuacion,
                "reseña": self.reseña,
                "hora" : self.hora,
                "fecha" : self.fecha

            }

class Favoritos (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idCliente = db.Column(db.Integer, db.ForeignKey('cliente.id'), unique=False,nulleable=False)
    idEmpresa = db.Column(db.Integer, db.ForeignKey('empresa.id'), unique=False,nulleable=False)

    def __repr__(self):
        return f'<Favoritos{self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "idcliente": self.idCliente,
            "idempresa": self.idEmpresa,
        }

class HorariosEmpresas (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dia = db.Column(db.String(100), unique=False, nulleable=False)
    mañana = db.Column(db.Boolean(), unique=False, nullable=False)
    tarde = db.Column(db.Boolean(), unique=False, nullable=False)
    idEmpresa = db.Column(db.Integer, db.ForeignKey('empresa.id'), nulleable=False)

    def __repr__(self):
        return f'<HorariosEmpresas {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "dia": self.dia,
            "mañana": self.mañana,
            "tarde": self.tarde,
            "idEmpresa": self.idEmpresa,
        }

class HistorialPedidos (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idFactura = db.Column(db.Integer, unique=False, nulleable=False)
    idProducto = db.Column(db.Integer, unique=False, nulleable=False)
    cantidad = db.Column(db.Integer, unique=False, nulleable=False)
    precioActual = db.Column(db.Float(2), unique=False,nullable=True)
    

    def __repr__(self):
        return f'<HistorialPedidos {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "idFactura": self.idFactura,
            "idProducto": self.idProducto,
            "cantidad": self.cantidad,
            "precioActual": self.precioActual,
        }