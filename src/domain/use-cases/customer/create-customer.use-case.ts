export interface CreateCustomerUseCaseDTO {
  name: string;
  cellphoneNumber: string;
  email: string;
  password: string;
}

export interface CreateCustomerUseCase {
  create: (dto: CreateCustomerUseCaseDTO) => Promise<void>;
}
