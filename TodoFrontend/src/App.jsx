import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './components/TodoItem';

const API_URL = 'https://localhost:5059/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.post(API_URL, {
        title: title.trim(),
        description: description.trim() || null,
      });
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id, isCompleted) => {
    try {
      const current = todos.find(t => t.id === id);
      await axios.put(`${API_URL}/${id}`, {
        id,
        title: current.title,
        description: current.description,
        isCompleted: !isCompleted,
      });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold text-white tracking-tighter mb-2">
            todos.
          </h1>
          <p className="text-zinc-400 text-xl">Simple. Clean. Productive.</p>
        </div>

        {/* Add Todo Form */}
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl mb-12">
          <form onSubmit={addTodo} className="space-y-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:border-blue-600 rounded-2xl px-6 py-5 text-lg outline-none transition"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description (optional)"
              rows="3"
              className="w-full bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:border-blue-600 rounded-3xl px-6 py-5 outline-none resize-y transition"
            />

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-4 rounded-2xl text-lg hover:bg-zinc-200 active:scale-[0.985] transition-all duration-200"
            >
              Add New Task
            </button>
          </form>
        </div>

        {/* Todo List */}
        {loading ? (
          <p className="text-center text-zinc-500 text-lg">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-3xl text-zinc-600">No tasks yet</p>
            <p className="text-zinc-500 mt-3">Create your first task above</p>
          </div>
        ) : (
          <div className="space-y-5">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;