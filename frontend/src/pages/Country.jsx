import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Country() {
  const [Country, setCountry] = useState({});
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      fetch(`http://localhost:8000/api/v1/countries/${id}`, {
        mode: "cors",
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => setCountry(...responseData.countries));
      console.log(Country);
    })();
  }, []);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Applicant Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Country name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {Country.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Population of Country
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {Country.population}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              King of {Country.name}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {Country.king}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
