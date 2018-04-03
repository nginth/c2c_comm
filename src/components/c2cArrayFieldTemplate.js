import React from "react";

function ArrayFieldTemplate(props) {
  return (
    <div className={props.className}>
      <label className='custom-array-label'>{props.title}</label>
      {props.items &&
        props.items.map(element => (
          <div key={element.index}>
            <div>{element.children}</div>
            <button className={"btn btn-danger btn-sm"} onClick={element.onDropIndexClick(element.index)}>
              Delete
            </button>
            <hr />
          </div>
        ))}

      {props.canAdd && (
        <div className="container row">
          <p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
            <button className={"btn btn-primary btn-sm"} onClick={props.onAddClick} type="button">
              Add
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default ArrayFieldTemplate;

// module.exports = {
//   schema: {
//     title: "Custom array of strings",
//     type: "array",
//     items: {
//       type: "string",
//     },
//   },
//   formData: ["react", "jsonschema", "form"],
//   ArrayFieldTemplate,
// };