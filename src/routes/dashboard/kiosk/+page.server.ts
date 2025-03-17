export const actions = {
    typing: async ({request}) => {
        const formData = await request.formData()
        const studentId = formData.get("studentId") as string
        return {
            message: "Successfully added points for typing!"
        }
    },
    debug: async ({request}) => {
        const formData = await request.formData()
        return {
            message: "Successfully added points for debug!"
        }

    }
};