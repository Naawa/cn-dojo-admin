import { db } from "$lib/server/db/index.js";
import { studentSession as studentSessionTable } from "$lib/server/db/schema/session.js";
import { student as studentTable, studentProfile as studentProfileTable } from "$lib/server/db/schema/student.js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";


export const load = async ({params}) => {
    let studentId = params.studentId

    return {
        studentId
    }
};

export const actions: Actions = {
    addPoints: async ({params, request}) => { 
        const formData = await request.formData()

        const currentPoints = parseInt(formData.get('points') as string)
        const pointsToAdd = parseInt(formData.get('pointsToAdd') as string)
        const studentId = params.studentId
        if(Number.isNaN(pointsToAdd)) {
            return fail(400,  { error: "Please enter a number."})
        }
        // try {
        //     let pointsAdded = await db.update(studentProfileTable).set({points: currentPoints + pointsToAdd}).where(eq(studentProfileTable.studentId, studentId)).returning({points: studentProfileTable.points})

        //     if(pointsAdded[0].points == pointsToAdd) {
        //         return { success: "Sucessfully added student!" }
        //     }
            
        // } catch (error) {
        //     return fail(400, { error: "Points could not be added."})
        // }

        console.log(formData)
    },
    removePoints: async ({}) => {

    },
    delete: async ({params}) => {

        await db.delete(studentSessionTable).where(eq(studentSessionTable.studentId, params.studentId as string))

        await db.delete(studentProfileTable).where(eq(studentProfileTable.studentId, params.studentId as string))

        await db.delete(studentTable).where(eq(studentTable.id, params.studentId as string))
        
        throw redirect(302, "/dashboard/students")

    },
    
};