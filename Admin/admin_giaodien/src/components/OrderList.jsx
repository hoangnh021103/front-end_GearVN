import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';

const OrderList = () => {
  // State cho đơn hàng chính
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'Nguyễn Văn A', total: 150000 },
    { id: 2, customerName: 'Trần Thị B', total: 250000 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form] = Form.useForm();

  // State cho đơn hàng chi tiết
  const [orderDetails, setOrderDetails] = useState([
    { id: 1, productName: 'Sản phẩm X', quantity: 2, total: 50000 },
    { id: 2, productName: 'Sản phẩm Y', quantity: 1, total: 30000 },
  ]);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);
  const [detailForm] = Form.useForm();

  // Xử lý đơn hàng chính
  const showModal = (record = null) => {
    setEditingOrder(record);
    form.setFieldsValue(record || { customerName: '', total: 0 });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const newOrder = {
        id: editingOrder ? editingOrder.id : Date.now(),
        customerName: values.customerName,
        total: values.total,
      };

      if (editingOrder) {
        setOrders(orders.map((order) => (order.id === editingOrder.id ? newOrder : order)));
        message.success('Cập nhật đơn hàng thành công');
      } else {
        setOrders([...orders, newOrder]);
        message.success('Thêm đơn hàng thành công');
      }
      handleCancel();
    });
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    message.success('Xóa đơn hàng thành công');
  };

  // Xử lý đơn hàng chi tiết
  const showDetailModal = (record = null) => {
    setEditingDetail(record);
    detailForm.setFieldsValue(record || { productName: '', quantity: 0, total: 0 });
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
        total: values.total,
      };

      if (editingDetail) {
        setOrderDetails(orderDetails.map((detail) => (detail.id === editingDetail.id ? newDetail : detail)));
        message.success('Cập nhật đơn hàng chi tiết thành công');
      } else {
        setOrderDetails([...orderDetails, newDetail]);
        message.success('Thêm đơn hàng chi tiết thành công');
      }
      handleDetailCancel();
    });
  };

  const handleDetailDelete = (id) => {
    setOrderDetails(orderDetails.filter((detail) => detail.id !== id));
    message.success('Xóa đơn hàng chi tiết thành công');
  };

  // Cột cho bảng đơn hàng chính
  const columns = [
    { title: 'Mã đơn hàng', dataIndex: 'id', key: 'id' },
    { title: 'Tên khách hàng', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Tổng tiền', dataIndex: 'total', key: 'total' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  // Cột cho bảng đơn hàng chi tiết
  const detailColumns = [
    { title: 'Mã chi tiết', dataIndex: 'id', key: 'id' },
    { title: 'Tên sản phẩm', dataIndex: 'productName', key: 'productName' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Thành tiền', dataIndex: 'total', key: 'total' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showDetailModal(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDetailDelete(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      {/* Quản lý đơn hàng chính */}
      <h2>Quản lý đơn hàng</h2>
      <Button
        type="primary"
       
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Thêm đơn hàng
      </Button>
      <Table columns={columns} dataSource={orders} rowKey="id" />

      <Modal
        title={editingOrder ? 'Sửa đơn hàng' : 'Thêm đơn hàng'}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên khách hàng"
            name="customerName"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tổng tiền"
            name="total"
            rules={[{ required: true, message: 'Vui lòng nhập tổng tiền!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Quản lý đơn hàng chi tiết */}
      <h2>Quản lý đơn hàng chi tiết</h2>
      <Button
        type="primary"
       
        onClick={() => showDetailModal()}
        style={{ marginBottom: 16 }}
      >
        Thêm đơn hàng chi tiết
      </Button>
      <Table columns={detailColumns} dataSource={orderDetails} rowKey="id" />

      <Modal
        title={editingDetail ? 'Sửa đơn hàng chi tiết' : 'Thêm đơn hàng chi tiết'}
        open={isDetailModalOpen}
        onCancel={handleDetailCancel}
        onOk={handleDetailSubmit}
      >
        <Form form={detailForm} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="productName"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
          <Form.Item
            label="Thành tiền"
            name="total"
            rules={[{ required: true, message: 'Vui lòng nhập thành tiền!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderList;