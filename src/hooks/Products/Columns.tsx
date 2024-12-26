import defacltImage from '../../assets/images/png/defaultImage.png';

import ConfirmationModal from './StatusBadge ';
import StatusBadge from './StatusBadge ';

const Columns = [
  {
    field: 'image',
    header: 'Image',
    body: (row: any) => {
      const imageSrc =
        row?.images && row?.images.length > 0 ? row?.images[0] : defacltImage;

      return (
        <div>
          <img
            src={imageSrc}
            className="w-15 h-12 object-cover p-1 rounded-md items-center justify-center content-center"
            style={{ borderRadius: '20px' }}
            alt="Product"
          />
        </div>
      );
    },
    width: 13,
  },
  {
    field: 'name',
    header: 'Name',
    body: (row: any) => {
      return (
        <div className="text-[#111827] text-base  font-semibold">
          {row.name}
        </div>
      );
    },
    width: 11,
  },
  {
    field: 'sku',
    header: 'SKU',
    body: (row: any) => {
      return <div>{row.sku}</div>;
    },
    width: 13,
  },
  {
    field: 'productType',
    header: 'Product Type',
    body: (row: any) => {
      return <div>{row.productType ? row.productType : 'N/A'}</div>;
    },
    width: 14,
  },

  {
    field: 'category',
    header: 'Category',
    body: (row: any) => {
      return (
        <div>
          {row.categoryResponse?.name ? row.categoryResponse.name : 'N/A'}
        </div>
      );
    },
    width: 12,
  },

  {
    field: 'unit_price',
    header: 'Purchase Price',
    body: (row: any) => {
      return (
        <div className="">{row.purchasePrice ? row.purchasePrice : 'N/A'}</div>
      );
    },
    width: 8,
  },
  {
    field: 'currentStock',
    header: 'Current Stock',
    body: (row: any) => {
      return <div>{row.currentStock ? row.currentStock : 'N/A'}</div>;
    },
    width: 8,
  },

  {
    field: 'Status',
    header: 'Stock level',
    body: (row: any) => {
      return (
        <div className="flex justify-start items-start">
          <ConfirmationModal
            onStatusChange={(newStatus) => {
              console.log(`Status for ID ${row.id} changed to ${row.inStock}`);
            }}
            item={{ id: row.id, inStock: row.inStock }}
          />
        </div>
      );
    },
    width: 10,
  },
  {
    field: "active",
    header: "Status",
    body: (row: any) => {
      return (
        <div className="flex">
          {row.active ? (
                <div className="text-[#0CAF60] bg-[#E7F7EF] px-3 py-1 rounded-lg text-sm font-thin">
              Active
            </div>
          ) : (
            <div className="text-[#FD6A6A] bg-[#FFF0F0] px-3 py-1 rounded-lg text-sm font-thin">
              In Active
            </div>
          )}
        </div>
      );
    },
    width: 11,
  },
];

export default Columns;
