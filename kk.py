from faker import Faker
import random
import bcrypt
import pymysql

# Khởi tạo Faker
fake = Faker()

# Hàm mã hóa mật khẩu
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# Hàm tạo dữ liệu giả cho bảng customer
def generate_customer_data(num_rows):
    data = []
    for i in range(51, num_rows + 1):  # Tạo ID từ 1001 trở đi
        row = {
            "id": i,  # Tạo ID tự động từ 1001 trở đi
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.email(),
            "address": fake.address().replace("\n", " "),  # Đảm bảo địa chỉ không có dấu xuống dòng
            "password": hash_password(fake.password()),  # Mã hóa mật khẩu
        }
        data.append(row)
    return data

# Kiểm tra kết nối MySQL
def check_db_connection():
    try:
        conn = pymysql.connect(
            host="localhost",  # Địa chỉ MySQL server
            user="root",       # Tên người dùng MySQL
            password="1234",   # Mật khẩu người dùng MySQL
            database="doan_travel"  # Tên cơ sở dữ liệu của bạn
        )
        print("Kết nối thành công đến MySQL!")
        return conn
    except Exception as e:
        print(f"Lỗi kết nối: {e}")
        return None

# Hàm chèn dữ liệu customer vào cơ sở dữ liệu MySQL
def insert_customer_data(data):
    conn = check_db_connection()
    if conn:
        try:
            with conn.cursor() as cursor:
                insert_query = """
                INSERT INTO customer (id, first_name, last_name, email, address, password) 
                VALUES (%s, %s, %s, %s, %s, %s)
                """
                # Chèn từng bản ghi vào cơ sở dữ liệu
                for row in data:
                    cursor.execute(insert_query, (row["id"], row["first_name"], row["last_name"], row["email"], row["address"], row["password"]))
                conn.commit()  # Lưu các thay đổi
                print(f"{len(data)} bản ghi đã được chèn thành công!")
        except Exception as e:
            print(f"Lỗi khi chèn dữ liệu: {e}")
        finally:
            conn.close()

# Chạy hàm tạo và chèn dữ liệu customer
num_rows = 100  # Số lượng bản ghi muốn chèn
customer_data = generate_customer_data(num_rows)
insert_customer_data(customer_data)
