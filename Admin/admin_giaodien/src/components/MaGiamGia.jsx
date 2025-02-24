import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const MaGiamGia = () => {
  const [data, setData] = useState([
    {
      id: 1,
      code: 'SALE50',
      discount: 50,
      description: 'Giảm 50% cho đơn hàng đầu tiên',
    },
    {
      id: 2,
      code: 'NEWYEAR20',
      discount: 20,
      description: 'Giảm 20% nhân dịp năm mới',
    },
    {
      id: 3,
      code: 'SUMMER30',
      discount: 30,
      description: 'Giảm 30% cho các sản phẩm mùa hè',
    },
    {
      id: 4,
      code: 'FREESHIP',
      discount: 100,
      description: 'Miễn phí vận chuyển cho đơn hàng trên 500k',
    },
    {
      id: 5,
      code: 'BLACKFRIDAY',
      discount: 70,
      description: 'Giảm 70% cho các mặt hàng điện tử',
    },
    {
      id: 6,
      code: 'WELCOME10',
      discount: 10,
      description: 'Giảm 10% cho khách hàng mới',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [form] = Form.useForm();

  // Mở Modal và đặt giá trị form
  const showModal = (record = null) => {
    setEditingCoupon(record);
    setIsModalOpen(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  // Đóng Modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  // Lưu hoặc cập nhật mã giảm giá
  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingCoupon) {
        setData((prevData) =>
          prevData.map((item) => (item.id === editingCoupon.id ? { ...item, ...values } : item))
        );
        message.success('Cập nhật mã giảm giá thành công!');
      } else {
        const newCoupon = { id: Date.now(), ...values };
        setData((prevData) => [...prevData, newCoupon]);
        message.success('Thêm mã giảm giá thành công!');
      }
      handleCancel();
    });
  };

  // Xóa mã giảm giá
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
    message.success('Xóa mã giảm giá thành công!');
  };

  const columns = [
    {
      title: 'Mã Giảm Giá',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Phần Trăm Giảm',
      dataIndex: 'discount',
      key: 'discount',
      render: (text) => `${text}%`,
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa mã giảm giá này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản Lý Mã Giảm Giá</h2>
      <Button type="primary" onClick={() => showModal()}>
        Thêm Mã Giảm Giá
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" style={{ marginTop: 20 }} />

      <Modal
        title={editingCoupon ? 'Chỉnh Sửa Mã Giảm Giá' : 'Thêm Mã Giảm Giá'}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mã Giảm Giá"
            name="code"
            rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá!' }]}
          >
            <Input placeholder="Nhập mã giảm giá" />
          </Form.Item>
          <Form.Item
            label="Phần Trăm Giảm"
            name="discount"
            rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm!' }]}
          >
            <InputNumber min={1} max={100} style={{ width: '100%' }} placeholder="Nhập phần trăm giảm" />
          </Form.Item>
          <Form.Item label="Mô Tả" name="description">
            <Input.TextArea rows={3} placeholder="Nhập mô tả cho mã giảm giá" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MaGiamGia;
