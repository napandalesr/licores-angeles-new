import React, { useState } from 'react';
import { InputNumber, Transfer } from 'antd';
import type { TransferProps } from 'antd';

type ProductsType = {
  key: string;
  category: string;
  content: string;
  price: number;
  name: string;
  disabled: boolean;
}

type props = {
  products: ProductsType[]
}
const ListProducts = ({ products }: props) => {
  
  const [targetKeys, setTargetKeys] = useState<React.Key[]>(['1']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const handleChange: TransferProps['onChange'] = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
/*
    console.log('targetKeys: ', newTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);*/
  };

  const handleSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys,
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);

    //console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    //console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  const handleScroll: TransferProps['onScroll'] = (direction, e) => {
    //console.log('direction:', direction);
    //console.log('target:', e.target);
  };

  return (
    <>
      <Transfer
        className='!w-full'
        dataSource={products}
        titles={['Source', 'Target']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onScroll={handleScroll}
        render={(item) => <section><span className='w-1/2'>{item.name}:{item.content}</span> <InputNumber/></section>}
        oneWay
        style={{ marginBottom: 16 }}
      />
    </>
  );
};

export default React.memo(ListProducts);