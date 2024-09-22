export type IReply = {
  id: string;
  slug: string;
  publishedAt: string;
  owner: {
    member: {
      name: string;
    };
  };
  reactions: {
    count: number;
    reacted: boolean;
    participants: {
      nodes: {
        participant: {
          name: string;
          id: string;
        };
      }[];
    };
  }[];
  replies: {
    nodes: {
      id: string;
      slug: string;
    }[];
  }[];
};
