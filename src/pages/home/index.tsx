import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_POSTS } from "../../graphql/queries";
import Card from "../../components/home/card";
import { IPost } from "../../types/postsType";

export const HomePage = () => {
  const [page, setPage] = useState(1);

  const { error, loading, data } = useQuery(GET_POSTS, {
    variables: {
      limit: 6,
      spaceIds: ["2zdJpaiIQdRC"],
      postTypeIds: ["iPUjWYRZTcDa3k9"],
      orderByString: "publishedAt",
      reverse: true,
      offset: (page - 1) * 6,
    },
  });
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex align-center items-center flex-col">
      <div className="flex gap-8">
        {data &&
          data?.posts?.nodes?.map((post: IPost) => {
            return (
              <Card
                date={post.createdAt}
                title={post.slug}
                like={post.reactionsCount}
                comment={post.totalRepliesCount}
                id={post.id}
                key={post.id}
              />
            );
          })}
        {loading && <p className="text-sharpPink">Is Loading...</p>}
        {error && (
          <p className="text-sharpPink">Ooooops something went wrong :( </p>
        )}
      </div>
      <button
        className="text-sharpPink"
        onClick={handleLoadMore}
        disabled={loading}
      >
        More
      </button>
    </div>
  );
};
