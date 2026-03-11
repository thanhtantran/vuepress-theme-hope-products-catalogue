import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Product {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  compare_at_price?: number;
  sku?: string;
  category_id?: string;
  images?: string[];
  featured_image?: string;
  is_active?: boolean;
  is_featured?: boolean;
  stock_quantity?: number;
  metadata?: Record<string, any>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const path = url.pathname.replace("/functions/v1/products", "");
    const searchParams = url.searchParams;

    if (req.method === "GET") {
      if (path && path !== "/") {
        const slug = path.substring(1);

        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            category:categories(*),
            tags:product_tag_relations(tag:product_tags(*))
          `)
          .eq("slug", slug)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          return new Response(
            JSON.stringify({ error: "Product not found" }),
            {
              status: 404,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        return new Response(
          JSON.stringify(data),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const categorySlug = searchParams.get("category");
      const featured = searchParams.get("featured");
      const active = searchParams.get("active");
      const search = searchParams.get("search");

      const limitRaw = parseInt(searchParams.get("limit") || "50");
      const offsetRaw = parseInt(searchParams.get("offset") || "0");
      const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(limitRaw, 200) : 50;
      const offset = Number.isFinite(offsetRaw) && offsetRaw >= 0 ? offsetRaw : 0;

      let query = supabase
        .from("products")
        .select(
          `
            *,
            category:categories(*),
            tags:product_tag_relations(tag:product_tags(*))
          `,
          { count: "exact" }
        )
        .order("created_at", { ascending: false });

      if (categorySlug) {
        const { data: category, error: categoryError } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", categorySlug)
          .maybeSingle();

        if (categoryError) throw categoryError;

        if (!category) {
          return new Response(
            JSON.stringify({ data: [], count: 0 }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        query = query.eq("category_id", category.id);
      }

      if (featured === "true") {
        query = query.eq("is_featured", true);
      }

      if (active !== "false") {
        query = query.eq("is_active", true);
      }

      if (search) {
        query = query.textSearch("name", search);
      }

      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      return new Response(
        JSON.stringify({ data, count }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (req.method === "POST") {
      const product: Product = await req.json();

      const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify(data),
        {
          status: 201,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (req.method === "PUT") {
      if (!path || path === "/") {
        return new Response(
          JSON.stringify({ error: "Product slug required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const slug = path.substring(1);
      const updates: Partial<Product> = await req.json();

      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("slug", slug)
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify(data),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (req.method === "DELETE") {
      if (!path || path === "/") {
        return new Response(
          JSON.stringify({ error: "Product slug required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const slug = path.substring(1);

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("slug", slug);

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
