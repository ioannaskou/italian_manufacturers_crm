export interface Manufacturer {
  _id: string;
  name: string;
  vatNumber?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contactPersonName: string;
  contactEmail: string;
  contactPhone: string;
  notes?: string;
}

export interface IUser {
  _id: string;
  email: string;
  role: 'Admin' | 'Sales';
  firstName: string;
  lastName: string;
}

export interface ICustomer {
  _id: string;
  type: 'company' | 'individual';
  name: string;
  vatNumber?: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
  assignedSalesRep?: IUser;
}

export interface IProductCategory {
  _id: string;
  name: string;
  description?: string;
}

export interface ICustomerManufacturer {
  _id: string;
  customer: ICustomer;
  manufacturer: Manufacturer;
}

export interface IManufacturerProductCategory {
  _id: string;
  manufacturer: Manufacturer;
  productCategory: IProductCategory;
}
