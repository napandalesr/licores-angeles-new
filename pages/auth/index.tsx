"use client"

import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Auth: React.FC = () => {
  const router = useRouter();
  const { session, login } = useAuth();


  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if(values.username && values.password) {
      await login(values.username, values.password);
    }
  };

  useEffect(() => {
    if (router.query.error) {
      message.error({
        content: "Credenciales incorrectas"
    });
    }
  }, [router.query.error]);

  if(session) {
    router.push("/");
  }

  return (
    <main className='flex items-center justify-center w-screen h-screen'>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Usuario"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item<FieldType>
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
  
      <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
        <Checkbox>Recordarme</Checkbox>
      </Form.Item>
  
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
    </main>
  );
}

export default Auth;