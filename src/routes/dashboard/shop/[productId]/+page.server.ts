import { db } from "$lib/server/db";
import { product as productTable, type Product } from "$lib/server/db/schema/product.js";
import { and, eq } from "drizzle-orm";
import type { Actions } from "./$types";
import { del } from "@vercel/blob";
import { fail, redirect } from "@sveltejs/kit";
import { BLOB_READ_WRITE_TOKEN } from "$env/static/private";
import { studentInventory as studentInventoryTable } from "$lib/server/db/schema/student";


export const load = async ({ params, locals }) => {
    let admin = locals.admin;

    let productId = parseInt(params.productId)

    async function getProduct() {
        let product: Product | null = null
        try {
            if (admin?.center) {
                let data = await db.select().from(productTable).where(and(
                    eq(productTable.center,
                        admin.center
                    ),
                    eq(productTable.id,
                        productId
                    )))
                if (data) {
                    product = data[0]
                }
            }
        }
        catch (e) {
            return product
        }
        return product
    }

    return {
        product: await getProduct()
    }
};

export const actions: Actions = {
    delete: async ({params}) => {

        try {
            await db.delete(studentInventoryTable).where(eq(studentInventoryTable.productId, parseInt(params.productId))).returning()

            const deletedProduct = await db.delete(productTable).where(eq(productTable.id, parseInt(params.productId))).returning({imageURL: productTable.imageUrl})
            
            const {imageURL}: {imageURL: string} = deletedProduct[0]
            
            await del(imageURL, {
                token: BLOB_READ_WRITE_TOKEN
            });
            

        } catch (error) {
            return fail(500, { message: 'An error has occurred. ' + error });
        }
        throw redirect(302, "/dashboard/shop")

    },
};