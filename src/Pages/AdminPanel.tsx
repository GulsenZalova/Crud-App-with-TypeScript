import React from 'react'
import axios from "axios"
import {useQuery } from 'react-query'
function AdminPanel() {
    const { data, isLoading, isError, error, isFetching } = useQuery(
        "categories",
        () => {
          return axios
            .get("https://northwind.vercel.app/api/suppliers")
            .then((res) => res.data);
        },
      );
    //   console.log(data);
  return (
    <div className='crudContainer'>

    {
        isLoading && (
            <h1>Loading....</h1>
        ) ||(
            <table>
        <thead>
          <tr>
            <th>İd</th>
            <th>CompanyName</th>
            <th>ContactName</th>
            <th>ContactTitle</th>
          </tr>
        </thead>
        <tbody>
          {
            data && (
              data.map((x:any) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.companyName}</td>
                  <td>{x.contactName}</td>
                  <td>{x.contactTitle}</td>
                </tr>
              ))
            )
          }
        </tbody>
      </table>
        )
    }
    </div>
  )
}

export default AdminPanel
