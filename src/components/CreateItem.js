import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

var hidden = true;
var name = "",
  price = 0,
  image1;
const fileTypes = ["JPG", "PNG", "GIF"];

export default function CreateItem({ addItem }) {
  const [style, setStyle] = useState("hidden");

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    image1 = file;
    console.log(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hidden) {
      hidden = false;
      setStyle("visible");
      return;
    }
    if (!name) return;
    addItem(name, price, image1);
    hidden = true;
    name = "";
    price = 0;
    image1 = undefined;
    setStyle("hidden");
    setFile(undefined);
    //     name="";
    //   price="";
  };
  return (
    <form>
      <div
        className={hidden ? "hidden" : undefined}
        style={{ marginLeft: "14% " }}
      >
        <div className="row">
          <input
            type="text"
            className="input"
            placeholder="Name"
            onChange={(e) => (name = e.target.value)}
          />
          <input
            type="number"
            className="input"
            min="1"
            placeholder="Price"
            onChange={(e) => (price = e.target.value)}
          />
          <div style={{ marginLeft: "2% " }}>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
            <p style={{ marginRight: "40rem" }}>
              {file ? `File name: ${file.name}` : "no files uploaded yet"}
            </p>
          </div>
        </div>
      </div>

      <br></br>

      <button
        className="btn btn-primary"
        style={{ marginLeft: "42% " }}
        onClick={handleSubmit}
      >
        Add Item
      </button>
      <p style={{ marginRight: "5rem" }}>
        Click on button to add the Item list
      </p>
      <div></div>
    </form>
  );
}
