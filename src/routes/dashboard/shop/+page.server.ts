import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import { validateName } from "$lib/server/validation";
import { product as productTable, type Product} from "$lib/server/db/schema/product.js";
import { db } from "$lib/server/db/index.js";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ locals }) => {
    let admin = locals.admin;

    async function getProducts() {
            let products: Product[] | null = null
            try {
                if (admin?.center) {
                    let data = await db.select().from(productTable).where(eq(productTable.center,
                        admin.center
                    ))
                    if(data) {
                        products = data
                    }
                }
            }
            catch (e) {
                return products
            }
            return products
        }
    
    return { products: await getProducts(), admin };
};

export const actions: Actions = {
    add: async (event) => {
        const formData = await event.request.formData();

        let productData = {
            name: formData.get('productName') as string,
            price: parseFloat(formData.get('price') as string),
            category: formData.get('category') as string,
            stock: parseInt(formData.get('stock') as string),
        };

        if (!validateName(productData.name)) {
            return fail(400, { error: "Invalid product name." });
        }

        // Insert into database (mocked for now)
        console.log("New product added:", productData);
        
        return { success: "Successfully added product!" };
    },
    update: () => {},
    remove: () => {}
};
