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

# Kết nối cơ sở dữ liệu
engine = create_engine(f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}")

# Truy vấn dữ liệu từ các bảng
customer_query = "SELECT id AS customer_id, name, email FROM customer"
tour_query = "SELECT id AS tour_id, title FROM tour"
review_query = "SELECT customer_id, tour_id, rating FROM review"

# Đọc dữ liệu vào DataFrame
customer_df = pd.read_sql(customer_query, engine)
tour_df = pd.read_sql(tour_query, engine)
review_df = pd.read_sql(review_query, engine)

# Tiền xử lý dữ liệu
merged_df = pd.merge(review_df, customer_df[['customer_id']], on='customer_id')
merged_df = pd.merge(merged_df, tour_df[['tour_id', 'title']], on='tour_id')
merged_df = merged_df[merged_df['rating'] > 0]  # Loại bỏ các rating không hợp lệ

# **Lọc các tour có ít nhất 3 đánh giá**
tour_counts = merged_df['tour_id'].value_counts()
valid_tours = tour_counts[tour_counts >= 2].index.tolist()
filtered_df = merged_df[merged_df['tour_id'].isin(valid_tours)]  # Chỉ giữ các tour hợp lệ

# Tạo ma trận đánh giá khách hàng và tour
pivot_df = filtered_df.pivot(index='customer_id', columns='tour_id', values='rating').fillna(0)

# Chuẩn bị dữ liệu đầu vào cho Nearest Neighbors
X = pivot_df.values
model = NearestNeighbors(metric='cosine', algorithm='brute')
model.fit(X)

# Hàm gợi ý tour cho khách hàng
def recommend_tours_knn(customer_id, n_neighbors=5):
    if customer_id not in pivot_df.index:
        return {"error": "Customer not found"}

    # Tìm hàng xóm gần nhất
    customer_index = pivot_df.index.get_loc(customer_id)
    distances, indices = model.kneighbors([X[customer_index]], n_neighbors=n_neighbors + 1)  # +1 để loại trừ chính khách hàng

    # Lấy danh sách khách hàng tương tự
    similar_customers = pivot_df.index[indices.flatten()[1:]]  # Bỏ khách hàng hiện tại

    # Tìm các tour được đánh giá bởi khách hàng tương tự
    recommended_tours = set()
    for similar_customer in similar_customers:
        customer_ratings = pivot_df.loc[similar_customer]
        rated_tours = customer_ratings[customer_ratings > 0].index.tolist()
        recommended_tours.update(rated_tours)

    # Loại bỏ các tour khách hàng hiện tại đã đánh giá
    already_rated = pivot_df.loc[customer_id][pivot_df.loc[customer_id] > 0].index.tolist()
    final_recommendations = [tour for tour in recommended_tours if tour not in already_rated]

    # Giới hạn số lượng tour gợi ý tối đa là 10
    max_recommendations = 10
    final_recommendations = final_recommendations[:max_recommendations]

    num_recommendations = min(7, len(final_recommendations))  # Lấy tối đa 7 tour hoặc số lượng hiện có
    recommendations = random.sample(final_recommendations, num_recommendations) if final_recommendations else []

    return recommendations



def refresh_data():
    global customer_df, tour_df, review_df, pivot_df, X, model

    # Tải lại dữ liệu từ cơ sở dữ liệu
    customer_df = pd.read_sql(customer_query, engine)
    tour_df = pd.read_sql(tour_query, engine)
    review_df = pd.read_sql(review_query, engine)

    # Tiền xử lý dữ liệu
    merged_df = pd.merge(review_df, customer_df[['customer_id']], on='customer_id')
    merged_df = pd.merge(merged_df, tour_df[['tour_id', 'title']], on='tour_id')
    merged_df = merged_df[merged_df['rating'] > 0]

    # Lọc các tour có ít nhất 2 đánh giá
    tour_counts = merged_df['tour_id'].value_counts()
    valid_tours = tour_counts[tour_counts >= 2].index.tolist()
    filtered_df = merged_df[merged_df['tour_id'].isin(valid_tours)]

    # Tạo ma trận đánh giá
    pivot_df = filtered_df.pivot(index='customer_id', columns='tour_id', values='rating').fillna(0)

    # Cập nhật mô hình Nearest Neighbors
    X = pivot_df.values
    model = NearestNeighbors(metric='cosine', algorithm='brute')
    model.fit(X)

# Hàm đánh giá mô hình bằng RMSE
def evaluate_knn_rmse(customer_id, n_neighbors=5):
    if customer_id not in pivot_df.index:
        return {"error": "Customer not found"}
    
    # Tìm hàng xóm gần nhất
    customer_index = pivot_df.index.get_loc(customer_id)
    distances, indices = model.kneighbors([X[customer_index]], n_neighbors=n_neighbors+1)  # +1 để loại trừ chính khách hàng
    
    # Dự đoán rating từ các khách hàng tương tự
    similar_customers = pivot_df.index[indices.flatten()[1:]]  # Bỏ qua chính khách hàng hiện tại
    predicted_ratings = pivot_df.loc[similar_customers].mean(axis=0)  # Trung bình các rating
    
    # Lấy các rating thực tế của khách hàng
    true_ratings = pivot_df.loc[customer_id]
    true_ratings = true_ratings[true_ratings > 0]  # Chỉ lấy các rating đã có
    
    # Ghép cặp giữa giá trị thực tế và dự đoán
    common_tours = true_ratings.index.intersection(predicted_ratings.index)
    y_true = true_ratings[common_tours]
    y_pred = predicted_ratings[common_tours]
    
    # Tính RMSE
    if len(y_true) == 0:
        return {"error": "No common tours to evaluate RMSE"}
    
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    return {"RMSE": rmse}

# API đánh giá RMSE cho khách hàng cụ thể
@app.route('/evaluate', methods=['GET'])
def evaluate():
    customer_id = request.args.get('customer_id', type=int)
    if customer_id not in pivot_df.index:
        return jsonify({"error": "Customer not found"}), 404

    result = evaluate_knn_rmse(customer_id)
    return jsonify(result)

# API gợi ý tour
@app.route('/recommend', methods=['GET'])
def recommend():
    try:
        customer_id = request.args.get('customer_id', type=int)
        if customer_id not in pivot_df.index:
            refresh_data()  # Làm mới dữ liệu từ cơ sở dữ liệu
            if customer_id not in pivot_df.index:
                return jsonify({"error": "Customer not found"}), 404

        recommendations = recommend_tours_knn(customer_id)
        if isinstance(recommendations, dict) and "error" in recommendations:
            return jsonify(recommendations), 404

        return jsonify({"recommended_tours": recommendations})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
