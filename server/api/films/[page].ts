export default defineEventHandler(async (event) => {
    const db = useDatabase();
    try {
        const page = getRouterParam(event, 'page')
        if (page) {
            const { rows } = await db.sql`SELECT * FROM films LIMIT 10 OFFSET ${Number(page) * 10}`;
           return rows
        } else {
            throw createError({statusCode: 400, statusMessage: 'Page is required'})
        }
    } catch (e) {
        throw createError({statusCode: 500, statusMessage: (e as Error).message})
    }
})