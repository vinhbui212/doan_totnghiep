import pymysql
import pandas as pd

# Kết nối MySQL bằng PyMySQL
conn = pymysql.connect(
    host="localhost",       # Địa chỉ host (thường là localhost)
    user="root",            # Tên người dùng MySQL
    password="1234",        # Mật khẩu người dùng MySQL
    database="doan_travel"  # Tên cơ sở dữ liệu
)

try:
    # Truy vấn SQL
    query = "SELECT * FROM tour"
    
    # Dùng pandas để đọc dữ liệu từ MySQL
    df = pd.read_sql(query, conn)

    # Xuất dữ liệu ra file Excel
    df.to_excel("tour2.xlsx", index=False)

    print("Xuất dữ liệu thành công!")
    
finally:
    # Đóng kết nối
    conn.close()
