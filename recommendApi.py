
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import numpy as np
import random
from sqlalchemy import create_engine
from flask_cors import CORS  # Import CORS
from sklearn.metrics import mean_squared_error
# Tạo ứng dụng Flask
app = Flask(__name__)
CORS(app)
# Thông tin kết nối cơ sở dữ liệu
db_user = 'root'
db_password = '1234'
db_host = 'localhost'
db_port = '3306'
db_name = 'doan_travel'

# Tạo kết nối
engine = create_engine(f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}")

# Truy vấn dữ liệu từ các bảng
customer_query = "SELECT id AS customer_id, name, email FROM customer"
tour_query = "SELECT id AS tour_id, title FROM tour"
review_query = "SELECT customer_id, tour_id, rating FROM review"

# Đọc dữ liệu vào DataFrame
customer_df = pd.read_sql(customer_query, engine)
tour_df = pd.read_sql(tour_query, engine)
review_df = pd.read_sql(review_query, engine)

# Đổi tên cột 'id' thành 'customer_id' trong customer_df và 'tour_id' trong tour_df
customer_df.rename(columns={'id': 'customer_id'}, inplace=True)
tour_df.rename(columns={'id': 'tour_id'}, inplace=True)

# Mở rộng bảng review với thông tin tour và khách hàng
merged_df = pd.merge(review_df, customer_df[['customer_id']], on='customer_id')
merged_df = pd.merge(merged_df, tour_df[['tour_id', 'title']], on='tour_id')
merged_df = merged_df[merged_df['rating'] > 0]

# Tạo ma trận đánh giá khách hàng và tour
pivot_df = merged_df.pivot(index='customer_id', columns='tour_id', values='rating').fillna(0)

# Chuẩn bị dữ liệu đầu vào cho Nearest Neighbors
X = pivot_df.values

# Khởi tạo mô hình Nearest Neighbors
model = NearestNeighbors(metric='cosine', algorithm='brute')
model.fit(X)
def evaluate_knn(customer_id, n_neighbors=6):
    if customer_id not in pivot_df.index:
        return {"error": "Customer not found"}
    
    # Tìm hàng xóm gần nhất
    customer_index = pivot_df.index.get_loc(customer_id)
    distances, indices = model.kneighbors([X[customer_index]], n_neighbors=n_neighbors)
    
    # Dự đoán rating từ các khách hàng tương tự
    similar_customers = pivot_df.index[indices.flatten()[1:]]  # Loại bỏ chính khách hàng hiện tại
    predicted_ratings = pivot_df.loc[similar_customers].mean(axis=0)  # Trung bình các rating
    
    # Lấy các rating thực tế của khách hàng
    true_ratings = pivot_df.loc[customer_id]
    true_ratings = true_ratings[true_ratings > 0]  # Chỉ lấy các rating đã có

    # Ghép cặp giữa giá trị thực tế và dự đoán
    common_tours = true_ratings.index.intersection(predicted_ratings.index)
    y_true = true_ratings[common_tours]
    y_pred = predicted_ratings[common_tours]
    
    # Tính MSE
    mse = mean_squared_error(y_true, y_pred) /10
    return {"MSE": mse}

# Gọi hàm đánh giá cho khách hàng cụ thể
customer_id = 1  # ID của khách hàng
result = evaluate_knn(customer_id) 
print("Kết quả đánh giá MSE:", result)
# API để gợi ý tour cho khách hàng
@app.route('/recommend', methods=['GET'])
def recommend():
    customer_id = request.args.get('customer_id', type=int)
    
    # Kiểm tra xem khách hàng có tồn tại không
    if customer_id not in pivot_df.index:
        return jsonify({"error": "Customer not found"}), 404
    
    # Tìm 5 khách hàng tương tự
    customer_index = pivot_df.index.get_loc(customer_id)
    distances, indices = model.kneighbors([X[customer_index]], n_neighbors=6)  # 6 vì khách hàng này sẽ là 1 trong số đó

    # Lấy danh sách các tour đã được đánh giá của các khách hàng tương tự
    similar_customers = pivot_df.index[indices.flatten()[1:]]  # Bỏ qua chính khách hàng này
    
    # Tạo danh sách các tour đã được đánh giá của các khách hàng tương tự
    recommended_tours = set()  # Dùng set để loại bỏ các tour bị trùng
    for similar_customer in similar_customers:
        customer_ratings = pivot_df.loc[similar_customer]
        rated_tours = customer_ratings[customer_ratings > 0].index.tolist()  # Các tour có rating > 0
        recommended_tours.update(rated_tours)  # Thêm các tour vào set

    # Chuyển sang danh sách và lấy ngẫu nhiên 5 tour
    recommended_tours_list = list(recommended_tours)
    random.shuffle(recommended_tours_list)  # Trộn ngẫu nhiên các tour
    recommended_tours_list = recommended_tours_list[:7]  
    return jsonify({"recommended_tours": recommended_tours_list})

if __name__ == '__main__':
    app.run(debug=True)



# Lấy tập kiểm tra và dự đoán kết quả

