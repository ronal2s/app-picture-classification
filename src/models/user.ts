export type User = {
  id: string;
  fullname: string;
  picture?: string;
  isMobileVerified?: boolean;
  mobile: {
    areaCode: string;
    number: string;
  };
  createdAt: object;
};
