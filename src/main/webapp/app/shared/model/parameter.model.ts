import { IApplication } from 'app/shared/model/application.model';

export interface IParameter {
  id?: number;
  name?: string;
  description?: string;
  value?: string;
  enable?: boolean;
  application?: IApplication;
}

export const defaultValue: Readonly<IParameter> = {
  enable: false
};
