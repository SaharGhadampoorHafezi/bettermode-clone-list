export type IPost = {
  createdAt: string;
  createdById: string;
  description: string;
  fields: {
    key: string;
    value: string;
  }[];
  id: string;
  mappingFields: {
    key: string;
    type: string;
    value: string;
  }[];
  ownerId: string;
  reactions: {
    count: number;
    reacted: boolean;
    reaction: string;
  }[];
  reactionsCount: number;
  shortContent: string | null;
  slug: string;
  subscribersCount: number;
  title: string;
  totalRepliesCount: number;
};
