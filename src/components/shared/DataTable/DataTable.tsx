import React, { useLayoutEffect, useState } from 'react';
import { SearchBar } from '../SearchBar';
import {
  CsvIcon,
  DeleteIcon,
  ActiveIcon,
  EditIcon,
  EyeIcon,
  FilterIcon,
  PolygonIcon,
  StatusIcon,
  // PolygonIcon,
} from 'assets/images/svg';
import Lottie from 'lottie-react';
import Nodata from 'assets/animations/NoData/nodata-1.json';
import { StatusBar } from '../StatusBar';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paginator } from '../Paginator';
import ProductFilter from './ProductFilter';
import { Archive, ArchiveX } from 'lucide-react';
import CategoryTaxFilter from './CategoryTaxFilter';
import FilterCityForm from '../../../pages/City/Filter';
import CityFilter from '../../../pages/City/Filter';
import FilterStockAdjustmentsForm from 'pages/StockAdjustment/Filter';
import FilterStockTransferForm from 'pages/StockTransfer/Filter';
import TaxFilter from 'pages/Taxs/Filter';
import UnitFilter from 'pages/Units/Filter';
import BrandFilter from 'pages/Brands/Filter';
import WarrantyFilter from 'pages/Warranty/Filter';
import BusinessLocationsFilter from 'pages/BusinessLocations/Filter';
import OrderFilter from 'pages/Sales/Filter';
import CategoryFilter from './CategoryFilter';
import FilterPurchaseForm from 'pages/Purchase/Filter';
import FilterPurchaseReturnForm from 'pages/PurchaseReturn/Filter';
import SuppliersFilter from 'pages/Suppliers/Filter';
import { FaRegClock } from 'react-icons/fa';

interface IDataTableProps {
  columns?: any;
  data?: any;
  loading?: boolean;
  loadData?: any;
  filters?: any;
  actionMenu?: {
    view?: any;
    edit?: any;
    timeUpdate?: any;
    delete?: any;
    statusChange?: any;
  };
  export_pdf?: (event: React.MouseEvent<HTMLDivElement>) => void;
  export_csv?: (event: React.MouseEvent<HTMLDivElement>) => void;
  create_route?: any;
  import_pdf?: () => void;
  import_csv?: () => void;
  createModal?: any;
  editModal?: any;
  edittimeModal?: any;
  edit_route?: any;
  modalData?: any;
  archiveModal?: any;
  rowViewModal?: any;
  statusChangeModel?: any;
  dataItem?: any;
  filterModal?: any;
  toggleFilterModal?: () => void;
  content?: React.ReactNode;
  handleFilter?: (filters: any, pageNumber?: number, pageSize?: number) => void;
  // handleFilter?: (unitId: string, pageNumber: number, pageSize: number) => void;
  handleSearch?: (searchValue: string) => void;
  placeholderhandleSearch?: string;
}

