import React from 'react';
import { Tabs, TabsProps } from 'antd';

import NavBar from '@/components/Header';
import { FormProducts, TableProduct } from '@/containers';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Lista de productos',
    children: <TableProduct/>
  },
  {
    key: '2',
    label: 'Registrar producto',
    children: <FormProducts/>
  }
]

const Products = () => {
  return <>
    <NavBar location="/productos"/>
    <Tabs className='mt-24 px-10' defaultActiveKey='1' items={items}/>
  </>;
}

export default Products;