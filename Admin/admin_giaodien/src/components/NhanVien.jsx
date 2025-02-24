// src/components/EmployeeList.jsx
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Nguyễn Văn A', position: 'Quản lý', email: 'a@example.com' },
    { id: 2, name: 'Trần Thị B', position: 'Nhân viên bán hàng', email: 'b@example.com' },
    { id: 3, name: 'Lê Văn C', position: 'Kế toán', email: 'c@example.com' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form] = Form.useForm();

  // Mở modal: Nếu có record thì hiển thị để sửa, nếu không thì reset form để thêm mới
  const showModal = (record = null) => {
    setEditingEmployee(record);
    setIsModalOpen(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  // Xử lý submit form để thêm mới hoặc cập nhật nhân viên
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingEmployee) {
        // Cập nhật nhân viên
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === editingEmployee.id ? { ...emp, ...values } : emp
          )
        );
        message.success('Cập nhật nhân viên thành công!');
      } else {
        // Thêm nhân viên mới
        const newEmployee = { id: Date.now(), ...values };
        setEmployees((prev) => [...prev, newEmployee]);
        message.success('Thêm nhân viên thành công!');
      }
      handleCancel();
    });
  };

  // Xóa nhân viên
  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    message.success('Xóa nhân viên thành công!');
  };

  const columns = [
    { title: 'Mã nhân viên', dataIndex: 'id', key: 'id' },
    { title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
    { title: 'Chức vụ', dataIndex: 'position', key: 'position' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Hành động',
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
            title="Bạn có chắc muốn xóa nhân viên này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản Lý Nhân Viên</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Thêm nhân viên
      </Button>
      <Table dataSource={employees} columns={columns} rowKey="id" />

      <Modal
        title={editingEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên nhân viên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}>
            <Input placeholder="Nhập tên nhân viên" />
          </Form.Item>
          <Form.Item
            label="Chức vụ"
            name="position"
            rules={[{ required: true, message: 'Vui lòng nhập chức vụ!' }]}>
            <Input placeholder="Nhập chức vụ" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}>
            <Input placeholder="Nhập email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeList;
