import React, { SyntheticEvent, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";
import { PiThumbsUp } from "react-icons/pi";
import { dateFormatter } from "../../utilities/dateFormtter";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_REACTION, REMOVE_REACTION } from "../../graphql/mutations";

type IProps = {
  date: string;
  title: string;
  like: number;
  comment: number;
  id: string;
};

const Card = ({ date, title, like, comment, id }: IProps) => {
  const navigate = useNavigate();
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

  const onLikButtonHandler = () => {
    setReaction(!reaction);
    updateReaction();
  };

  const onClickCardHandler = (e: SyntheticEvent) => {
    navigate(id);
    e.stopPropagation();
  };

  const dateOfPublish = dateFormatter(date);

  return (
    <div
      onClick={onClickCardHandler}
      className="border border-card border-sharpPink shadow-card hover:shadow-card-hover rounded-md  w-[30%] border-[2px]"
    >
      <div className="px-[20px]">
        <p className="pt-6">{dateOfPublish}</p>
        <p className="pt-2 pb-6 font-bold text-xl">{title}</p>
        <div className="flex gap-4 items-center align-center pb-1">
          <div>
            <button className="p-3 border border-sharpPink rounded-2xl">
              <PiThumbsUp color="#E6009D" />
            </button>
          </div>
          <div
            className="flex align-center items-center gap-1"
            onClick={onLikButtonHandler}
          >
            <CiHeart color="#E6009D" size={25} />
            {like}
          </div>
          <div className="flex align-center items-center gap-1">
            <TfiCommentAlt color="#E6009D" />
            {comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
