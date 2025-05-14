import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''  // 确认密码字段
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 简单验证
    const newErrors = {};
    if (!formData.username) newErrors.username = '用户名不能为空';
    if (!formData.email) newErrors.email = '邮箱不能为空';
    if (!formData.password) newErrors.password = '密码不能为空';
    if (formData.password !== formData.password2) newErrors.password2 = '两次密码不一致';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);

      if (response.status === 201) {
        // 注册成功后的处理
        navigate('/login');  // 跳转到登录页面
      }
    } catch (error) {
      if (error.response) {
        // 后端返回的验证错误
        setErrors(error.response.data);
      } else {
        console.error('注册错误:', error);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>用户注册</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>用户名</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label>邮箱</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>密码</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>确认密码</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
          {errors.password2 && <span className="error">{errors.password2}</span>}
        </div>

        <button type="submit">注册</button>
      </form>
    </div>
  );
};

export default Register;