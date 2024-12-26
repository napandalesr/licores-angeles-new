"use client"

import React, { useState } from 'react';

import { Input, Select } from 'antd';
import type { GetProps } from 'antd';
import ListProducts from '../ListProducts';
import { useQueryProduct } from '@/hooks/queries/useQueryProduct';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;


const productsInit = [
  {
    key: "1",
    category: 'Cervezas',
    name: 'Águila Light',
    content: '330',
    price: 4000,
    disabled: false
  },
  {
    key: "2",
    category: 'Cervezas',
    name: 'Águila Original',
    content: '330',
    price: 4000,
    disabled: false
  },
  {
    key: "3",
    category: 'Cervezas',
    name: 'Club',
    content: '330',
    price: 4000,
    disabled: false
  },
  {
    key: "4",
    category: 'Cervezas',
    name: 'Costeña bacana',
    content: '330',
    price: 4000,
    disabled: false
  },
  {
    key: "5",
    category: 'Cervezas',
    name: 'Corona',
    content: '330',
    price: 8000,
    disabled: false
  },
  {
    key: "6",
    category: 'Cervezas',
    name: 'Águila Light lata',
    content: '330',
    price: 4000,
    disabled: false
  },
  {
    key: "7",
    category: 'Cervezas',
    name: 'Águila Original lata',
    content: '330',
    price: 4000,
    disabled: false
  },
]

const FormSearch = () => {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const { products, totalCount, loading } = useQueryProduct(search, limit, offset);
  
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    setSearch(value);
  };

  const handleNext = () => {
    if (offset + limit < totalCount) {
      setOffset(offset + limit);
    }
  };

  const handlePrev = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  if (loading && search == "") return <div>Loading...</div>;

  return <section className='w-full'>
    <section className='w-full flex justify-between mb-8'>
      <Search className='w-[40%]' placeholder="Buscar producto" onSearch={onSearch} onChange={e => onSearch(e.target.value)}  />
      <Select className='w-[40%]' defaultValue={1} options={[{ value: 1, label: <span>Mesa 1</span> }, { value: 2, label: <span>Mesa 2</span> }]}/>
    </section>
    <section className='p-6 w-full border-2'>
      <ListProducts products={products}/>
    </section>
  </section>;
}

export default FormSearch;