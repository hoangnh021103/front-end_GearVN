import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const ProductList = () => {
  // State cho sản phẩm chính
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm A', price: 150000 },
    { id: 2, name: 'Sản phẩm B', price: 250000 },
    { id: 3, name: 'Sản phẩm C', price: 350000 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  // State cho sản phẩm chi tiết
  const [productDetails, setProductDetails] = useState([
    { id: 1, productName: 'Phiên bản X1', quantity: 10, price: 50000 },
    { id: 2, productName: 'Phiên bản Y1', quantity: 5, price: 30000 },
  ]);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);
  const [detailForm] = Form.useForm();

  // Xử lý sản phẩm chính
  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    message.success('Xóa sản phẩm thành công!');
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const newProduct = {
        id: editingProduct ? editingProduct.id : Date.now(),
        name: values.name,
        price: values.price,
      };

      if (editingProduct) {
        setProducts(products.map((product) => (product.id === editingProduct.id ? newProduct : product)));
        message.success('Cập nhật sản phẩm thành công!');
      } else {
        setProducts([...products, newProduct]);
        message.success('Thêm sản phẩm thành công!');
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      form.resetFields();
    });
  };

  // Xử lý sản phẩm chi tiết
  const showDetailModal = (record = null) => {
    setEditingDetail(record);
    detailForm.setFieldsValue(record || { productName: '', quantity: 0, price: 0 });
    setIsDetailModalOpen(true);
  };

  const handleDetailCancel = () => {
    setIsDetailModalOpen(false);
    setEditingDetail(null);
    detailForm.resetFields();
  };

  const handleDetailSubmit = () => {
    detailForm.validateFields().then((values) => {
      const newDetail = {
        id: editingDetail ? editingDetail.id : Date.now(),
        productName: values.productName,
        quantity: values.quantity,
        price: values.price,
      };

      if (editingDetail) {
        setProductDetails(productDetails.map((detail) => (detail.id === editingDetail.id ? newDetail : detail)));
        message.success('Cập nhật sản phẩm chi tiết thành công!');
      } else {
        setProductDetails([...productDetails, newDetail]);
        message.success('Thêm sản phẩm chi tiết thành công!');
      }
      handleDetailCancel();
    });
  };

  const handleDetailDelete = (id) => {
    setProductDetails(productDetails.filter((detail) => detail.id !== id));
    message.success('Xóa sản phẩm chi tiết thành công!');
  };

  // Cột cho bảng sản phẩm chính
  const columns = [
    { title: 'Mã sản phẩm', dataIndex: 'id', key: 'id' },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  // Cột cho bảng sản phẩm chi tiết
  const detailColumns = [
    { title: 'Mã chi tiết', dataIndex: 'id', key: 'id' },
    { title: 'Tên sản phẩm chi tiết', dataIndex: 'productName', key: 'productName' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showDetailModal(record)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDetailDelete(record.id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      {/* Quản lý sản phẩm chính */}
      <h2>Quản Lý Sản Phẩm</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Thêm sản phẩm
      </Button>
      <Table dataSource={products} columns={columns} rowKey="id" />

      <Modal
        title={editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập giá" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Quản lý sản phẩm chi tiết */}
      <h2>Quản Lý Sản Phẩm Chi Tiết</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showDetailModal()}
        style={{ marginBottom: 16 }}
      >
        Thêm sản phẩm chi tiết
      </Button>
      <Table dataSource={productDetails} columns={detailColumns} rowKey="id" />

      <Modal
        title={editingDetail ? 'Sửa sản phẩm chi tiết' : 'Thêm sản phẩm chi tiết'}
        open={isDetailModalOpen}
        onCancel={handleDetailCancel}
        onOk={() => detailForm.submit()}
      >
        <Form form={detailForm} layout="vertical" onFinish={handleDetailSubmit}>
          <Form.Item
            label="Tên sản phẩm chi tiết"
            name="productName"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm chi tiết!' }]}
          >
            <Input placeholder="Nhập tên sản phẩm chi tiết" />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập số lượng" />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập giá" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;