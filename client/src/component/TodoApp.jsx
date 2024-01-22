import { useState, useEffect } from "react";
import "./TodoApp.css";
import axios from "axios";
import {
  AddItemContext,
  AddItemProvider,
  useAddItem,
} from "../context/AddItemContext";

const TodoApp = () => {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateaItemText, setUpdateItemText] = useState("");

  const additems = async (e) => {
    e.preventDefault();
    try {
      const abc = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
      });
      console.log(abc);
      setItemText("");
      getItemList(); // Refresh the list after adding an item
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);

  const getItemList = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5500/api/items");
      setListItems(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      console.log(res.data);
      getItemList(); // Refresh the list after deleting an item
    } catch (err) {
      console.log(err);
    }
  };

  //Update item

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/item/${isUpdating}`,
        { item: updateaItemText }
      );
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      listItems[updatedItemIndex].item = updateaItemText;
      setUpdateItemText("");
      setIsUpdating("");
    } catch (err) {
      console.log(err);
    }
  };
  // before updating item we need to show input field where we will create our new updated item
  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item "
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateaItemText}
      />
      <button className="update-new-btn" type="submit">
        Update{" "}
      </button>
    </form>
  );
  return (
    <AddItemProvider value={{ additems }}>
      <div className="main">
        <h1>Todo List</h1>
        <form className="form" onSubmit={(e) => additems(e)}>
          <input
            type="text"
            placeholder="Add Todo Item"
            onChange={(e) => setItemText(e.target.value)}
            value={itemText}
          />
          <button type="submit">Add</button>
        </form>
        <div className="todo-listItems">
          {loading ? (
            <p>Loading...</p>
          ) : (
            listItems.map((item) => (
              <div key={item._id} className="todo-item">
                {isUpdating === item._id ? (
                  renderUpdateForm()
                ) : (
                  <>
                    <p className="item-content">{item.item}</p>
                    <button
                      className="update-item"
                      onClick={() => {
                        setIsUpdating(item._id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="delete-item"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AddItemProvider>
  );
};

export default TodoApp;
