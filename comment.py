from faker import Faker
import random
import pymysql
from datetime import datetime

# Khởi tạo Faker
fake = Faker()

# Hàm tạo dữ liệu giả cho bảng review
def generate_review_data(num_rows):
    data = []
    for i in range(1, num_rows + 1):
        row = {
            "tour_id": random.randint(1, 10000),  # Tạo tour_id từ 1 đến 10000
            "comment": fake.text(max_nb_chars=200),  # Tạo comment ngẫu nhiên, dài tối đa 200 ký tự
            "customer_id": random.randint(1, 100),  # Tạo customer_id từ 1 đến 100
            "date": fake.date_this_year(),  # Tạo ngày trong năm hiện tại
            "rating": random.randint(0, 5),  # Tạo rating từ 0 đến 5
            "has_reviewed": 1  # Luôn có review (giá trị = 1)
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
        print("Kết nối thành công đến MySQL server.")
        return conn
    except Exception as e:
        print(f"Lỗi kết nối: {e}")

# Hàm chèn dữ liệu giả vào bảng review
def insert_reviews_into_db(num_rows):
    conn = check_db_connection()
    if not conn:
        return

    try:
        with conn.cursor() as cursor:
            # Lặp qua tất cả các review giả tạo để chèn vào bảng
            review_data = generate_review_data(num_rows)
            for review in review_data:
                insert_query = """
                INSERT INTO review (tour_id, comment, customer_id, date, rating, has_reviewed)
                VALUES (%s, %s, %s, %s, %s, %s)
                """
                cursor.execute(insert_query, (
                    review["tour_id"],
                    review["comment"],
                    review["customer_id"],
                    review["date"],
                    review["rating"],
                    review["has_reviewed"]
                ))

            # Commit các thay đổi vào cơ sở dữ liệu
            conn.commit()
            print(f"Đã chèn {num_rows} bản ghi vào bảng review.")

    except Exception as e:
        print(f"Lỗi khi chèn dữ liệu: {e}")
    finally:
        conn.close()

# Gọi hàm để chèn 3000 review vào bảng
insert_reviews_into_db(300)
