from flask import Flask, request, jsonify
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Khởi tạo ứng dụng Flask
app = Flask(__name__)

# Tải dữ liệu (giả sử đã được lưu sẵn trên máy chủ)
data = pd.read_csv('Reviews.csv', encoding='ISO-8859-1')

# Chuẩn bị ma trận đánh giá User x Location
cf_data = data[['User_ID', 'Location_Name', 'Rating']]
user_location_matrix = cf_data.pivot_table(
    index='User_ID',
    columns='Location_Name',
    values='Rating'
)
user_location_matrix_filled = user_location_matrix.fillna(0)

# Tính toán sự tương đồng giữa người dùng
user_similarity = cosine_similarity(user_location_matrix_filled)
user_similarity_df = pd.DataFrame(
    user_similarity,
    index=user_location_matrix.index,
    columns=user_location_matrix.index
)

@app.route('/recommend', methods=['POST'])
def recommend():
    """
    API nhận User_ID và trả về danh sách các địa điểm được gợi ý.
    """
    user_id = request.json.get('User_ID')
    num_recommendations = request.json.get('num_recommendations', 5)

    if user_id not in user_location_matrix.index:
        return jsonify({'error': 'User_ID not found in the dataset'}), 404

    # Lấy danh sách người dùng tương tự
    similar_users = user_similarity_df[user_id].sort_values(ascending=False)
    
    # Tính toán điểm dự đoán cho các địa điểm
    user_ratings = user_location_matrix_filled.loc[user_id]
    weighted_ratings = pd.Series(0, index=user_ratings.index)
    similarity_sum = 0

    for similar_user, similarity_score in similar_users.items():
        if similar_user != user_id:
            similarity_sum += similarity_score
            weighted_ratings += user_location_matrix_filled.loc[similar_user] * similarity_score

    # Chuẩn hóa điểm dự đoán
    predicted_ratings = weighted_ratings / similarity_sum

    # Gợi ý các địa điểm chưa được đánh giá
    recommendations = predicted_ratings[user_ratings == 0].sort_values(ascending=False).head(num_recommendations)

    return jsonify({
        'User_ID': user_id,
        'Recommendations': recommendations.index.tolist(),
        'Predicted_Ratings': recommendations.values.tolist()
    })

if __name__ == '__main__':
    app.run(debug=True)