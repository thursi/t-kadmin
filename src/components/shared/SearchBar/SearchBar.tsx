// import { SearchIcon } from "assets/images/svg";

// interface ISearchBarProps {
//   onChange?: (searchTerm: string) => void;
//   background?: string;
//   className?: string;
// }

// const SearchBar = (props: ISearchBarProps) => {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     props.onChange?.(event.target.value);
//   };

//   return (
//     <div
//       className={`flex gap-2 bg-[${
//         props?.background ?? "#ffffff"
//       }] overflow-hidden items-center pl-2 ${props?.className}`}
//     >
//       <SearchIcon className="w-6 h-6" />
//       <input
//         className={`w-full rounded-md h-full bg-[${
//           props?.background ?? "#ffffff"
//         }] focus:outline-none`}

//         // "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-0 focus:border-input",

//         type="text"
//         placeholder="Search..."
//         name="search"
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default SearchBar;


import { SearchIcon } from "assets/images/svg";

interface ISearchBarProps {
  onChange?: (searchTerm: string) => void;
  background?: string;
  className?: string;
  placeholder?: string;
}

const SearchBar = (props: ISearchBarProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(event.target.value);
  };

  return (
    <div
      className={`flex gap-1 bg-[${
        props?.background ?? "#ffffff"
      }] overflow-hidden items-center pl-2 ${props?.className}`}
    >
      <SearchIcon className="w-6 h-6" />
      <input
        className={`w-full rounded-md h-full bg-[${
          props?.background ?? "#ffffff"
        }] focus:outline-none border-none focus:ring-0`} 
        type="text"
        placeholder={props?.placeholder? props?.placeholder :"Search..."}
        name="search"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
