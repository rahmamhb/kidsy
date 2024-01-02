import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import DoDisturbIcon from '@mui/icons-material/DoDisturbAltRounded';
import CheckIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import "../../styles/Dashboard/tableorder.css"

const TableStock = ({ data , OnDeleteProduct}) => {
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
          <th onClick={() => handleSort('categoryName')}>Category </th>
          <th onClick={() => handleSort('productQuantity')}>Status</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            <td>#{row.productID}</td>
            <td>{row.productPrice} DZD</td>
            <td>{row.categoryName}</td>
            <td className={handleClassName(row.productQuantity)}>
                {row.productQuantity === 0 && "out of stock"}
                {row.productQuantity > 0  && "in stock"}
                {row.productQuantity === 0 && <DoDisturbIcon></DoDisturbIcon>}
                {row.productQuantity > 0  &&  <CheckIcon></CheckIcon>}
            </td>
            <td className='cursor-pointer' onClick={()=>{OnDeleteProduct(row.productID)}}><DeleteIcon></DeleteIcon></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableStock ;
