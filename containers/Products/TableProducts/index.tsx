import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';

import { useQueryProduct } from '@/hooks/queries/useQueryProduct';

interface DataType {
  key: string;
  name: string;
  content: number;
  measurement: string;
  category: string;
  price: number;
  stock: number;
  disabled: boolean;
}

type DataIndex = keyof DataType;

export const TableProduct = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const { products, totalCount, loading } = useQueryProduct("", 500, 0, `
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

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  if (loading) return <div>Loading...</div>;

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reiniciar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Contenido',
      dataIndex: 'content',
      key: 'content',
      width: '10%',
      ...getColumnSearchProps('content'),
    },
    {
      title: 'U. de medida',
      dataIndex: 'measurement',
      key: 'measurement',
      width: '10%',
      ...getColumnSearchProps('measurement'),
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
      width: '20%',
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      width: '20%',
      ...getColumnSearchProps('price'),
    },
    {
      title: 'Estado',
      dataIndex: 'disabled',
      key: 'disabled',
      width: '10%',
      render: (_, record) => <span style={{ color: record.disabled ? 'red' : 'green' }}>
        {record.disabled ? 'Inactivo' : 'Activo'}
      </span>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => <span><button>Editar</button><button>Deshabilitar</button></span>
    }
  ];

  return <Table<DataType> columns={columns} dataSource={products} />;
}
