import { db } from "$lib/server/db/index.js";
import { studentSession as studentSessionTable } from "$lib/server/db/schema/session.js";
import { studentInventory as studentInventoryTable, student as studentTable, studentProfile as studentProfileTable } from "$lib/server/db/schema/student.js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";


export const load = async ({params}) => {
    let studentId = params.studentId

    return {
        studentId
    }
};

export const actions: Actions = {
    delete: async ({params}) => {

        await db.delete(studentSessionTable).where(eq(studentSessionTable.studentId, params.studentId as string))

        await db.delete(studentInventoryTable).where(eq(studentInventoryTable.studentId, params.studentId as string))

        await db.delete(studentProfileTable).where(eq(studentProfileTable.studentId, params.studentId as string))

        await db.delete(studentTable).where(eq(studentTable.id, params.studentId as string))
        
        throw redirect(302, "/dashboard/students")

    },
    
};