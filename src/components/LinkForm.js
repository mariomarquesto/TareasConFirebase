// LinkForm.js
import React, { useState } from "react";
const initialSetValues = {
  url: "",
  name: "",
  description: "",
};

const LinkForm = (props) => {
  const [formValues, setFormValues] = useState(initialSetValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.url && formValues.name && formValues.description) {
      props.addOrEdit(formValues);
      setFormValues(initialSetValues); // Limpiar el formulario al valor inicial
    } else {
      alert("Please fill in all fields"); // Alertar si falta algún campo
    }
  };

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="https://someurl.com"
          name="url"
          value={formValues.url}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Website name"
          value={formValues.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <textarea
          name="description"
          rows="3"
          className="form-control"
          placeholder="Write a description..."
          value={formValues.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Save Link
      </button>
    </form>
  );
};

export default LinkForm;
