"use client"
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading} = useChat();

  return(
    <section className="flex flex-col justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="max-w-2xl w-full">
        <div className="text-white max-h-72 h-full overflow-y-auto">
          {messages.map((m, index)=>(
            <div key={index} className={`flex flex-col mb-2 p-2 rounded-md ${
              m.role === "assistant"
              ? "self-end bg-gray-800/70"
              : "self-start bg-emerald-500/60"
            }`}>
              <span className={`text-xs ${
                m.role === "assistant" ? "text-right" : "text-left"
              }`}>
                {m.role && m.role === "assistant" ? 'Escritor' : 'Lector' }
              </span>{" "}
              {m.content}
            </div>
          ))}
        </div>
        <div className="flex justify-between my-4">
          <label className="text-white block font-bold my-2 bg-black/50 p-2 rounded-md">
            Indica al chat los valores que deseas reforzar y te generará un cuento.
          </label>
          <button className="bg-emerald-500 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-70"
          disabled={isLoading || !input}>Generar</button>
        </div>
        <textarea 
        rows={4}
        value={input}
        onChange={handleInputChange}
        className="text-black bg-slate-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Ejemplo: Deseo reforzar la amistad."
        autoFocus/>
      </form>
    </section>
  )
}