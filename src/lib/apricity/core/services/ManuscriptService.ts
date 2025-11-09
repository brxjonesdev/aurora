/* eslint-disable @typescript-eslint/no-explicit-any */
import { ok, err, Result } from '@/lib/utils';
import { IManuscriptRepository } from '../repositories/interfaces/IManuscriptRepo';
import { ManuscriptDBNode, } from '@/lib/aurora/core/types/manuscript';

export default function createManuscriptService(repository: IManuscriptRepository) {

 
  return {
   async getManuscriptTreeNodes(
  manuscriptId: string
): Promise<Result<ManuscriptDBNode[], string>> {
  console.log("ManuscriptService - getManuscriptTree called with manuscriptId:", manuscriptId);

  const result = await repository.getManuscriptNodes(manuscriptId);
  console.log("ManuscriptService - getManuscriptTree result:", result);

  if (!result.ok) {
    return err(result.error);
  }
  const nodes = result.data;
  if (!nodes || nodes.length === 0) {
    return ok([]);
  }
  
  return ok(nodes)
    },
    async getManuscriptLabels(manuscriptID: string) {
      // const result = await repository.getManuscriptLabels(manuscriptID);
      // if (!result.ok) {
      //   return err(result.error);
      // }
      // return ok(result.data);
      return ok([]);
    },
    async getManuscriptStatuses(manuscriptID: string) {
      // const result = await repository.getManuscriptStatuses(manuscriptID);
      // if (!result.ok) {
      //   return err(result.error);
      // }
      // return ok(result.data);
      return ok([]);
    },
  };
}
