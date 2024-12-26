import { AiOutlineDashboard } from 'react-icons/ai';
import { RiHomeGearLine, RiMoneyDollarCircleLine, RiShieldUserLine, RiUserLine } from 'react-icons/ri';
import { MdStorefront, MdSwapHoriz } from 'react-icons/md';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { TbReport } from "react-icons/tb";
import { BiPurchaseTag } from "react-icons/bi";

import {
  FaBoxOpen,
  FaPercentage,
  FaRegEye,
  FaRegListAlt,
  FaStore,
  FaClipboardList,
  FaWarehouse,
  FaRegFileAlt
} from 'react-icons/fa';
import { MdCategory, MdLocationOn } from 'react-icons/md';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { BiBuilding, BiTransfer } from 'react-icons/bi';
import { TbTruckReturn } from "react-icons/tb";
import { BsCashCoin } from "react-icons/bs";
import {
  BRANDS,
  BUSINESS_LOCATIONS,
  CATEGORIES,
  TAXS,
  CATEGORYTAX,
  CITIES,
  CONTACTS,
  MENU,
  PRODUCTS,
  SUPPLIERS,
  UNITS,
  VARIATIONS,
  WARRANTIES,
  PRODUCT_CREATE,
  SHOPS,
  PURCHASE,
  STOCKADJUSTMENTS,
  SALES,
  PAYMENT,
  PURCHASE_RETURN,
  PURCHASE_SELL_REPORT,
  REPORTS,
  STOCKTRANSFER,
  SOCIAL_MEDIA,
  PROMOTION,
  DISCOUNT,
  DELIVERYCHARGES,
  ROLE,
  USER,
} from 'constants/routes';
import { IoMdContact } from 'react-icons/io';
import { FiPackage,FiPercent,FiTool, FiTruck } from 'react-icons/fi';
import { BiWorld } from "react-icons/bi";
import { name } from 'config';
import { icons } from 'lucide-react';
import { MdOutlineLocalOffer } from "react-icons/md";

const Columns = [
  {
    name: "Dashboard",
    icon: AiOutlineDashboard,
    to: "/",
  },
  {
    name: "Products",
    icon: RiHomeGearLine,
    to: MENU,
    subMenu: [
      {
        name: "Products",
        icon: FaClipboardList,
        to: PRODUCTS,
      },

      {
        name: "Categories",
        icon: MdCategory,
        to: CATEGORIES,
      },
      {
        name: "Taxs",
        icon: FaPercentage,
        to: TAXS,
      },
      {
        name: "Categories Tax",
        icon: FaRegListAlt,
        to: CATEGORYTAX,
      },
      {
        name: "Units",
        icon: FaBoxOpen,
        to: UNITS,
      },
      {
        name: "Brands",
        icon: FaStore,
        to: BRANDS,
      },

      {
        name: "Warranties",
        icon: BsFillFileEarmarkTextFill,
        to: WARRANTIES,
      },
      {
        name: "Variations",
        icon: FaRegEye,
        to: VARIATIONS,
      },
      // {
      //   name: 'Categories Tax',
      //   icon: FaRegListAlt,
      //   to: CATEGORIESTAX,
      // },
    ],
  },

  // {
  //   name: "Purchase",
  //   icon: BiTransfer,
  //   to: PURCHASE,
  //   subMenu: [
  //     {
  //       name:'Purchase',
  //       icon:BiTransfer,
  //       to: PURCHASE,
  //     },
  //     {
  //       name: 'Purchase Return',
  //       icon:TbTruckReturn ,
  //       to: PURCHASE_RETURN,
  //     },
      
  //   ]
  // },

  // {
  //   name: 'Stock Transfers',
  //   icon: FiPackage, 
  //   to: STOCKTRANSFER,
  // },
 
  {
    name: "Branch Product",
    icon: FiTool,
    to: STOCKADJUSTMENTS,
  },
  {
    name: "Discount",
    icon: FiPercent, 
    to: DISCOUNT,
  },

  // {
  
  //   name: 'Promotion',
  //   icon: MdOutlineLocalOffer   , 
  //   to: PROMOTION,
  // },

  {
    name: "Branches",
    icon: MdStorefront,
    to: SHOPS,

    subMenu: [
      {
        name: 'Branches',
        icon: BiBuilding,
        to: BUSINESS_LOCATIONS,
      },
      {
        name: "Cities",
        icon: MdLocationOn,
        to: CITIES,
      },
      {
        name: "Delivery Charge",
        icon: FiTruck,
        to: DELIVERYCHARGES,
      },
      {
        name: 'Social Media',
        icon: BiWorld  , 
        to: SOCIAL_MEDIA,
      },
    ],
  },

  // {
  //   name: "Contacts",
  //   icon: IoMdContact,
  //   to: CONTACTS,

  //   subMenu: [
  //     {
  //       name: "Suppliers",
  //       icon: RiHomeGearLine,
  //       to: SUPPLIERS,
  //     },
  //   ],
  // },

  {
    name: "Sales",
    icon: BsCashCoin,
    to: SALES,
  },
  {
    name: 'Payment',
    icon: RiMoneyDollarCircleLine   , 
    to: PAYMENT,
  },
 
  {
    name: 'Reports',
    icon: TbReport,
    to: REPORTS,
    subMenu: [
      {
        name: 'Purchase & sale',
        icon: BiPurchaseTag,
        to: PURCHASE_SELL_REPORT,
      }
    ],
  },
  {
    name: 'Role',
    icon: RiShieldUserLine,
    to: ROLE,
  },
  
  {
    name: 'User',
    icon: RiUserLine,
    to: USER,
  },
];

export default Columns;
