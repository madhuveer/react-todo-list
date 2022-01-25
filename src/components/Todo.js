import React, { useState } from "react";
import "./Todo.css";

import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import AWS from "aws-sdk";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import Item from "./Item";
import CreateItem from "./CreateItem"

// This 2 variables belong on a separate file next to the upload function
const S3_BUCKET = "test136fileupload";
const REGION = "us-east-1";




var isAsc = true;
var currentSelection = -1;

function Todo() {
  const [isChecked, setIsChecked] = useState(-1);
  const [cookies, setCookie] = useCookies(["ItemList"]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    const newItems = [...items];
    newItems[currentSelection].completed = false;
    setIsChecked(-1);
    setItems(newItems);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleOk = () => {
    const newItems = [...items];
    newItems[currentSelection].completed = true;
    let expires = new Date();
    expires.setTime(expires.getTime() + 10 * 60 * 60 * 1000);
    setCookie("ItemList", JSON.stringify(newItems), { path: "/", expires });
    setItems(newItems);
    setShow(false);
  };

  let dbData = cookies.ItemList ? cookies.ItemList : [];

  const [items, setItems] = useState(dbData);

  AWS.config.update({
    accessKeyId: "AKIAZUKO2ASLLSHRCUFY",
    secretAccessKey: "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",
  });

  const [progress, setProgress] = useState(-1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sortConfig, setSortConfig] = React.useState([
    { name: "name", direction: "descending" },
  ]);
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload file should be on a separate file
  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const addItem = (name, price, image) => {
    let imageUrl = null;
    let expires = new Date();
    expires.setTime(expires.getTime() + 10 * 60 * 60 * 1000);
    if (image) {
      uploadFile(image);
      imageUrl = "https://test136fileupload.s3.amazonaws.com/" + image.name;
    }

    const newItem = [...items, { name, price, imageUrl, completed: false }];
    setCookie("ItemList", JSON.stringify(newItem), { path: "/", expires });
    setItems(newItem);
  };

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

  const completeItems = (index) => {
    currentSelection = index - 1;
    if (currentSelection != -1) {
      setIsChecked(currentSelection);
      handleShow();
    }
  };

  const getClassNamesFor = (name, index) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.name === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="todo-container">
      <table
        className={items.length > 0 ? undefined : "hidden"}
        style={{ marginLeft: "8% ", width: "80%" }}
      >
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard="False"
        >
          <Modal.Header closeButton>
            <Modal.Title>Complete Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do u want to complete Item?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleOk}>
              Yes
            </Button>
            <Button variant="primary" onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <thead>
          <tr>
            <th>Select Items</th>
            <th>
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
            <Item
              item={item}
              index={index}
              completeItems={completeItems}
              isChecked={isChecked}
              removeItem={removeItem}
              key={index}
            />
          ))}
        </tbody>
      </table>

      <div className="create-item">
        <CreateItem addItem={addItem} />
      </div>
      <Link to="/">
        <button
          className="linkClass"
          style={{ marginLeft: "36% ", marginRight: "2%" }}
        >
          Home
        </button>
      </Link>
      <Link to="/completedItems" className="linkClass">
        <button
          className="linkClass"
          style={{ marginLeft: " 2% ", marginTop: "2%" }}
        >
          {" "}
          View Completed Items
        </button>
      </Link>
    </div>
  );
}

export default Todo;
