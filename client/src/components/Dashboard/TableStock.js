import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DoDisturbIcon from '@mui/icons-material/DoDisturbAltRounded';
import CheckIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import "../../styles/Dashboard/tableorder.css"
import { NavLink } from 'react-router-dom';

const TableStock = ({ data }) => {
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
        if(rowTitle > 0){
            return "status-row in-stock"
        }
        else{
            return "status-row out-of-stock"
        }
    }

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('productID')}>N° Product </th>
          <th onClick={() => handleSort('productPrice')}>Price </th>
          <th onClick={() => handleSort('productCategory')}>Category </th>
          <th onClick={() => handleSort('productQuantity')}>Status</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            <td>#{row.productID}</td>
            <td>{row.productPrice} DZD</td>
            <td>{row.productCategory}</td>
            <td className={handleClassName(row.productQuantity)}>
                {row.productQuantity === 0 && "out of stock"}
                {row.productQuantity > 0  && "in stock"}
                {row.productQuantity === 0 && <DoDisturbIcon></DoDisturbIcon>}
                {row.productQuantity > 0  &&  <CheckIcon></CheckIcon>}
            </td>
            <td> <NavLink to={`/stock/productdetail/${row.productID}`}><EditIcon></EditIcon></NavLink></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableStock ;
