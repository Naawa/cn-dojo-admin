ALTER TABLE "product" ADD COLUMN "center" text NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_center_center_location_fk" FOREIGN KEY ("center") REFERENCES "public"."center"("location") ON DELETE no action ON UPDATE no action;