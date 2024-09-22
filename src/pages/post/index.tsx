import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_POST, GET_REPLIES } from "../../graphql/queries";
import Post from "../../components/post/post";
import { Reply } from "../../components/post/reply";
import { IReply } from "../../types/replyType";

export const PostPage = () => {
  const { id } = useParams();

  const {
    data: postData,
    error: postError,
    loading: postLoading,
  } = useQuery(GET_POST, {
    variables: { id: `${id}` },
  });

  const {
    data: replyData,
    error: replyError,
    loading: replyLoading,
  } = useQuery(GET_REPLIES, {
    variables: {
      limit: 10,
      postId: `${id}`,
      reverse: true,
      orderBy: "publishedAt",
    },
  });

  return (
    <div className="flex flex-col align-center items-center">
      {postData && (
        <Post
          className="my-6"
          ownerName={postData?.post.owner.member.name}
          date={postData?.post.createdAt}
          title={postData?.post.slug}
          content={postData?.post.description}
          like={postData?.post.reactionsCount}
          id={postData?.post.id}
        />
      )}
      {postLoading && <p className="text-sharpPink">Is Loading...</p>}
      {postError && (
        <p className="text-sharpPink">Ooops something went wrong :( </p>
      )}

      {replyData &&
        replyData.replies.nodes.map((node: IReply) => {
          return (
            <Reply
              key={node.id}
              content={node.slug}
              date={node.publishedAt}
              author={node.owner.member.name}
              className="mb-4"
            />
          );
        })}
      {replyLoading && <p className="text-sharpPink">Is Loading...</p>}
      {replyError && (
        <p className="text-sharpPink">Ooops something went wrong :( </p>
      )}
    </div>
  );
};
