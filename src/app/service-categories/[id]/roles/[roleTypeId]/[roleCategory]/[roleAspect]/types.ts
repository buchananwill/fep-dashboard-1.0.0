type RoleParams = {
  id: string;
  roleTypeId: string;
  roleCategory: 'user' | 'provider' | 'asset';
  roleAspect: 'suitability' | 'availability';
};

type StringProperties<Type> = {
  [Property in keyof Type]: string;
};

export interface RolePageProps {
  params: RoleParams;
}
