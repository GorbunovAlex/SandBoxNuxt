import {BodyData} from "~/helpers/types/server";

export default defineEventHandler(async (event) => {
    try {
        const db = useDatabase();
        const body = await readBody(event);
        const data = body as BodyData
        const { rows } = await db.sql`SELECT * FROM csv_data LIMIT ${data.take} OFFSET ${data.skip}`;
        return rows
    } catch (e) {
        throw createError({statusCode: 500, statusMessage: (e as Error).message})
    }
})