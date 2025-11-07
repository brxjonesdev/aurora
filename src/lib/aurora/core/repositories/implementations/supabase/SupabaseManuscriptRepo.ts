import { createClient } from "@/lib/supabase/client";
import { err, ok, Result } from "@/lib/utils";
import { ManuscriptDBNode } from "../../../types/manuscript";
import { IManuscriptRepository } from "../../interfaces/IManuscriptRepo";

export function createSupabaseManuscriptRepository(): IManuscriptRepository {
    const supabase = createClient();
    return {
        getManuscriptNodes: async function (manuscriptID: string): Promise<Result<ManuscriptDBNode[], string>> {
            const { data, error } = await supabase
                .from('manuscript_nodes')
                .select('*')
                .eq('manuscript_id', manuscriptID);
            if (error) {
                return err(error.message);
            }
            return ok(data);
        }
    }
}