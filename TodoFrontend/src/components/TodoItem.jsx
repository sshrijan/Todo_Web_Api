export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-3xl p-7 transition-all group">
      <div className="flex gap-5 items-start">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo.id, todo.isCompleted)}
          className="mt-1.5 w-7 h-7 accent-blue-600 cursor-pointer rounded-xl"
        />

        <div className="flex-1">
          <p className={`text-2xl font-medium transition-all duration-200 ${todo.isCompleted ? 'line-through text-zinc-500' : 'text-white'}`}>
            {todo.title}
          </p>

          {todo.description && (
            <p className={`mt-4 text-zinc-400 text-[17px] leading-relaxed ${todo.isCompleted ? 'line-through' : ''}`}>
              {todo.description}
            </p>
          )}

          <p className="text-xs text-zinc-500 mt-6">
            {new Date(todo.createdAt).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-600 p-3 rounded-2xl hover:bg-zinc-800 opacity-0 group-hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}