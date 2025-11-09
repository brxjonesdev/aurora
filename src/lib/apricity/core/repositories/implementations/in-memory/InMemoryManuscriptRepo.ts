import { err } from '@/lib/utils';
import { ok } from '@/lib/utils';
import { IManuscriptRepository } from '../../interfaces/IManuscriptRepo';
import { ManuscriptWithTree } from '../../../types/manuscript';

export function createInMemoryManuscriptRepository(): IManuscriptRepository {
    const manuscript: ManuscriptWithTree | null = null;
    return {
        async getManuscriptNodes(manuscriptID: string) {
            return ok("got it") 
        }
    };
}