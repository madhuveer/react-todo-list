/**
 * Post refactor
 * Now, that i refactored the project by putting each function into a separate file, i can start helping the studnet more.
 * Here we have duplication: CompletedItem and Item do the same, represent the same todo item, it just one time can be either completed or not completed.
 */

export default function CompletedItem({ item, index, removeItem }) {
  return (
    <tr className={item.completed ? undefined : "hidden"}>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>
        <div className="item">
          <img className="placeholder" src={item.imageUrl} />
        </div>
      </td>
      <td>
        {/* Css inside react -1 */}
        <button style={{ background: "red" }} onClick={() => removeItem(index)}>
          x
        </button>
      </td>
    </tr>
  );
}
