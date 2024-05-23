"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

interface Model {
  id: string;
  name: string;
}

function App() {
  // 定义状态变量
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [responses, setResponses] = useState<{question: string, response: string}[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 使用 useEffect 钩子来获取模型数据
  useEffect(() => {
    const fetchModels = async () => {
      try {
        // 从后端 API 获取模型数据
        const res = await axios.get('http://localhost:8000/api/models');
        setModels(res.data.models);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  // 提问函数
  const askQuestion = async () => {
    if (!selectedModel || !question) return;

    setLoading(true);
    try {
      // 向后端 API 发送问题请求
      const res = await axios.post('http://localhost:8000/api/chat', {
        model_id: selectedModel,
        question
      });
      setResponses(prev => [...prev, { question, response: res.data.response }]);
      setQuestion('');
    } catch (error) {
      console.error('Error chatting with model:', error);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/5 p-4 backdrop-blur-sm bg-white/30">
        <nav className="space-y-4">
        {models.map((model) => (
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => {
            setSelectedModel(model.name);
      setResponses(prev => [...prev, { question: `Select Model: ${model.name}`, response: '' }]);
          }}>{model.name}</a>
            ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {responses.map((item, index) => (
            <div key={index} className="my-2">
              <div className="text-blue-500 font-semibold">{item.question}</div>
              {item.response && <div className="mt-1 p-2 bg-gray-100 rounded-md">
                <ReactMarkdown>{item.response}</ReactMarkdown>
              </div>}
            </div>
          ))}
        </div>
        <div className="flex items-center p-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="输入你的问题"
            className="flex-grow p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={askQuestion}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? '提交中...' : '提交'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;