const DataTable = (props: IDataTableProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  let { pathname } = useLocation();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
    props.toggleFilterModal?.();
  };

  const showImportExport =
    pathname === '/categories' ||
    pathname === '/business-locations' ||
    pathname === '/discount' ||
    pathname === '/products';
  const showCreateButton =
    pathname === '/category-tax' ||
    pathname === '/brands' ||
    pathname === '/taxs' ||
    pathname === '/units' ||
    pathname === '/cities' ||
    pathname === '/warranties' ||
    pathname === '/variations' ||
    pathname === '/categories' ||
    pathname === '/contacts' ||
    pathname === '/suppliers' ||
    pathname === '/business-locations' ||
    pathname === '/products' ||
    pathname === '/purchase' ||
    pathname === '/stocktransfers' ||
    pathname === '/stockadjustments' ||
    pathname === '/purchasereturn' ||
    pathname === '/deliverycharges' ||
    pathname === '/discount' ||
    pathname === '/user' ||

    pathname === '/promotion';

  useLayoutEffect(() => {
    if (props?.loadData) {
      props.loadData();
    }
  }, [dispatch]);

  const CreateButton = () => (
    <div
      onClick={() => {
        if (props?.create_route) {
          navigation(props?.create_route);
        }
        if (props?.createModal) {
          props?.createModal(true);
        }
      }}
      className="h-12 w-32 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600 
      flex justify-center items-center gap-2 text-white font-semibold 
      transition-colors duration-300 shadow-md"
    >
      <div className="text-white flex items-center gap-2">
        <div className="text-lg font-semibold">+</div> CREATE {props?.dataItem}
      </div>
    </div>
  );
  const capitalizeFirstLetter = (text: any) => {
    if (typeof text === 'string') {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text;
  };

  const handleRowSelection = (rowIndex: number) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(rowIndex)
        ? prevSelectedRows.filter((index) => index !== rowIndex)
        : [...prevSelectedRows, rowIndex]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === props.data.records.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(props.data.records.map((_: any, index: number) => index));
    }
  };

  const isRowSelected = (rowIndex: number) => selectedRows.includes(rowIndex);

  const tableData = props?.data.records ? props?.data.records : props?.data;

  const handleFilter = (
    filters: any,
    pageNumber: number = 1,
    pageSize: number = 10
  ) => {
    console.log('filtersfilters', filters);
    if (!props.handleFilter) return;

    switch (pathname) {
      case '/products':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/categories':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/category-tax':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/stockadjustments':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/taxs':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/stocktransfers':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/brands':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/units':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/cities':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/sales':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/purchase':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/suppliers':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/purchasereturn':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/business-locations':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/warranties':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      case '/discount':
        props.handleFilter(filters, pageNumber, pageSize);
        break;
      default:
        console.warn('Unhandled route for filter');
    }
  };

  // const renderFilterComponent = () => {
  //   switch (pathname) {
  //     case '/products':
  //       return <ProductFilter filters={props.filters} handleFilter={props.handleFilter} />;
  //     case '/category-tax':
  //       return <CategoryTaxFilter filters={props.filters} handleFilter={props.handleFilter} />;
  //     case '/units':
  //       return <ProductFilter filters={props.filters} handleFilter={props.handleFilter} />;
  //     default:
  //       return null;
  //   }
  // };

  const renderFilterComponent = () => {
    switch (pathname) {
      case '/products':
        return (
          <ProductFilter
            filters={props.filters}
            handleFilter={(unitId) => handleFilter({ unitId })}
          />
        );
      case '/cities':
        return (
          <CityFilter
            handleFilter={(filter) => {
              handleFilter(filter);
            }}
          />
        );
      case '/stocktransfers':
        return (
          <FilterStockTransferForm
            handleFilter={(filter) => {
              console.log('Selected Filtersparthee:', filter);
              handleFilter(filter);
            }}
          />
        );
      case '/stockadjustments':
        return (
          <FilterStockAdjustmentsForm
            handleFilter={(filter) => {
              handleFilter(filter);
            }}
          />
        );
      case '/category-tax':
        return (
          <CategoryTaxFilter
            handleFilter={(filter: { categoryId?: string; taxId?: string }) =>
              handleFilter(filter)
            }
          />
        );
      case '/sales':
        return (
          <OrderFilter
            handleFilter={(filter) => {
              handleFilter(filter);
            }}
          />
        );
      case '/categories':
        return (
          <CategoryFilter
            handleFilter={(filter) => {
              console.log('Selected Filtersparthee:', filter);

              handleFilter(filter);
            }}
          />
        );
      case '/taxs':
        return (
          <TaxFilter
            handleFilter={(filter) => {
              handleFilter(filter);
            }}
          />
        );
      case '/brands':
        return (
          <BrandFilter
            handleFilter={(filter) => {
              console.log('Selected Filtersparthee:', filter);
              handleFilter(filter);
            }}
          />
        );
      case '/business-locations':
        return (
          <BusinessLocationsFilter
            handleFilter={(filter) => {
              console.log('Selected Filtersparthee:', filter);
              handleFilter(filter);
            }}
          />
        );
      case '/units':
        return (
          <UnitFilter
            handleFilter={(filter) => {
              console.log('Selected Filtersparthee....:', filter);
              handleFilter(filter);
            }}
          />
        );

      case '/warranties':
        return (
          <WarrantyFilter
            handleFilter={(filter) => {
              console.log('Selected Filtersparthee....:', filter);
              handleFilter(filter);
            }}
          />
        );

      case '/suppliers':
        return (
          <SuppliersFilter
            handleFilter={(filter) => {
              console.log('Selected Filtersparthee....:', filter);
              handleFilter(filter);
            }}
          />
        );

      case '/purchase':
        return (
          <FilterPurchaseForm
            handleFilter={(filter) => {
              console.log('Selected Filtersparthee....:', filter);
              handleFilter(filter);
            }}
          />
        );
      case '/purchasereturn':
        return (
          <FilterPurchaseReturnForm
            handleFilter={(filter) => {
              console.log('Selected Filtersparthee....:', filter);
              handleFilter(filter);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 font-inter grow">
      {/* Filter and searchbar */}
      <div className=" flex flex-col">
        <div className="w-full flex-col bg-white min-h-16 flex rounded-xl self-center">
          <div className="w-full flex justify-between items-center p-5">
            <div
              className="w-32 h-9 border-[1px] rounded-md cursor-pointer flex items-center justify-center gap-3 self-center"
              onClick={toggleCard}
            >
              <FilterIcon className="h-6 w-6" />
              <div className="font-semibold text-[#8D9FBD]">Filters</div>
            </div>
            <SearchBar
              placeholder={props?.placeholderhandleSearch}
              className="w-96 h-10 border-[1px] rounded-md"
              background="#ffffff"
              onChange={(search: any) => props.handleSearch?.(search)}
            />
          </div>
          {/* <div
            className={`min-w-fit flex flex-col grow duration-1000 ease-in-out transition-max-height ${
              isExpanded ? 'max-h-screen' : 'max-h-0 overflow-hidden'
            }`}
          >
            {props.filters ? (
              <ProductFilter
                filters={props.filters}
                handleFilter={(unitId) => props.handleFilter?.(unitId, 1, 10)}
              />
            ) : null}
          </div> */}
          {/* 
<div
  className={`min-w-fit flex flex-col grow duration-1000 ease-in-out transition-max-height ${
    isExpanded ? 'max-h-screen' : 'max-h-0 overflow-hidden'
  }`}
>
  {props.filters && pathname === '/products' ? (
    <ProductFilter
      filters={props.filters}
      handleFilter={(unitId) => props.handleFilter?.(unitId, 1, 10)}
    />
  ) : pathname === '/category-tax' ? (
    <CategoryTaxFilter
    filters={props.filters}
    handleFilter={(categoryId:any ,taxId :any) => props.handleFilter?.(categoryId,taxId, 1, 10)}
  />
  ) : pathname === '/units' ? (
    <ProductFilter
    filters={props.filters}
    handleFilter={(unitId) => props.handleFilter?.(unitId, 1, 10)}
  />
  ) : null}
</div> */}

          <div
            className={`min-w-fit flex flex-col grow duration-1000 ease-in-out transition-max-height ${
              isExpanded ? 'max-h-screen' : 'max-h-0 overflow-hidden'
            }`}
          >
            {renderFilterComponent()}
          </div>
        </div>

        {/* <div className="bg-white   min-w-fit flex flex-col grow pb-2">
          <div className="flex  mt-auto">
            <div
              // className={`h-auto w-72 transform bg-red-400 flex shadow-lg transition-all duration-500 ease-in-out delay-200 hover:translate-y-4`}
              className={`absolte right-0 top-0 h-full w-72 bg-white  transition-transform duration-300 ease-in-out transform`}
            >
              {props.content}
            </div>
          </div>
        </div> */}
      </div>

      {/* Table Section */}
      <div className="w-full bg-white   min-w-fit flex flex-col grow">
        {/* Conditionally show Import/Export Buttons and Create Button */}
        <div className="w-full h-28 gap-4 min-w-fit flex justify-end items-center">
          {showImportExport && (
            <>
              <div
                className="h-12 w-32 rounded-md cursor-pointer bg-slate-50 hover:bg-slate-300 
                flex justify-center items-center gap-2 text-white font-semibold 
                transition-colors duration-300"
                onClick={props.import_csv}
              >
                <CsvIcon className="w-5 h-5" />
                <div className="text-[#8D9FBD] text-[14px]">Import CSV</div>
              </div>

              <div
                className="h-12 w-32 rounded-md cursor-pointer bg-slate-50 hover:bg-slate-300 
                flex justify-center items-center gap-2 text-white font-semibold 
                transition-colors duration-300"
                onClick={props.export_pdf}
              >
                <CsvIcon className="w-5 h-5" />
                <div className="text-[#8D9FBD] text-[14px]">Export PDF</div>
              </div>

              <div
                className="h-12 w-32 rounded-md cursor-pointer bg-slate-50 hover:bg-slate-300 
                flex justify-center items-center gap-2 text-white font-semibold 
                transition-colors duration-300"
                onClick={props.export_csv}
              >
                <CsvIcon className="w-5 h-5" />
                <div className="text-[#8D9FBD] text-[14px]">Export Excel</div>
              </div>

              <div
                className="h-12 w-32 rounded-md cursor-pointer bg-slate-50 hover:bg-slate-300 
                flex justify-center items-center gap-2 text-white font-semibold 
                transition-colors duration-300"
                onClick={props.import_pdf}
              >
                <CsvIcon className="w-5 h-5" />
                <div className="text-[#8D9FBD] text-[14px]">Import PDF</div>
              </div>
            </>
          )}

          {showCreateButton && <CreateButton />}
        </div>

        {/* Table Content */}
        {tableData?.length ? (
          <div className="w-full">
            <table className="w-full relative min-w-fit table-auto max-h-full">
              {props?.loading && (
                <div className="w-full opacity-25 absolute text-black h-full pb-36 flex justify-center items-center"></div>
              )}
              <colgroup>
                <col style={{ width: '3%' }} />
                {props?.columns?.map((column: any, index: number) => (
                  <col
                    key={index}
                    style={{ width: `${column?.width}%` }}
                    className=" "
                  />
                ))}
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead>
                <tr className="border-t-2 border-b-2 w-full h-fit">
                  <th className="text-left justify-start align-middle text-[#718096] px-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 p-1"
                      onChange={toggleSelectAll}
                      checked={
                        selectedRows.length === tableData.length &&
                        tableData.length > 0
                      }
                    />
                  </th>
                  {props?.columns?.map((column: any, index: number) => (
                    <th key={index} className="text-sm text-left align-middle">
                      <div className="flex gap-2 justify-start items-center pt-3 pb-3  text-sm font-medium text-[#7D7D7D] text-left">
                        {column?.header}
                        <div className="flex flex-col gap-1 cursor-pointer">
                          <PolygonIcon className="w-4 h-4 rotate-180  " />
                          <PolygonIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </th>
                  ))}
                  {props?.actionMenu && (
                    <th className="text-left align-middle justify-start pt-3 pb-3 p-4 text-sm font-medium text-[#718096] ">
                      {' '}
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="max-full overflow-y-auto">
                {tableData?.map((row: any, index: number) => (
                  <tr
                    key={index}
                    className="h-12 text-left text-sm  text-[#484b4f] font-inter  p-3  min-h-12 max-h-fit py-1 border-b-[1px]"
                    // onClick={() => {
                    //   props?.modalData(row);
                    //   if (pathname === "/products" ||pathname === "/purchase" || pathname==="/stocktransfers") {
                    //     props?.rowViewModal(true);
                    //   }
                    // }}
                  >
                    <td className="text-left h-full align-middle justify-start  px-3">
                      {/* <input type="checkbox" className="w-4 h-4 p-1" /> */}
                      <input
                        type="checkbox"
                        className="w-4 h-4 p-1"
                        checked={isRowSelected(index)}
                        onChange={() => handleRowSelection(index)}
                      />
                    </td>
                    {props?.columns?.map((column: any, colIndex: number) => (
                      <td
                        key={colIndex}
                        className="text-left h-full text-sm align-middle "
                      >
                        {column?.field === 'status' ? (
                          <div className="flex justify-center items-start">
                            <StatusBar status={row.inStock} />
                          </div>
                        ) : (
                          <>{capitalizeFirstLetter(column.body(row))}</>
                        )}
                      </td>
                    ))}
                    {props?.actionMenu && (
                      <td className="px-5 h-full align-middle gap-2 ">
                        <div className="flex gap-1 w-full justify-start">
                          {props?.actionMenu?.edit && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                const isStockTransfer =
                                  pathname === '/stocktransfers';
                                const isPurchaseReturn =
                                  pathname === '/purchasereturn';
                                const isPurchase = pathname === '/purchase';
                                const isdelivery =
                                  pathname === '/deliverycharges';

                                const isproductVariable =
                                  pathname === '/discount';

                                const isEditable = isStockTransfer
                                  ? typeof row.stockTransferStatus === 'string'
                                    ? row.stockTransferStatus.toLowerCase() !==
                                        'completed' &&
                                      row.stockTransferStatus.toLowerCase() !==
                                        'cancelled'
                                    : row.stockTransferStatus !== true
                                  : isPurchaseReturn
                                  ? typeof row.purchaseReturnStatus === 'string'
                                    ? row.purchaseReturnStatus.toLowerCase() !==
                                      'completed'
                                    : row.purchaseReturnStatus !== true
                                  : isdelivery
                                  ? row.businessLocationResponse?.active !==
                                    false
                                  : isproductVariable
                                  ? row.productVariableResponse?.active !==
                                    false
                                  : isPurchase
                                  ? row.purchaseStatus === 'PENDING'
                                  : pathname === '/category-tax' ||
                                    pathname === '/brands' ||
                                    pathname === '/taxs' ||
                                    pathname === '/units' ||
                                    pathname === '/cities' ||
                                    pathname === '/warranties' ||
                                    pathname === '/variations' ||
                                    pathname === '/categories' ||
                                    pathname === '/contacts' ||
                                    pathname === '/suppliers' ||
                                    pathname === '/payment' ||
                                    pathname === '/business-locations' ||
                                    pathname === '/products' ||
                                    pathname === '/promotion'
                                  ? row.active
                                  : false;
                                if (!isEditable) return;

                                props?.modalData && props?.modalData(row);
                                props?.editModal && props?.editModal(true);
                                if (props?.edit_route) {
                                  const route = `${props?.edit_route}/${row?.id}`;
                                  navigation(route);
                                }
                              }}
                              className={`w-4 h-4 ${
                                (typeof row.stockTransferStatus === 'string' &&
                                  (row.stockTransferStatus.toLowerCase() ===
                                    'completed' ||
                                    row.stockTransferStatus.toLowerCase() ===
                                      'cancelled')) ||
                                (pathname === '/purchasereturn' &&
                                  typeof row.purchaseReturnStatus ===
                                    'string' &&
                                  row.purchaseReturnStatus.toLowerCase() ===
                                    'completed') ||
                                (pathname === '/deliverycharges' &&
                                  row.businessLocationResponse?.active ===
                                    false) ||
                                (pathname === '/discount' &&
                                  row.productVariableResponse?.active ===
                                    false) ||
                                (pathname === '/purchase' &&
                                  (row.purchaseStatus === 'RECEIVED' ||
                                    row.purchaseStatus === 'ORDERED')) ||
                                row.stockTransferStatus === true ||
                                row.purchaseReturnStatus === true ||
                                (!row.active &&
                                  (pathname === '/category-tax' ||
                                    pathname === '/brands' ||
                                    pathname === '/taxs' ||
                                    pathname === '/units' ||
                                    pathname === '/cities' ||
                                    pathname === '/warranties' ||
                                    pathname === '/variations' ||
                                    pathname === '/categories' ||
                                    pathname === '/contacts' ||
                                    pathname === '/suppliers' ||
                                    pathname === '/payment' ||
                                    pathname === '/stockadjustments' ||
                                    pathname === '/business-locations' ||
                                    pathname === '/products' ||
                                    pathname === '/promotion'))
                                  ? 'cursor-not-allowed opacity-50'
                                  : 'cursor-pointer'
                              }`}
                              title={
                                (typeof row.stockTransferStatus === 'string' &&
                                  (row.stockTransferStatus.toLowerCase() ===
                                    'completed' ||
                                    row.stockTransferStatus.toLowerCase() ===
                                      'cancelled')) ||
                                (pathname === '/purchasereturn' &&
                                  typeof row.purchaseReturnStatus ===
                                    'string' &&
                                  row.purchaseReturnStatus.toLowerCase() ===
                                    'completed') ||
                                (pathname === '/deliverycharges' &&
                                  row.businessLocationResponse?.active ===
                                    false) ||
                                (pathname === '/discount' &&
                                  row.productVariableResponse?.active ===
                                    false) ||
                                (pathname === '/purchase' &&
                                  (row.purchaseStatus === 'RECEIVED' ||
                                    row.purchaseStatus === 'ORDERED')) ||
                                row.stockTransferStatus === true ||
                                row.purchaseReturnStatus === true ||
                                (!row.active &&
                                  (pathname === '/category-tax' ||
                                    pathname === '/brands' ||
                                    pathname === '/taxs' ||
                                    pathname === '/units' ||
                                    pathname === '/cities' ||
                                    pathname === '/warranties' ||
                                    pathname === '/variations' ||
                                    pathname === '/categories' ||
                                    pathname === '/contacts' ||
                                    pathname === '/suppliers' ||
                                    pathname === '/payment' ||
                                    pathname === '/stockadjustments' ||
                                    pathname === '/business-locations' ||
                                    pathname === '/products' ||
                                    pathname === '/promotion'))
                                  ? 'Disabled'
                                  : 'Edit'
                              }
                            >
                              <EditIcon className="w-4 h-4" />
                            </div>
                          )}
                          {props?.actionMenu?.timeUpdate &&
                            pathname === '/business-locations' && (
                              <div
                                onClick={(e) => {
                                  props?.modalData(row);

                                  props?.edittimeModal(true);
                                }}
                                className="w-4 h-5 cursor-pointer"
                                title="Time"
                              >
                                <FaRegClock className="w-4 h-4" />
                              </div>
                            )}

                          {row.active
                            ? props?.actionMenu?.delete &&
                              (pathname === '/category-tax' ||
                                pathname === '/brands' ||
                                pathname === '/taxs' ||
                                pathname === '/units' ||
                                pathname === '/cities' ||
                                pathname === '/warranties' ||
                                pathname === '/variations' ||
                                pathname === '/categories' ||
                                pathname === '/contacts' ||
                                pathname === '/suppliers' ||
                                pathname === '/payment' ||
                                pathname === '/business-locations' ||
                                pathname === '/products' ||
                                pathname === '/purchasereturn' ||
                                pathname === '/promotion') && (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    props?.modalData(row);
                                    props?.archiveModal(true);
                                  }}
                                  className="w-5 h-5 cursor-pointer"
                                  title="Archive"
                                >
                                  <Archive className="w-4 h-4  cursor-pointer" />
                                </div>
                              )
                            : (pathname === '/category-tax' ||
                                pathname === '/brands' ||
                                pathname === '/taxs' ||
                                pathname === '/units' ||
                                pathname === '/cities' ||
                                pathname === '/warranties' ||
                                pathname === '/variations' ||
                                pathname === '/categories' ||
                                pathname === '/contacts' ||
                                pathname === '/suppliers' ||
                                pathname === '/payment' ||
                                pathname === '/business-locations' ||
                                pathname === '/products' ||
                                pathname === '/purchasereturn' ||
                                pathname === '/promotion') && (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    props?.modalData(row);
                                    props?.archiveModal(true);
                                  }}
                                  className="w-5 h-5 cursor-pointer"
                                  title="Active"
                                >
                                  <ArchiveX className="w-4 h-4 cursor-pointer font-bold" />
                                </div>
                              )}
                          {props?.actionMenu?.view &&
                            (pathname === '/products' ||
                              pathname === '/purchase' ||
                              pathname === '/stockadjustments' ||
                              pathname === '/payment' ||
                              pathname === '/promotion' ||
                              pathname === '/purchasereturn' ||
                              pathname === '/sales' ||
                              pathname === '/stocktransfers') && (
                              <div
                                onClick={(e) => {
                                  props?.modalData(row);
                                  if (
                                    pathname === '/products' ||
                                    pathname === '/purchase' ||
                                    pathname === '/promotion' ||
                                    pathname === '/stockadjustments' ||
                                    pathname === '/stocktransfers' ||
                                    pathname === '/purchasereturn' ||
                                    pathname === '/sales' ||
                                    pathname === '/payment'
                                  ) {
                                    props?.rowViewModal(true);
                                  }
                                }}
                                className="w-4 h-5 cursor-pointer"
                                title="View"
                              >
                                <EyeIcon className="w-5 h-5 cursor-pointer" />
                              </div>
                            )}
                          {/* {props?.actionMenu?.statusChange &&
                            pathname === '/stocktransfers' && (
                              <div
                                className="w-5 h-5 cursor-pointer"
                                onClick={(e) => {
                                  props?.modalData(row);
                                  if (
                                    pathname === '/stocktransfers' ||
                                    pathname === '/stockadjustments'
                                  ) {
                                    props?.statusChangeModel(true);
                                  }
                                }}
                                title="Status"
                              >
                                <StatusIcon className="w-5 h-5 cursor-pointer fill-[#718096] stroke-[#718096] font-bold" />
                              </div>
                            )} */}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {props?.data?.records &&
              (pathname === '/products' ||
                pathname === '/categories' ||
                pathname === '/cities' ||
                pathname === '/taxs' ||
                pathname === '/brands' ||
                pathname === '/sales' ||
                pathname === '/suppliers' ||
                pathname === '/warranties' ||
                pathname === '/variations' ||
                pathname === '/promotion' ||
                pathname === '/socialmedia' ||
                pathname === '/purchase' ||
                pathname === '/business-locations' ||
                pathname === '/purchasereturn' ||
                pathname === '/sales' ||
                pathname === '/stockadjustments' ||
                pathname === '/stocktransfers' ||
                pathname === '/discount' ||
                pathname === '/user' ||
                pathname === '/deliverycharges' ||
                pathname === '/category-tax' ||
                pathname === '/units') && (
                <Paginator
                  totalPages={props.data?.totalPages}
                  totalRecords={props.data?.totalRecords}
                  pageNumber={props.data?.pageNumber}
                  pageSize={props.data?.pageSize}
                  changePage={(pageNumber, pageSize) =>
                    props.handleFilter?.('', pageNumber, pageSize)
                  }
                />
              )}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center h-[80%] gap-5">
            <Lottie animationData={Nodata} loop={true} className="w-60 h-60" />
            <div className="text-2xl font-semibold">No Data Found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
