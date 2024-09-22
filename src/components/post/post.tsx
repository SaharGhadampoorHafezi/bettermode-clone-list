import React, { useState } from "react";
import { dateFormatter } from "../../utilities/dateFormtter";
import { HiBellAlert } from "react-icons/hi2";
import { FaShare } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_REACTION, REMOVE_REACTION } from "../../graphql/mutations";

type IProps = {
  ownerName: string;
  content: string;
  title: string;
  date: string;
  className?: string;
  like: number;
  id: string;
};

const Post = ({
  ownerName,
  date,
  title,
  content,
  className,
  like,
  id,
}: IProps) => {
  const [reaction, setReaction] = useState(false);
  const [updateReaction] = useMutation(
    reaction ? REMOVE_REACTION : ADD_REACTION,
    {
      variables: reaction
        ? {
            postId: id,
            reaction: "upvote",
          }
        : {
            postId: id,
            input: {
              reaction: "upvote",
              overrideSingleChoiceReactions: true,
            },
          },
      onCompleted: (data, options) => {
        console.log(data, options);
      },
    }
  );
  const onLikButtonHanldler = () => {
    setReaction(!reaction);
    updateReaction();
  };
  const dateOfPublish = dateFormatter(date);
  return (
    <div
      className={`border border-sharpPink border-2 w-[50%] rounded-2xl ${className}`}
    >
      <div className="pl-[20%]">
        <p className="font-medium text-xl text-sharpPink py-2">{ownerName}</p>
        <p className="font-sm text-sm text-sharpPink pb-2">{dateOfPublish}</p>

        <p className="font-medium text-xl pb-2">{title}</p>

        <p className="font-sm text-sm">{content}</p>
        <p className="font-sm text-sm">{like}</p>

        <div className="flex gap-6 py-4">
          <div>
            <button
              onClick={onLikButtonHanldler}
              className="border border-sharpPink py-2 px-8 rounded-3xl flex align-center items-center gap-1"
            >
              <FaThumbsUp color="#E6009D" />
              <section>Upvote</section>
            </button>
          </div>
          <div>
            <button className="border border-sharpPink py-2 px-8 rounded-3xl flex align-center items-center gap-1">
              <HiBellAlert color="#E6009D" /> <section>following</section>
            </button>
          </div>
          <div>
            <button className="border border-sharpPink py-2 px-8 rounded-3xl flex align-center items-center gap-1">
              <FaShare color="#E6009D" />
              <section>share</section>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
