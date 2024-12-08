-- CreateTable
CREATE TABLE "account_logs" (
    "id" BIGSERIAL NOT NULL,
    "message" JSONB NOT NULL,
    "log_time" INTEGER NOT NULL,
    "ip_address" VARCHAR(45) NOT NULL,
    "function" VARCHAR(45) NOT NULL,
    "account_id" BIGINT NOT NULL,
    "store_id" BIGINT NOT NULL,

    CONSTRAINT "account_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "first_name" VARCHAR(45) NOT NULL,
    "last_name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(45),
    "company" VARCHAR(45) NOT NULL,
    "revenue_id" SMALLINT NOT NULL,
    "status" SMALLINT NOT NULL,
    "bc_account_id" VARCHAR(45) NOT NULL,
    "state" VARCHAR(45) NOT NULL,
    "country" VARCHAR(45) NOT NULL,
    "city" VARCHAR(45) NOT NULL,
    "address_line1" TEXT,
    "address_line2" TEXT,
    "zip" VARCHAR(45),
    "billing_contact_id" BIGINT NOT NULL,
    "tenant_id" BIGINT NOT NULL,
    "has_store" BOOLEAN NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing_contact" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "first_name" VARCHAR(45) NOT NULL,
    "last_name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "company" VARCHAR(45) NOT NULL,
    "state" VARCHAR(45) NOT NULL,
    "country" VARCHAR(45) NOT NULL,
    "city" VARCHAR(45) NOT NULL,
    "phone" VARCHAR(45),
    "address_line1" TEXT,
    "address_line2" TEXT,
    "zip" VARCHAR(45),

    CONSTRAINT "billing_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "tenant_id" BIGINT NOT NULL,
    "is_visible" BOOLEAN NOT NULL,
    "products_qty" INTEGER NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "bc_id" INTEGER NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "enable_account" INTEGER NOT NULL,
    "disable_account" INTEGER NOT NULL,
    "tenant_id" BIGINT NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_permission" (
    "id" BIGSERIAL NOT NULL,
    "group_id" BIGINT NOT NULL,
    "permission_id" BIGINT NOT NULL,

    CONSTRAINT "group_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "module" VARCHAR(255) NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_payments" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "plan_payment_no" VARCHAR(45) NOT NULL,
    "store_hash" VARCHAR(45) NOT NULL,
    "store_id" INTEGER NOT NULL,
    "bc_store_id" VARCHAR(45) NOT NULL,
    "store_name" VARCHAR(128) NOT NULL,
    "account_id" INTEGER NOT NULL,
    "bc_account_id" VARCHAR(45) NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "plan_sku" VARCHAR(45) NOT NULL,
    "plan_name" VARCHAR(128) NOT NULL,
    "plan_code" VARCHAR(45) NOT NULL,
    "plan_price" DECIMAL(10,2) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "net" DECIMAL(10,2) NOT NULL,
    "gross" DECIMAL(10,2) NOT NULL,
    "tenant_id" BIGINT NOT NULL,

    CONSTRAINT "plan_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "code" VARCHAR(45) NOT NULL,
    "sku" VARCHAR(45) NOT NULL,
    "desc" TEXT,
    "cost" DECIMAL(10,2) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "is_trial" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "is_delete" BOOLEAN NOT NULL,
    "bill_cycle" INTEGER NOT NULL,
    "tenant_id" BIGINT NOT NULL,
    "franchise_price" DECIMAL(10,2) NOT NULL,
    "is_effective" BOOLEAN NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" SMALLINT NOT NULL,
    "sku" VARCHAR(255) NOT NULL,
    "inventory_track" SMALLINT NOT NULL,
    "inventory" INTEGER NOT NULL,
    "low_stork" INTEGER NOT NULL,
    "price" DECIMAL(8,2) NOT NULL,
    "cost_price" DECIMAL(8,2),
    "retail_price" DECIMAL(8,2),
    "sale_price" DECIMAL(8,2),
    "description" TEXT,
    "custom_fields" JSONB NOT NULL,
    "page_title" VARCHAR(255),
    "product_url" VARCHAR(255) NOT NULL,
    "meta_description" TEXT,
    "search_keywords" VARCHAR(255),
    "meta_keywords" VARCHAR(255),
    "bin_picking" VARCHAR(255),
    "bar_code" VARCHAR(32),
    "global_trade" VARCHAR(255),
    "manufacturer_part" VARCHAR(255),
    "free" BOOLEAN NOT NULL,
    "fixed" DECIMAL(8,2),
    "weight" DECIMAL(8,2) NOT NULL,
    "width" DECIMAL(8,2),
    "height" DECIMAL(8,2),
    "depth" DECIMAL(8,2),
    "is_visible" BOOLEAN NOT NULL,
    "is_featured" BOOLEAN NOT NULL,
    "warranty" TEXT,
    "tax_class" SMALLINT NOT NULL,
    "condition" SMALLINT NOT NULL,
    "is_show_condition" BOOLEAN NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "brand" VARCHAR(128),
    "tenant_id" BIGINT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" BIGSERIAL NOT NULL,
    "product_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "image_import" VARCHAR(255),
    "is_thumbnail" BOOLEAN NOT NULL,
    "image_sort_order" INTEGER NOT NULL,
    "image_description" TEXT,
    "youtube" VARCHAR(100),
    "video_title" VARCHAR(500),
    "video_description" TEXT,
    "video_sort_order" INTEGER,
    "product_id" BIGINT NOT NULL,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "sku" VARCHAR(255) NOT NULL,
    "option" JSONB NOT NULL,
    "current_stork" INTEGER NOT NULL,
    "low_stork" INTEGER NOT NULL,
    "cost_price" DECIMAL(8,2),
    "bin_picking" VARCHAR(255),
    "free" BOOLEAN NOT NULL,
    "product_id" BIGINT NOT NULL,
    "bar_code" VARCHAR(255),
    "depth" DECIMAL(8,2),
    "fixed" DECIMAL(8,2),
    "global_trade" VARCHAR(255),
    "height" DECIMAL(8,2),
    "image_url" VARCHAR(200),
    "manufacturer_part" VARCHAR(255),
    "price" DECIMAL(8,2) NOT NULL,
    "retail_price" DECIMAL(8,2),
    "sale_price" DECIMAL(8,2),
    "weight" DECIMAL(8,2),
    "width" DECIMAL(8,2),

    CONSTRAINT "product_variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "promotion_id" VARCHAR(45) NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "redemption_type" SMALLINT NOT NULL,
    "status" SMALLINT NOT NULL,
    "max_uses" SMALLINT,
    "current_uses" SMALLINT,
    "stop" BOOLEAN NOT NULL,
    "can_be_used_with_other_promotions" BOOLEAN NOT NULL,
    "start_date" INTEGER,
    "end_date" INTEGER,
    "customer" JSONB NOT NULL,
    "rules" JSONB NOT NULL,
    "notifications" JSONB NOT NULL,
    "shipping_address" JSONB,
    "schedule" JSONB,
    "currency_code" VARCHAR(32) NOT NULL,
    "coupon_overrides_automatic_when_offering_higher_discounts" BOOLEAN NOT NULL,
    "account_id" BIGINT NOT NULL,
    "tenant_id" BIGINT NOT NULL,
    "coupon_code" VARCHAR(200),

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provisioning_profiles" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "utilization" INTEGER NOT NULL,
    "themes_id" BIGINT,
    "img" VARCHAR(255),
    "industry" VARCHAR(255),
    "description" TEXT,
    "orders" INTEGER,
    "sale" DECIMAL(8,2),
    "is_deleted" BOOLEAN NOT NULL,
    "tenant_id" BIGINT NOT NULL,
    "products_qty" INTEGER NOT NULL,
    "template_id" INTEGER,

    CONSTRAINT "provisioning_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provisioning_profiles_categories" (
    "id" BIGSERIAL NOT NULL,
    "provisioningprofiles_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,

    CONSTRAINT "provisioning_profiles_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provisioning_profiles_products" (
    "id" BIGSERIAL NOT NULL,
    "provisioningprofiles_id" BIGINT NOT NULL,
    "product_id" BIGINT NOT NULL,

    CONSTRAINT "provisioning_profiles_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provisioning_profiles_promotion" (
    "id" BIGSERIAL NOT NULL,
    "provisioningprofiles_id" BIGINT NOT NULL,
    "promotion_id" BIGINT NOT NULL,

    CONSTRAINT "provisioning_profiles_promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_apps" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "key" VARCHAR(128) NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "bc_user_id" INTEGER NOT NULL,
    "app_id" BIGINT NOT NULL,
    "store_id" BIGINT NOT NULL,

    CONSTRAINT "store_apps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_logs" (
    "id" BIGSERIAL NOT NULL,
    "bc_log_id" INTEGER NOT NULL,
    "severity" SMALLINT NOT NULL,
    "type" VARCHAR(40) NOT NULL,
    "module" VARCHAR(255),
    "summary" VARCHAR(255),
    "message" TEXT,
    "created_at" INTEGER NOT NULL,
    "store_id" BIGINT NOT NULL,
    "tenant_id" BIGINT NOT NULL,

    CONSTRAINT "store_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_plan_changes" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "effective" SMALLINT NOT NULL,
    "effective_date" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" SMALLINT NOT NULL,
    "cur_plan_id" BIGINT NOT NULL,
    "pre_plan_id" BIGINT NOT NULL,
    "store_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "store_plan_changes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "store_id" VARCHAR(45) NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "desc" TEXT,
    "store_hash" VARCHAR(45),
    "country" VARCHAR(10) NOT NULL,
    "region" SMALLINT NOT NULL,
    "is_trial" BOOLEAN NOT NULL,
    "status" SMALLINT NOT NULL,
    "expire_time" INTEGER,
    "allocated_at" INTEGER,
    "is_launched" BOOLEAN NOT NULL,
    "is_paused" BOOLEAN NOT NULL,
    "is_destroyed" BOOLEAN NOT NULL,
    "primary_hostname" VARCHAR(255),
    "canonical_hostname" VARCHAR(255),
    "api_info" JSONB NOT NULL,
    "settings" JSONB NOT NULL,
    "account_id" BIGINT NOT NULL,
    "plan_id" BIGINT NOT NULL,
    "tenant_id" BIGINT NOT NULL,
    "company" VARCHAR(128),
    "provisioning_profile_id" BIGINT,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_config" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "key" SMALLINT NOT NULL,
    "value" JSONB NOT NULL,
    "tenant_id" BIGINT NOT NULL,

    CONSTRAINT "sys_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_apps" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "key" VARCHAR(128) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "app_id" INTEGER NOT NULL,
    "client_id" VARCHAR(128) NOT NULL,
    "client_secret" VARCHAR(500) NOT NULL,
    "default_app_url" VARCHAR(255) NOT NULL,
    "auth_url" VARCHAR(255) NOT NULL,
    "tenant_id" BIGINT NOT NULL,

    CONSTRAINT "tenant_apps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_logs" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user" VARCHAR(254) NOT NULL,
    "ip_address" VARCHAR(45) NOT NULL,
    "module" VARCHAR(45) NOT NULL,
    "details" VARCHAR(45) NOT NULL,
    "tenant_id" BIGINT NOT NULL,

    CONSTRAINT "tenant_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_users" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "last_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "last_login" INTEGER,
    "phone" VARCHAR(20),
    "is_deleted" BOOLEAN NOT NULL,
    "tenant_id" BIGINT NOT NULL,

    CONSTRAINT "tenant_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "key" VARCHAR(128) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "phone" VARCHAR(20),
    "country" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50),
    "address" VARCHAR(500) NOT NULL,
    "contact_info" JSONB NOT NULL,
    "status" BOOLEAN NOT NULL,
    "franchise_id" VARCHAR(128),
    "client_id" VARCHAR(128),
    "client_secret" VARCHAR(500),
    "token" VARCHAR(255),
    "expires_at" INTEGER,
    "region" SMALLINT NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "themes" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "uuid" VARCHAR(200) NOT NULL,
    "is_private" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "utilization" INTEGER NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "tenant_id" BIGINT NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "themes_variation" (
    "id" BIGSERIAL NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "format_created_at" TIMESTAMPTZ(6) NOT NULL,
    "format_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "uuid" VARCHAR(200) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "external_id" VARCHAR(100) NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "themes_id" BIGINT NOT NULL,

    CONSTRAINT "themes_variation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_group" (
    "id" BIGSERIAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "group_id" BIGINT NOT NULL,
    "tenantUser_id" BIGINT NOT NULL,

    CONSTRAINT "user_group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "account_logs_account_id_6c231da4" ON "account_logs"("account_id");

-- CreateIndex
CREATE INDEX "account_logs_store_id_456a4536" ON "account_logs"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_200aa879_uniq" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_bc_account_id_key" ON "accounts"("bc_account_id");

-- CreateIndex
CREATE INDEX "accounts_bc_account_id_92eb9a2c_like" ON "accounts"("bc_account_id");

-- CreateIndex
CREATE INDEX "accounts_billing_contact_id_2bc4832b" ON "accounts"("billing_contact_id");

-- CreateIndex
CREATE INDEX "accounts_email_200aa879_like" ON "accounts"("email");

-- CreateIndex
CREATE INDEX "accounts_tenant_id_92aa2d6f" ON "accounts"("tenant_id");

-- CreateIndex
CREATE INDEX "product_category_tenant_id_137164b9" ON "categories"("tenant_id");

-- CreateIndex
CREATE INDEX "group_tenant_id_de1dfc19" ON "group"("tenant_id");

-- CreateIndex
CREATE INDEX "group_permission_group_id_9ad985d1" ON "group_permission"("group_id");

-- CreateIndex
CREATE INDEX "group_permission_permission_id_1617f503" ON "group_permission"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_name_key" ON "permission"("name");

-- CreateIndex
CREATE INDEX "permission_name_123d2039_like" ON "permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "plan_payments_plan_payment_no_key" ON "plan_payments"("plan_payment_no");

-- CreateIndex
CREATE INDEX "plan_payments_plan_payment_no_0ba7fa5f_like" ON "plan_payments"("plan_payment_no");

-- CreateIndex
CREATE INDEX "plan_payments_tenant_id_5539180b" ON "plan_payments"("tenant_id");

-- CreateIndex
CREATE INDEX "plans_tenant_id_69bf2e77" ON "plans"("tenant_id");

-- CreateIndex
CREATE INDEX "product_tenant_id_957f8279" ON "product"("tenant_id");

-- CreateIndex
CREATE INDEX "product_categories_category_id_127e9bb3" ON "product_categories"("category_id");

-- CreateIndex
CREATE INDEX "product_categories_product_id_8862397f" ON "product_categories"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_product_id_category_id_7f37747d_uniq" ON "product_categories"("product_id", "category_id");

-- CreateIndex
CREATE INDEX "product_images_product_id_28ebf5f0" ON "product_images"("product_id");

-- CreateIndex
CREATE INDEX "product_variant_product_id_31eca93d" ON "product_variant"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "promotions_promotion_id_key" ON "promotions"("promotion_id");

-- CreateIndex
CREATE INDEX "promotions_account_id_4712cfc3" ON "promotions"("account_id");

-- CreateIndex
CREATE INDEX "promotions_promotion_id_56239b44_like" ON "promotions"("promotion_id");

-- CreateIndex
CREATE INDEX "promotions_tenant_id_50305f0d" ON "promotions"("tenant_id");

-- CreateIndex
CREATE INDEX "provisioning_profiles_tenant_id_efbf562a" ON "provisioning_profiles"("tenant_id");

-- CreateIndex
CREATE INDEX "provisioning_profiles_themes_id_b4ce7571" ON "provisioning_profiles"("themes_id");

-- CreateIndex
CREATE INDEX "provisioning_profiles_cate_provisioningprofiles_id_a11e1618" ON "provisioning_profiles_categories"("provisioningprofiles_id");

-- CreateIndex
CREATE INDEX "provisioning_profiles_categories_category_id_d13fe474" ON "provisioning_profiles_categories"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "provisioning_profiles_ca_provisioningprofiles_id__68a2d65a_uniq" ON "provisioning_profiles_categories"("provisioningprofiles_id", "category_id");

-- CreateIndex
CREATE INDEX "provisioning_profiles_products_product_id_0248d606" ON "provisioning_profiles_products"("product_id");

-- CreateIndex
CREATE INDEX "provisioning_profiles_products_provisioningprofiles_id_19fe536f" ON "provisioning_profiles_products"("provisioningprofiles_id");

-- CreateIndex
CREATE UNIQUE INDEX "provisioning_profiles_pr_provisioningprofiles_id__78b1f69d_uniq" ON "provisioning_profiles_products"("provisioningprofiles_id", "product_id");

-- CreateIndex
CREATE INDEX "provisioning_profiles_prom_provisioningprofiles_id_60f775d5" ON "provisioning_profiles_promotion"("provisioningprofiles_id");

-- CreateIndex
CREATE INDEX "provisioning_profiles_promotion_promotion_id_8f6f4d3c" ON "provisioning_profiles_promotion"("promotion_id");

-- CreateIndex
CREATE UNIQUE INDEX "provisioning_profiles_pr_provisioningprofiles_id__d88130bd_uniq" ON "provisioning_profiles_promotion"("provisioningprofiles_id", "promotion_id");

-- CreateIndex
CREATE INDEX "store_apps_app_id_1744dd79" ON "store_apps"("app_id");

-- CreateIndex
CREATE INDEX "store_apps_store_id_92861862" ON "store_apps"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "store_apps_store_id_app_id_80ec8519_uniq" ON "store_apps"("store_id", "app_id");

-- CreateIndex
CREATE INDEX "store_logs_store_id_91ee0669" ON "store_logs"("store_id");

-- CreateIndex
CREATE INDEX "store_logs_tenant_id_a7f195fd" ON "store_logs"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "store_logs_store_id_bc_log_id_a8aabf69_uniq" ON "store_logs"("store_id", "bc_log_id");

-- CreateIndex
CREATE INDEX "store_plan_changes_cur_plan_id_0a880359" ON "store_plan_changes"("cur_plan_id");

-- CreateIndex
CREATE INDEX "store_plan_changes_pre_plan_id_a6c9f03f" ON "store_plan_changes"("pre_plan_id");

-- CreateIndex
CREATE INDEX "store_plan_changes_store_id_bfaebddd" ON "store_plan_changes"("store_id");

-- CreateIndex
CREATE INDEX "store_plan_changes_user_id_f7f38954" ON "store_plan_changes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "stores_store_id_key" ON "stores"("store_id");

-- CreateIndex
CREATE INDEX "stores_account_id_13ed3d59" ON "stores"("account_id");

-- CreateIndex
CREATE INDEX "stores_plan_id_280e6763" ON "stores"("plan_id");

-- CreateIndex
CREATE INDEX "stores_provisioning_profile_id_fdf2560e" ON "stores"("provisioning_profile_id");

-- CreateIndex
CREATE INDEX "stores_store_id_119c32aa_like" ON "stores"("store_id");

-- CreateIndex
CREATE INDEX "stores_tenant_id_34c19dfe" ON "stores"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "stores_name_account_id_f2d22d62_uniq" ON "stores"("name", "account_id");

-- CreateIndex
CREATE INDEX "sys_config_tenant_id_5a59e05c" ON "sys_config"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_apps_app_id_key" ON "tenant_apps"("app_id");

-- CreateIndex
CREATE INDEX "tenant_apps_tenant_id_17392124" ON "tenant_apps"("tenant_id");

-- CreateIndex
CREATE INDEX "tenant_logs_tenant_id_6ccc811e" ON "tenant_logs"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_users_email_key" ON "tenant_users"("email");

-- CreateIndex
CREATE INDEX "tenant_users_email_95d4bf98_like" ON "tenant_users"("email");

-- CreateIndex
CREATE INDEX "tenant_users_tenant_id_52a75c9d" ON "tenant_users"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "themes_uuid_key" ON "themes"("uuid");

-- CreateIndex
CREATE INDEX "themes_tenant_id_d45a14f8" ON "themes"("tenant_id");

-- CreateIndex
CREATE INDEX "themes_uuid_099235bf_like" ON "themes"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "themes_variation_uuid_key" ON "themes_variation"("uuid");

-- CreateIndex
CREATE INDEX "themes_variation_themes_id_b953bc38" ON "themes_variation"("themes_id");

-- CreateIndex
CREATE INDEX "themes_variation_uuid_5edd6777_like" ON "themes_variation"("uuid");

-- CreateIndex
CREATE INDEX "user_group_group_id_ce41bceb" ON "user_group"("group_id");

-- CreateIndex
CREATE INDEX "user_group_tenantUser_id_dac62c1d" ON "user_group"("tenantUser_id");

-- AddForeignKey
ALTER TABLE "account_logs" ADD CONSTRAINT "account_logs_account_id_6c231da4_fk_accounts_id" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "account_logs" ADD CONSTRAINT "account_logs_store_id_456a4536_fk_stores_id" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_billing_contact_id_2bc4832b_fk_billing_contact_id" FOREIGN KEY ("billing_contact_id") REFERENCES "billing_contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_tenant_id_92aa2d6f_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "product_category_tenant_id_137164b9_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_tenant_id_de1dfc19_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "group_permission" ADD CONSTRAINT "group_permission_group_id_9ad985d1_fk_group_id" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "group_permission" ADD CONSTRAINT "group_permission_permission_id_1617f503_fk_permission_id" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "plan_payments" ADD CONSTRAINT "plan_payments_tenant_id_5539180b_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_tenant_id_69bf2e77_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_tenant_id_957f8279_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_category_id_127e9bb3_fk_product_category_id" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_8862397f_fk_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_28ebf5f0_fk_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_product_id_31eca93d_fk_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_account_id_4712cfc3_fk_accounts_id" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_tenant_id_50305f0d_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "provisioning_profiles" ADD CONSTRAINT "provisioning_profiles_tenant_id_efbf562a_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "provisioning_profiles" ADD CONSTRAINT "provisioning_profiles_themes_id_b4ce7571_fk_themes_id" FOREIGN KEY ("themes_id") REFERENCES "themes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "provisioning_profiles_categories" ADD CONSTRAINT "provisioning_profile_category_id_d13fe474_fk_categorie" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "provisioning_profiles_categories" ADD CONSTRAINT "provisioning_profile_provisioningprofiles_a11e1618_fk_provision" FOREIGN KEY ("provisioningprofiles_id") REFERENCES "provisioning_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "provisioning_profiles_products" ADD CONSTRAINT "provisioning_profile_product_id_0248d606_fk_product_i" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "provisioning_profiles_products" ADD CONSTRAINT "provisioning_profile_provisioningprofiles_19fe536f_fk_provision" FOREIGN KEY ("provisioningprofiles_id") REFERENCES "provisioning_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "provisioning_profiles_promotion" ADD CONSTRAINT "provisioning_profile_promotion_id_8f6f4d3c_fk_promotion" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "provisioning_profiles_promotion" ADD CONSTRAINT "provisioning_profile_provisioningprofiles_60f775d5_fk_provision" FOREIGN KEY ("provisioningprofiles_id") REFERENCES "provisioning_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_apps" ADD CONSTRAINT "store_apps_app_id_1744dd79_fk_tenant_apps_id" FOREIGN KEY ("app_id") REFERENCES "tenant_apps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_apps" ADD CONSTRAINT "store_apps_store_id_92861862_fk_stores_id" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_logs" ADD CONSTRAINT "store_logs_store_id_91ee0669_fk_stores_id" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_logs" ADD CONSTRAINT "store_logs_tenant_id_a7f195fd_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_plan_changes" ADD CONSTRAINT "store_plan_changes_cur_plan_id_0a880359_fk_plans_id" FOREIGN KEY ("cur_plan_id") REFERENCES "plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_plan_changes" ADD CONSTRAINT "store_plan_changes_pre_plan_id_a6c9f03f_fk_plans_id" FOREIGN KEY ("pre_plan_id") REFERENCES "plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_plan_changes" ADD CONSTRAINT "store_plan_changes_store_id_bfaebddd_fk_stores_id" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_plan_changes" ADD CONSTRAINT "store_plan_changes_user_id_f7f38954_fk_tenant_users_id" FOREIGN KEY ("user_id") REFERENCES "tenant_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_account_id_13ed3d59_fk_accounts_id" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_plan_id_280e6763_fk_plans_id" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_provisioning_profile_fdf2560e_fk_provision" FOREIGN KEY ("provisioning_profile_id") REFERENCES "provisioning_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_tenant_id_34c19dfe_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sys_config" ADD CONSTRAINT "sys_config_tenant_id_5a59e05c_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tenant_apps" ADD CONSTRAINT "tenant_apps_tenant_id_17392124_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tenant_logs" ADD CONSTRAINT "tenant_logs_tenant_id_6ccc811e_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tenant_users" ADD CONSTRAINT "tenant_users_tenant_id_52a75c9d_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "themes" ADD CONSTRAINT "themes_tenant_id_d45a14f8_fk_tenants_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "themes_variation" ADD CONSTRAINT "themes_variation_themes_id_b953bc38_fk_themes_id" FOREIGN KEY ("themes_id") REFERENCES "themes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_group_id_ce41bceb_fk_group_id" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_tenantUser_id_dac62c1d_fk_tenant_users_id" FOREIGN KEY ("tenantUser_id") REFERENCES "tenant_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
