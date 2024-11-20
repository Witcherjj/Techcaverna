from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, EqualTo

# Inicialização do Flask
app = Flask(__name__)

# Configurações do app
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:caverna6774@localhost/techcaverna_shop'
app.config['JWT_SECRET_KEY'] = '62u3MwOus-2UjXJBBse0n7dCMY9BJ1wMs6TilfAi8z4wQ'
app.config['SECRET_KEY'] = 'mrvNpQvh8_3xAt3vo7lbB42fh06zAdUTbdKnRaHKnQ'

# Inicializa extensões
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Configuração do Login Manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Modelo para a tabela de usuários
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Modelo para a tabela de produtos
class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    stock = db.Column(db.Integer, default=0)

# Formulário de Login
class LoginForm(FlaskForm):
    username = StringField('Usuário', validators=[DataRequired(), Length(min=3, max=25)])
    password = PasswordField('Senha', validators=[DataRequired(), Length(min=6)])
    submit = SubmitField('Entrar')

# Formulário de Registro
class RegisterForm(FlaskForm):
    username = StringField('Usuário', validators=[DataRequired(), Length(min=3, max=25)])
    password = PasswordField('Senha', validators=[DataRequired(), Length(min=6)])
    confirm_password = PasswordField('Confirme a Senha', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Registrar')

# Rotas do aplicativo
@app.route('/')
def home():
    return "Flask está rodando corretamente na raiz!"

@app.route('/api/', methods=['GET'])
def api():
    return jsonify(message="API está funcionando!"), 200

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify(message="Usuário já existe!"), 400

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="Registro feito com sucesso!"), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=username)
        return jsonify(message="Login realizado com sucesso!", access_token=access_token), 200

    return jsonify(message="Usuário ou senha incorretos!"), 401

@app.route('/api/protected-route', methods=['GET'])
@jwt_required()
def protected_route():
    current_user = get_jwt_identity()
    return jsonify(message=f"Olá, {current_user}. Bem-vindo à rota protegida!"), 200

# Nova Rota: Listar Produtos
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_list = [
        {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "description": product.description,
            "stock": product.stock
        } for product in products
    ]
    return jsonify(products=products_list), 200

# Nova Rota: Adicionar Produto (opcional, apenas para testes)
@app.route('/api/add-product', methods=['POST'])
def add_product():
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')
    description = data.get('description')
    stock = data.get('stock')

    if not all([name, price, description, stock]):
        return jsonify({"message": "Todos os campos são obrigatórios!"}), 400

    new_product = Product(name=name, price=price, description=description, stock=stock)
    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Produto adicionado com sucesso!"}), 201

# Inicializa o app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Garante que as tabelas sejam criadas no banco de dados
    app.run(debug=True)
