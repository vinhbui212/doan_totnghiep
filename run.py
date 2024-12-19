from faker import Faker
import random
from datetime import datetime
import pymysql

# Khởi tạo Faker
fake = Faker()

# Hàm tạo dữ liệu giả theo thứ tự
def generate_sequential_fake_data(num_rows):
    data = []
    for i in range(1001, num_rows + 1):
        row = {
            "id": i,  # Tạo id từ 14 trở đi
            "is_abroad": random.choice([0, 1]),
            "end_date": fake.date_between(start_date=datetime(2024, 1, 1), end_date=datetime(2024, 12, 31)),
            "start_date": fake.date_between(start_date=datetime(2023, 1, 1), end_date=datetime(2023, 12, 31)),
            "description": f"Tour khám phá {fake.city()} với các địa điểm nổi bật.",
            "price_currency": random.choice(["USD", "VND", "EUR"]),
            "schedule": f"Ngày 1: {fake.sentence()} | Ngày 2: {fake.sentence()}",
            "title": f"Khám phá {fake.city()} - Tour {i}",
            "img_url": fake.image_url(),
            "departure": fake.city(),
            "destination": fake.city(),
            "price": round(random.uniform(100, 10000), 2)
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

        print("Kết nối đến cơ sở dữ liệu MySQL thành công!")
        return conn  # Trả về kết nối nếu thành công
        
    except pymysql.MySQLError as err:
        print(f"Lỗi kết nối MySQL: {err}")
        return None

# Hàm chèn dữ liệu vào cơ sở dữ liệu
def insert_fake_data(num_rows):
    conn = check_db_connection()
    if conn:
        cursor = conn.cursor()
        data = generate_sequential_fake_data(num_rows)
        
        insert_query = """
        INSERT INTO tour (title, description, price, price_currency, start_date, end_date, departure, destination, is_abroad, schedule, img_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        try:
            for row in data:
                values = (row['title'], row['description'], row['price'], row['price_currency'],
                          row['start_date'], row['end_date'], row['departure'], row['destination'],
                          row['is_abroad'], row['schedule'], row['img_url'])
                cursor.execute(insert_query, values)
            conn.commit()
            print(f"{num_rows} bản ghi đã được chèn thành công.")
        except pymysql.MySQLError as err:
            print(f"Lỗi khi chèn dữ liệu: {err}")
        finally:
            cursor.close()
            conn.close()
    else:
        print("Không thể kết nối đến cơ sở dữ liệu, không thể chèn dữ liệu.")

# Chèn 1000 bản ghi vào bảng "tour"
insert_fake_data(10000)
