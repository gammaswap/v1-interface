import { ReactNode } from "react";
export const Tooltip = ({
  message, children
}: {
  message: string, children: ReactNode
}) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
        <span className="relative z-10 p-2 text-[10px] leading-none text-white whitespace-no-wrap bg-textV1-5 shadow-lg rounded-md">{message}</span>
      </div>
    </div>
  );
};