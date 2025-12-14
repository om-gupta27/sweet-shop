import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { isAdmin } from "../utils/auth";
import "./Sweets.css";

function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [hideOutOfStock, setHideOutOfStock] = useState(false);

  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  async function loadSweets() {
    const data = await apiRequest("/api/sweets");
    setSweets(data);
  }

  async function handleAddSweet() {
    await apiRequest("/api/sweets", "POST", {
      ...newSweet,
      price: Number(newSweet.price),
      quantity: Number(newSweet.quantity)
    });
    setNewSweet({ name: "", category: "", price: "", quantity: "" });
    loadSweets();
  }

  async function purchase(id) {
    await apiRequest(`/api/sweets/${id}/purchase`, "POST");
    loadSweets();
  }

  async function restock(id) {
    const amount = prompt("Enter restock amount:");
    if (!amount) return;
    await apiRequest(`/api/sweets/${id}/restock?amount=${amount}`, "POST");
    loadSweets();
  }

  async function deleteSweet(id) {
    if (!window.confirm("Delete this sweet?")) return;
    await apiRequest(`/api/sweets/${id}`, "DELETE");
    loadSweets();
  }

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div>
      <h2>Sweets</h2>

      {/* ADD SWEET (ADMIN ONLY) */}
      {isAdmin() && (
        <div className="add-sweet">
          <h3>Add Sweet</h3>

          <input
            placeholder="Name"
            value={newSweet.name}
            onChange={(e) =>
              setNewSweet({ ...newSweet, name: e.target.value })
            }
          />

          <input
            placeholder="Category"
            value={newSweet.category}
            onChange={(e) =>
              setNewSweet({ ...newSweet, category: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={newSweet.price}
            onChange={(e) =>
              setNewSweet({ ...newSweet, price: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Quantity"
            value={newSweet.quantity}
            onChange={(e) =>
              setNewSweet({ ...newSweet, quantity: e.target.value })
            }
          />

          <button onClick={handleAddSweet}>Add</button>
        </div>
      )}

      {/* SEARCH + FILTER */}
      <div className="filters">
        <input
          placeholder="Search sweet..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={hideOutOfStock}
            onChange={(e) => setHideOutOfStock(e.target.checked)}
          />
          Hide out of stock
        </label>
      </div>

      {/* SWEETS GRID */}
      <div className="sweets-grid">
        {sweets
          .filter((s) =>
            s.name.toLowerCase().includes(search.toLowerCase())
          )
          .filter((s) => (hideOutOfStock ? s.quantity > 0 : true))
          .map((s) => (
            <div key={s.id} className="sweet-card">
              <h4>{s.name}</h4>

              <div className="info">
                <span className="price">₹{s.price}</span>
                <span className="qty">Qty: {s.quantity}</span>
              </div>

              <div className="actions">
                <button
                  onClick={() => purchase(s.id)}
                  disabled={s.quantity === 0}
                >
                  Buy
                </button>

                {isAdmin() && (
                  <>
                    <button onClick={() => restock(s.id)}>Restock</button>
                    <button onClick={() => deleteSweet(s.id)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Sweets;
