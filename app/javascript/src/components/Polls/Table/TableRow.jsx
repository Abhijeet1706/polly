import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TableRow = ({ data, destroyPoll, isLoggedIn }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.title}>
          <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
            {rowData.title}
          </td>
          <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
            {isLoggedIn ? (
              <Link
                to={`/polls/${rowData?.id}/show`}
                className="text-bb-purple"
              >
                Show
              </Link>
            ) : (
              ""
            )}
          </td>
          <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
            {isLoggedIn ? (
              <Link
                to={`/polls/${rowData?.id}/edit`}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </Link>
            ) : (
              ""
            )}
          </td>
          <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
            {isLoggedIn ? (
              <a
                className="text-red-500 hover:text-red-700"
                onClick={() => destroyPoll(rowData.id)}
              >
                Delete
              </a>
            ) : (
              ""
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  destroyPoll: PropTypes.func,
};

export default TableRow;
