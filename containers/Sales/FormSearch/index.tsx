"use client"

import React, { useState } from 'react';
import { Input, Select } from 'antd';
import type { GetProps } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

import ListProducts from '../ListProducts';
import { useQueryProduct } from '@/hooks/queries/useQueryProduct';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const FormSearch = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const { products, totalCount, loading } = useQueryProduct(search, limit, offset, `
      totalCount
      products {
        key
        category
        name
        content
        price
        stock
        disabled
      }
    `);
  
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
      <section className='flex gap-4'>
        <ArrowLeftOutlined onClick={handlePrev} className={`border-2 p-2 rounded-lg ${Math.ceil(offset/limit+1) === 1 ? 'opacity-0 !cursor-default' : 'cursor-pointer'}`}/>
        <p className='text-3xl'>
          {
            Math.ceil(offset/limit+1)
          }
          /
          {
            Math.ceil(totalCount/limit)
          }
        </p>
        <ArrowRightOutlined onClick={handleNext} className={`border-2 p-2 rounded-lg ${Math.ceil(offset/limit+1) === Math.ceil(totalCount/limit) ? 'opacity-0 !cursor-default' : 'cursor-pointer'}`}/>
        <Select onChange={e=>setLimit(e)} className='w-20 text-3xl' defaultValue={limit} options={[
          {
            value: 5,
            label: <span>5</span>
          },
          {
            value: 10,
            label: <span>10</span>
          },
          {
            value: 15,
            label: <span>15</span>
          },
          {
            value: 20,
            label: <span>20</span>
          },
        ]}/>
      </section>
    </section>
  </section>;
}

export default FormSearch;