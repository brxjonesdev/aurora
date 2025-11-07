import { err } from '@/lib/utils';
import { ok } from '@/lib/utils';
import { IManuscriptRepository } from '../../interfaces/IManuscriptRepo';
import { Manuscript, ManuscriptCreate, ManuscriptWithTree } from '../../../types/manuscript';

export function createInMemoryManuscriptRepository(): IManuscriptRepository {
    const manuscript: ManuscriptWithTree | null = null;
    return {
}