import pymysql
from faker import Faker

# Khởi tạo Faker
fake = Faker()

# Hàm tạo dữ liệu img_url giả
def generate_fake_img_urls(num_rows):
    img_urls = []
    for i in range(31, num_rows + 1):
        img_url = fake.image_url()  # Faker sẽ tạo một URL ảnh ngẫu nhiên
        img_urls.append({"id": i, "img_url": img_url})
    return img_urls

# Kiểm tra kết nối MySQL
def check_db_connection():
    try:
        conn = pymysql.connect(
            host="localhost",  # Địa chỉ MySQL
            user="root",       # Tên người dùng MySQL
            password="1234",   # Mật khẩu MySQL
            database="doan_travel"  # Tên cơ sở dữ liệu
        )
        print("Kết nối thành công")
        return conn
    except Exception as e:
        print(f"Lỗi kết nối: {e}")
        return None

# Hàm cập nhật dữ liệu img_url vào MySQL
def update_img_urls_in_db(num_rows):
    conn = check_db_connection()
    if conn is None:
        return
    
    cursor = conn.cursor()

    # Tạo dữ liệu giả cho img_url
    img_urls_data = generate_fake_img_urls(num_rows)

    # Câu lệnh SQL để update img_url theo id
    sql = "UPDATE tour SET img_url3 = %s WHERE id = %s"
    
    try:
        # Cập nhật dữ liệu vào cơ sở dữ liệu
        cursor.executemany(sql, [(data["img_url"], data["id"]) for data in img_urls_data])

        # Commit các thay đổi
        conn.commit()

        print(f"Đã cập nhật {cursor.rowcount} bản ghi")
    except Exception as e:
        print(f"Lỗi khi cập nhật: {e}")
        conn.rollback()
    finally:
        # Đóng kết nối
        conn.close()

# Chạy hàm để update
update_img_urls_in_db(10000)  # Giả sử bạn muốn update cho 1100 bản ghi
