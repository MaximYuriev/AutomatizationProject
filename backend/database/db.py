from database.config import settings
from sqlalchemy import create_engine, text,MetaData,Table
from models.users import Base
import os
import hashlib
ur_s = settings.POSTGRES_DATABASE_URLS
print(ur_s)
engine_s = create_engine(ur_s,echo= True)
def create_frist_admins_passport():
    conn = engine_s.connect()
    metadata = MetaData()
    passport = Table('passports',metadata,autoload_with=engine_s)
    values_insert = [
        {'passport_serial':"1234",'passport_number':"123456",'issued_by_whom':"Барнаул",'place_of_birth':"Барнаул",'birthdate':"2024-01-01",'passport_date_of_issue':"2024-01-01",'sex':"Муж",'place_of_residence':"Барнаул"},
    ]
    insert_query = passport.insert().values(values_insert)
    conn.execute(insert_query)
    conn.commit()
    conn.close()
def create_first_admin():
    conn = engine_s.connect()
    metadata = MetaData()
    user = Table('users',metadata,autoload_with=engine_s)
    password = 'admin'
    password_code = password.encode('utf-8')
    hash_password = hashlib.sha256(password_code)
    values_insert = [
        {'name':"admin",'email':"admin@mail.ru",'password':hash_password.hexdigest(),'FK_user_roles_id':1,'first_name':"Администраторов",'middle_name':"Администратор",'last_name':"Администраторович",'phone':"9166002003",'users_rank':"Администратор",'appointment':"Администратор",'fk_passports_id':1,'fk_department_id':1},
    ]
    insert_query = user.insert().values(values_insert)
    conn.execute(insert_query)
    conn.commit()
    conn.close()
    os.mkdir(f'media/1')
    os.mkdir(f'media/1/profile')
def create_algorithms():
    conn = engine_s.connect()
    metadata = MetaData()
    algorithms = Table('algoritms',metadata,autoload_with=engine_s)
    values_insert = [
        {'algoritm_name':"Информация получена из заявления потерпевшего",'fk_user_id':1,'check_case':0,'clarif':1,'d_criminal':0,'d_victim':0,'expertise':0,'inspect':3,'order_wanted':0,'quest':0,'reclaim':2,'request':4,'set_case':0,'suspect':0,'track':5,'witnes':0,'extract_case':0},
        {'algoritm_name':"Сведения получены по результатам оперативно-розыскной деятельности",'fk_user_id':1,'check_case':2,'clarif':4,'d_criminal':0,'d_victim':0,'expertise':0,'inspect':1,'order_wanted':3,'quest':0,'reclaim':5,'request':6,'set_case':0,'suspect':0,'track':0,'witnes':0,'extract_case':0},
        {'algoritm_name':"Установлен способ совершения преступления, потерпевшие и свидетели, выявлены цифровые следы, данные о преступнике имеются",'fk_user_id':1,'check_case':0,'clarif':0,'d_criminal':1,'d_victim':2,'expertise':0,'inspect':6,'order_wanted':9,'quest':3,'reclaim':4,'request':8,'set_case':0,'suspect':10,'track':0,'witnes':7,'extract_case':5},
        {'algoritm_name':"Установлен способ совершения преступления, потерпевшие и свидетели, выявлены цифровые следы, данные о преступнике отсутсвуют",'fk_user_id':1,'check_case':0,'clarif':0,'d_criminal':1,'d_victim':2,'expertise':10,'inspect':0,'order_wanted':9,'quest':5,'reclaim':3,'request':8,'set_case':0,'suspect':0,'track':7,'witnes':6,'extract_case':4},
        {'algoritm_name':"Установлен способ совершения преступления, цифровые следы, потерпевшие, данные о преступнике отсутсвуют",'fk_user_id':1,'check_case':0,'clarif':0,'d_criminal':1,'d_victim':2,'expertise':10,'inspect':6,'order_wanted':9,'quest':5,'reclaim':3,'request':7,'set_case':0,'suspect':0,'track':0,'witnes':8,'extract_case':4},
        {'algoritm_name':"Не установлен способ совершения преступления, данные о преступнике отсутсвуют",'fk_user_id':1,'check_case':0,'clarif':0,'d_criminal':1,'d_victim':2,'expertise':10,'inspect':0,'order_wanted':9,'quest':3,'reclaim':4,'request':8,'set_case':7,'suspect':0,'track':0,'witnes':6,'extract_case':5},
    ]
    insert_query = algorithms.insert().values(values_insert)
    conn.execute(insert_query)
    conn.commit()
    conn.close()
def create_roles():
    conn = engine_s.connect()
    metadata = MetaData()
    roles = Table('user_roles',metadata,autoload_with=engine_s)
    values_insert = [
        {'name_role':"Администратор","user_rights":"Добавление пользователей"},
        {'name_role':"Следователь","user_rights":"Ведение дел"},
        {'name_role':"Оперативный сотрудник","user_rights":"Выполнение поручений"},
        {'name_role':"Начальник отдела","user_rights":"Просмотр всех дел"},
    ]
    insert_query = roles.insert().values(values_insert)
    conn.execute(insert_query)
    conn.commit()
    conn.close()
def create_procedural_position():
    conn = engine_s.connect()
    metadata = MetaData()
    procedural_position = Table('procedural_position',metadata,autoload_with=engine_s)
    values_insert = [
        {'name_position':"Потерпевший"},
        {'name_position':"Эксперт"},
        {'name_position':"Специалист"},
        {'name_position':"Понятой"},
        {'name_position':"Защитник"},
        {'name_position':"Подозреваемый"},
    ]
    insert_query = procedural_position.insert().values(values_insert)
    conn.execute(insert_query)
    conn.commit()
    conn.close()
def create_first_department():
    conn = engine_s.connect()
    metadata = MetaData()
    procedural_position = Table('departments',metadata,autoload_with=engine_s)
    values_insert = [
        {'city':"Засекречено",'postal_code':"--//--",'street':"--//--",'house_number':"--//--",'name_department':"--//--"},
    ]
    insert_query = procedural_position.insert().values(values_insert)
    conn.execute(insert_query)
    conn.commit()
    conn.close()
def create_tables():
    Base.metadata.drop_all(bind= engine_s)
    Base.metadata.create_all(bind= engine_s)
    create_roles()
    create_procedural_position()
    create_first_department()
    create_frist_admins_passport()
    create_first_admin()
    create_algorithms()