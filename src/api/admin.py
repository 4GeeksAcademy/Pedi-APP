  
import os
from flask_admin import Admin

from .models import db, Usuario, Empresa, Cliente, TipoComida, HorariosEmpresas,Factura, HistorialPedidos, Productos, Favoritos, Reseñas, TipoComidaEmpresa

from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    
    admin.add_view(ModelView(Usuario, db.session))
    admin.add_view(ModelView(Empresa, db.session))
    admin.add_view(ModelView(Cliente, db.session))
    admin.add_view(ModelView(TipoComidaEmpresa, db.session))
    admin.add_view(ModelView(HorariosEmpresas, db.session))
    admin.add_view(ModelView(Factura, db.session))
    admin.add_view(ModelView(HistorialPedidos, db.session))
    admin.add_view(ModelView(Favoritos, db.session))
    admin.add_view(ModelView(Reseñas, db.session))
    admin.add_view(ModelView(TipoComida, db.session))


    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
