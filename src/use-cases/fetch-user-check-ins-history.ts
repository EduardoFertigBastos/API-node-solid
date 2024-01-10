import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from 'src/repositories/check-ins-repository';

interface FetchUserCheckInUseCaseRequest {
  userId: string;
  page?: number;
}

interface FetchUserCheckInUseCaseResponse {
  checkIns: CheckIn[];
}

export default class FetchUserCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: FetchUserCheckInUseCaseRequest): Promise<FetchUserCheckInUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
