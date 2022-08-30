import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Countries() {
  const [table, setTable] = useState([]);
  useEffect(() => {
    (async () => {
      const countries = fetch("http://localhost:8000/api/v1/countries", {
        mode: "cors",
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => setTable(responseData.countries));
      console.log(table);
    })();
  }, []);
  const deleteCountry = (id, index) => {
    fetch(`http://localhost:8000/api/v1/countries/${id}`, {
      method: "delete",
    });
    let temp = [...table];
    temp.splice(index, 1);
    setTable(temp);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Name Of Country</th>
          <th>Population</th>
          <th>King Of country</th>
          <th>Action</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {table.map((country, i) => (
          <tr key={country.id}>
            <td>{country.name}</td>
            <td>{country.population}</td>
            <td>{country.king}</td>
            <td className="text-lime-500">
              <Link to={`edit/${country.id}`}>Edit</Link>
            </td>
            <td
              className="text-red-500"
              onClick={() => deleteCountry(country.id, i)}
            >
              Delete
            </td>
            <td>
              <Link to={`view/${country.id}`}>View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
