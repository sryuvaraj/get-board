"use client"

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  const addUser = async () => {
    if (!name.trim()) return; // Prevent empty names

    try {
      const response = await fetch("https://get-board-json-api.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          id: "custom-id",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const data = await response.json();
      console.log("User added:", data);

      setName(""); // Clear input after success
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="border px-4 py-2 rounded"
        placeholder="Enter name"
      />
      <button onClick={addUser} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </div>
  );
}
