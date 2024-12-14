export type TrailType = {
  _id: string;
  name: string;
  location: string;
  length: number;
  geometry: GeoJSON.GeometryObject;
};

export type CommentType = {
  _id: string;
  text: string;
  user: { _id: string; firstName: string; lastName: string };
  createdAt: string;
};
