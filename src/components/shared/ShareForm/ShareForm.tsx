import React, { useEffect, useRef } from 'react';
const ShareForm = (props: any) => {
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="w-full pb-5">
        {props?.isOpen && (
          <div>
            <div className="font-bold text-xl">

            {/* <div className="w-full font-semibold text-primary text-lg mb-4"> */}
              {props.title}
            </div>
            <div>{props.content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareForm;
