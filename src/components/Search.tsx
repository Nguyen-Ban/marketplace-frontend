import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const products = [
    { id: 1, name: "Robot Toy", price: 120000 },
    { id: 2, name: "Car Toy", price: 90000 },
  ];

  const results = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tìm kiếm sản phẩm</h2>
      <input
        type="text"
        placeholder="Nhập tên sản phẩm..."
        className="border p-2 rounded w-full max-w-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-red-500">{p.price.toLocaleString()} đ</p>
          </div>
        ))}
      </div>
    </div>
  );
}
