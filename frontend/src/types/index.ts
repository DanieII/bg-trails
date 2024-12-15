export type TrailType = {
  _id: string;
  name: string;
  location: string;
  length: number;
  geometry: GeoJSON.GeometryObject;
  likes: Array<string> | undefined;
};

export type CommentType = {
  _id: string;
  text: string;
  user: { firstName: string; lastName: string };
  createdAt: string;
};
