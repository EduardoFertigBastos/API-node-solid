import { GymsRepository } from 'src/repositories/gyms-repository';

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  longitude: number;
  latitude: number;
}

export default class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    longitude,
    latitude,
  }: CreateGymUseCaseRequest) {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      longitude,
      latitude,
    });

    return { gym };
  }
}
