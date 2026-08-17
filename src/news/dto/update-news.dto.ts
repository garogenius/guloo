import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto implements Partial<CreateNewsDto> {
  title?: string;
  content?: string;
  thumbnail?: string;
  tags?: string[];
}
