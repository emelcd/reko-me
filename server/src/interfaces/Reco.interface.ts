interface IReco {
  title: string;
  description: string;
  url: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isPublic: boolean;
  owner: string;
}

export default IReco;
