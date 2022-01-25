import React, { useState } from "react";
import "./Todo.css";
import { FileUploader } from "react-drag-drop-files"; // unused import -1
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import CompletedItem from "./CompletedItem";

// This component is too long, it can further be refactor by breaking it up into multiple parts
export default function CompletedList() {
  var isAsc = true; // This should be inside CompletedList
  var showPending = true; // unused code -1

  const [cookies, setCookie] = useCookies(["ItemList"]);
  const [sortConfig, setSortConfig] = React.useState([
    { name: "name", direction: "descending" },
  ]);
  let dbData = cookies.ItemList;
  const [items, setItems] = useState(dbData);

  // You could extract the sorting to a separate file, to further clean up the process
  const requestSort = (key) => {
    let dir = "ascending";
    if (isAsc) {
      const sorted = [...items].sort((a, b) => (b[key] > a[key] ? 1 : -1));
      setItems(sorted);
      dir = "descending";
    } else {
      const sorted = [...items].sort((a, b) => (b[key] > b[key] ? 1 : -1));
      setItems(sorted);
      dir = "ascending";
    }
    isAsc = !isAsc;
    setSortConfig({ name: key, direction: dir });
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    let expires = new Date();
    expires.setTime(expires.getTime() + 10 * 60 * 60 * 1000);
    setCookie("ItemList", JSON.stringify(newItems), { path: "/", expires });
    setItems(newItems);
  };

  // You should not have an extra method for this -1
  const getClassNamesFor = (name, index) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.name === name ? sortConfig.direction : undefined;
  };

  // If this component is a table, then dont wrap the table into a div
  // Function lenght, there is too much stuff in the JSX that can be break down into smaller components.
  return (
    <div className="todo-container">
      <table style={{ marginLeft: "25% ", width: "80%" }}>
        <thead>
          <tr>
            <th>
              {/* You don't need the type="button" */}
              {/* Naming: The name linkClass implies they are hyperlinks not buttons -1 */}
              <button
                type="button"
                className="linkClass"
                onClick={() => requestSort("name")}
                className={getClassNamesFor("name", 0)}
              >
                Name
              </button>
            </th>
            <th>
              <button
                type="button"
                className="linkClass"
                onClick={() => requestSort("price")}
                className={getClassNamesFor("price", 1)}
              >
                Price($)
              </button>
            </th>
            <th>Image</th>
            <th>Remove Item</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <CompletedItem
              item={item}
              index={index}
              removeItem={removeItem}
              key={index}
            />
          ))}
        </tbody>
      </table>

      <div className="create-item">
        <Link to="/">
          {/* Don't add CSS inside React */}
          <button
            className="linkClass"
            style={{ marginLeft: "40% ", marginRight: "2%" }}
          >
            Home
          </button>
        </Link>

        {/* Don't add CSS inside React */}
        <Link to="/todo" className="linkClass">
          <button
            className="linkClass"
            style={{ marginLeft: " 5%", marginTop: "2%" }}
          >
            {" "}
            View Pending Items
          </button>
        </Link>
      </div>
    </div>
  );
}
