import React, { useEffect, useRef } from "react";

interface IModalProps {
  isOpen: boolean;
  setISOpen: (isOpen: boolean) => void;
  title?: string;
  content: React.ReactNode;
}

const Modal = (props: IModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (props.isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [props.isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={`modal bg-white relative rounded-lg min-w-96 h-min text-left shadow-lg
        ${props.isOpen ? "animate-fadeIn" : "animate-fadeOut"}
      `}
    >
      <div className="w-full font-semibold text-primary text-lg p-4">
        {props.title}
      </div>
      <div className="p-1">{props.content}</div>
      <button
        onClick={(event) => {
          event.preventDefault();
          props.setISOpen(false);
        }}
        className="absolute top-0 text-4xl right-4 text-gray-400 hover:text-gray-600"
      >
        &times;
      </button>
    </dialog>
  );
};

export default Modal;
