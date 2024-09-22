import React from "react";
import { CiHeart } from "react-icons/ci";
import { dateFormatter } from "../../utilities/dateFormtter";

type IProps = {
  content: string;
  author: string;
  className?: string;
  date: string;
};

export const Reply = ({ content, author, date, className }: IProps) => {
  const dateOfPublish = dateFormatter(date);
  return (
    <div className={className}>
      <p className="text-xl text-sharpPink">{author}</p>
      <p className="text-sm text-sharpPink">{dateOfPublish}</p>
      <p className="text-[17px]">{content}</p>
      <div className="flex align-center items-centers gap-2">
        <button className="align-center items-center flex">
          <CiHeart />
          <span>like</span>
        </button>
        <button className="align-center items-center flex">reply</button>
      </div>
    </div>
  );
};
