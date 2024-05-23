import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

# 初始化 Flask 应用
app = Flask(__name__)

# 为应用启用跨域资源共享 (CORS)
CORS(app)

# 从环境变量中设置 OLLAMA API 的基本 URL，如果未设置则使用默认值
OLLAMA_BASE_URL = os.getenv('OLLAMA_BASE_URL', 'http://host.docker.internal:11434')

# 定义路由以获取可用模型
@app.route('/api/models', methods=['GET'])
def get_models():
    try:
        # 向 OLLAMA API 发送 GET 请求以检索模型标签
        response = requests.get(f"{OLLAMA_BASE_URL}/api/tags")
        # 以 JSON 格式返回响应
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        # 如果请求失败，返回错误信息
        return jsonify({"error": str(e)}), 500

# 定义路由以与特定模型进行交互
@app.route('/api/chat', methods=['POST'])
def chat_with_model():
    data = request.json  # 从请求体中获取 JSON 数据
    model_id = data.get('model_id')  # 从请求中提取模型 ID
    question = data.get('question')  # 从请求中提取问题

    try:
        # 向 OLLAMA API 发送 POST 请求，根据模型和问题生成响应
        response = requests.post(f"{OLLAMA_BASE_URL}/api/generate", json={
            "model": model_id,
            "prompt": question,
            "stream": False
        })
        # 以 JSON 格式返回响应
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        # 如果请求失败，返回错误信息
        return jsonify({"error": str(e)}), 500

# 在主机 0.0.0.0 和端口 8000 上运行 Flask 应用
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
