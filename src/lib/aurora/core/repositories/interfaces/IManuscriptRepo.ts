import { Result } from "@/lib/utils";
import {  ManuscriptDBNode, } from "../../types/manuscript";

export interface IManuscriptRepository {
    getManuscriptNodes(manuscriptID: string): Promise<Result<ManuscriptDBNode[], string>>;
}