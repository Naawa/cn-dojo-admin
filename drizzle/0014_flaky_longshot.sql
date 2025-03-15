ALTER TABLE "product_images" RENAME TO "product_image";--> statement-breakpoint
ALTER TABLE "product" RENAME COLUMN "url" TO "image_url";--> statement-breakpoint
ALTER TABLE "product_image" DROP CONSTRAINT "product_images_source_unique";--> statement-breakpoint
ALTER TABLE "product_image" DROP CONSTRAINT "product_images_product_id_product_id_fk";
--> statement-breakpoint
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_source_unique" UNIQUE("source");