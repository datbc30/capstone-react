import { Table } from "antd";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantityCart,
  removeFromCart,
} from "../../redux/reducer/productReducer";

const TableCart = () => {
  const { arrCart } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Img",
      dataIndex: "img",
      render: (imgSrc) => {
        return <img src={imgSrc} width={85} height={85} alt="..." />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => {
        const { quantity, id } = text;
        return (
          <div>
            <button
              className="btn quantity-plus"
              style={{marginRight:10, backgroundColor:'rgb(99 132 240)'}}
              onClick={() => {
                dispatch(changeQuantityCart({ type: true, id: id }));
              }}
            >
              +
            </button>
            <span className="span quantity-span">{quantity}</span>
            <button
              className="btn quantity-minus"
              style={{marginLeft:10, backgroundColor:'rgb(99 132 240)'}}
              onClick={() => {
                dispatch(changeQuantityCart({ type: false, id: id }));
              }}
            >
              -
            </button>
          </div>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (id) => {
        return (
          <div>
            <button className="btn action-edit" style={{backgroundColor: 'rgb(224 176 109)', marginRight:10}}>Edit</button>
            <button
              className="btn action-delete"
              style={{backgroundColor: 'rgb(204 204 204)'}}
              onClick={() => {
                dispatch(removeFromCart(id));
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  const dataArr = [];
  for (let i = 0; i < arrCart.length; i++) {
    dataArr.push({
      key: i,
      id: arrCart[i].id,
      img: arrCart[i].image,
      name: arrCart[i].name,
      price: `${arrCart[i].price}$`,
      total: `${(arrCart[i].price * arrCart[i].quantityBuy).toLocaleString()}$`,
      quantity: { quantity: arrCart[i].quantityBuy, id: arrCart[i].id },
      action: arrCart[i].id,
    });
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true); 

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;


  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataArr}
      />
    </div>
  );
};

export default TableCart;
