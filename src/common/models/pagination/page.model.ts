import { PageRequest } from './page-request.model';
import { ApiProperty } from '@nestjs/swagger';

export class Page<T> {
  public elements: T[];
  @ApiProperty({ example: 10000, description: 'total elements count' })
  public totalElements: number;
  @ApiProperty({ example: 10000, description: 'total pages count' })
  public totalPages: number;
  @ApiProperty()
  public current: PageRequest;
  @ApiProperty()
  public next: PageRequest;
  @ApiProperty()
  public previous: PageRequest;

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  public static from<T>(
    elements: T[],
    totalElements: number,
    pageRequest: PageRequest,
  ): Page<T> {
    return new Page<T>({
      elements: elements,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageRequest.size),
      current: pageRequest,
      next: pageRequest.next(totalElements),
      previous: pageRequest.previous(totalElements),
    });
  }
}
