import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/ModeEditOutlineRounded';
import AddIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RunningIcon from '@mui/icons-material/RunningWithErrorsRounded';
import DoDisturbIcon from '@mui/icons-material/DoDisturbAltRounded';
import CheckIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import "../../styles/Dashboard/tableorder.css"
import { NavLink } from 'react-router-dom';

const TableOrder = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });
  const handleClassName = (rowTitle) =>{
    switch(rowTitle){
      case "Delivered":
        return "status-row Delivered" ;

      case "Processing":
        return "status-row Processing" ;

      case "Confirmed":
        return "status-row Confirmed" ;

      case "Pending":
        return "status-row Pending" ;

      default : 
        return "";
    }

  }

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('orderID')}>N° order </th>
          <th onClick={() => handleSort('orderCost')}>Cost </th>
          <th onClick={() => handleSort('orderCostumer')}>Customer </th>
          <th onClick={() => handleSort('orderDate')}>Date </th>
          <th onClick={() => handleSort('orderStatus')}>Status</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            <td>#{row.orderID}</td>
            <td>{row.orderCost} DZD</td>
            <td>{row.orderCostumer}</td>
            <td>{row.orderDate}</td>
            <td className={handleClassName(row.orderStatus)}>
                {row.orderStatus}
                {row.orderStatus === "Delivered" && <CheckIcon></CheckIcon>}
                {row.orderStatus === "Pending" && <DoDisturbIcon></DoDisturbIcon>}
                {row.orderStatus === "Confirmed" && <AddIcon></AddIcon> }
                {row.orderStatus === "Processing" && <RunningIcon></RunningIcon> }
            </td>
            <td> <NavLink to={`/orders/orderdetail/${row.orderID}`}><EditIcon></EditIcon></NavLink></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableOrder ;
