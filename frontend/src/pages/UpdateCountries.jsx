import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function UpdateCountries() {
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
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    reset(Country);
  }, [Country]);

  const onSubmit = (data) => {
    console.log(data);
    try {
      fetch(`http://localhost:8000/api/v1/countries/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((json) => json.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Edit your Country
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Change things about your country.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country name
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        King
                      </label>
                      <input
                        type="text"
                        {...register("king")}
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Population
                      </label>
                      <input
                        type="number"
                        {...register("population")}
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
