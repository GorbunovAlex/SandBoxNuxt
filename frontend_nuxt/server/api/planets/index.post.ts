import {BodyData} from "~/helpers/types/server";

export default defineEventHandler(async (event) => {
    try {
        const db = useDatabase();
        const body = await readBody(event);
        const data = body as BodyData
        const { rows } = await db.sql`SELECT * FROM planets LIMIT ${data.take} OFFSET ${data.skip}`;
        const { rows:count } = await db.sql`SELECT COUNT(*) FROM planets`;
        if (rows && count) {
            return {
                count: count[0]['COUNT(*)'],
                result: rows
            }
        }
    } catch (e) {
        throw createError({statusCode: 500, statusMessage: (e as Error).message})
    }
})