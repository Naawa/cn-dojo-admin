import { db } from '$lib/server/db/index.js';
import { centerAttendee as centerAttendeeTable, type CenterAttendee } from '$lib/server/db/schema/center.js';
import { eq } from 'drizzle-orm';

export const actions = {
    addAttendee: async (event) => {
        const formData = await event.request.formData()
        const data = await db.insert(centerAttendeeTable).values({
            studentId: formData.get("studentId") as string,
            location: formData.get("location") as string,
        }).returning()

        if (data) {
            return { success: true }
        }
        else {
            return { success: false }
        }
    },
    removeAttendee: async (event) => {
        const formData = await event.request.formData()
        const data = await db.delete(centerAttendeeTable).where(eq(
            centerAttendeeTable.studentId, formData.get("studentId") as string,
        )).returning()

        if (data) {
            return { success: true }
        }
        else {
            return { success: false }
        }
    },
};