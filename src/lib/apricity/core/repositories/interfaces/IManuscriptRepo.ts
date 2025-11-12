import { Result } from '@/lib/utils';
import { ManuscriptDBNode, ManuscriptLabel, ManuscriptStatus } from '../../types/manuscript';

export interface IManuscriptRepository {
  getManuscriptNodes(manuscriptID: string): Promise<Result<ManuscriptDBNode[], string>>;
  getManuscriptLabels(manuscriptID: string): Promise<Result<ManuscriptLabel[], string>>;
  getManuscriptStatuses(manuscriptID: string): Promise<Result<ManuscriptStatus[], string>>;
}
