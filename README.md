# Product Catalogue cho VuePress Theme Hope

Dự án này mở rộng demo `vuepress-theme-hope` thành một hệ thống **catalogue sản phẩm** gồm 3 phần:

- **Website tài liệu (VuePress)** để hiển thị catalogue ở `docs/products/`.  
- **Supabase backend** (schema + Edge Functions) cho sản phẩm và danh mục.  
- **Trang quản trị (Vue 3 + Vite)** trong thư mục `admin/` để đăng nhập và CRUD dữ liệu.

---

## 1) Kiến trúc dự án

```text
.
├── docs/                              # Site VuePress (frontend hiển thị)
│   └── .vuepress/
│       ├── components/                # ProductCard, ProductGrid, FeaturedProducts
│       └── composables/useProducts.ts # Gọi API Supabase
├── supabase/
│   ├── migrations/                    # SQL schema + RLS policy
│   └── functions/                     # Edge Functions products/categories
├── admin/                             # Admin dashboard (Vue 3 + Vite)
└── package.json                       # Script chạy VuePress docs/blog
```

---

## 2) Yêu cầu môi trường

- Node.js 18+
- pnpm 10+
- (Tuỳ chọn) Supabase CLI nếu muốn chạy local stack

---

## 3) Cài đặt dependencies

Cài package cho VuePress ở thư mục gốc:

```bash
pnpm install
```

Cài package cho trang admin:

```bash
cd admin
pnpm install
cd ..
```

---

## 4) Biến môi trường

### 4.1 Frontend VuePress (`docs/.vuepress/composables/useProducts.ts`)
Code đang đọc 2 biến:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Tạo file `.env` ở **root** dự án:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### 4.2 Admin app (`admin/`)
Admin cũng dùng cùng 2 biến trên, vì vậy tạo thêm `admin/.env`:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

> Lưu ý: nếu thiếu biến môi trường, cả trang catalogue và admin sẽ không gọi API được.

---

## 5) Chạy website tài liệu (VuePress)

### Dev mode

```bash
pnpm run docs:dev
```

Site mặc định ở `http://localhost:8080` (hoặc port do VuePress cấp).  
Trang catalogue: `http://localhost:8080/products/`.

### Build production

```bash
pnpm run docs:build
```

---

## 6) Chạy blog demo (tuỳ chọn)

```bash
pnpm run blog:dev
pnpm run blog:build
```

---

## 7) Chạy trang quản trị (admin)

```bash
cd admin
pnpm run dev
```

Mặc định Vite chạy ở `http://localhost:5173`.

Các route chính:

- `/login`
- `/` (Dashboard)
- `/products`
- `/categories`

Admin lưu token vào `localStorage` key `sb-auth-token` sau khi login thành công.

### Thiết lập đăng nhập Supabase Auth (bắt buộc)

Admin **không dùng tài khoản demo hard-code**. Bạn cần có user thật trong Supabase Auth:

1. Vào **Supabase Dashboard → Authentication → Users**.  
2. Chọn **Add user** và tạo email/password để đăng nhập admin.  
3. Nếu project bật xác thực email, hãy xác nhận email hoặc tắt yêu cầu confirm trong phần Auth settings cho môi trường dev.

> Không cần tạo thêm bảng riêng để đăng nhập. Supabase Auth dùng bảng hệ thống `auth.users`.

---

## 8) Thiết lập Supabase backend

### 8.1 Database schema

File migration chính:

- `supabase/migrations/20260303121519_create_product_catalogue_schema.sql`

Migration này tạo:

- `categories`
- `products`
- `product_tags`
- `product_tag_relations`
- index + trigger cập nhật `updated_at`
- Row Level Security policies

### 8.2 Edge Functions

- `supabase/functions/products/index.ts`
- `supabase/functions/categories/index.ts`

Các endpoint chính:

- `GET /functions/v1/products`
- `GET /functions/v1/products/:slug`
- `POST|PUT|DELETE /functions/v1/products...`
- `GET /functions/v1/categories`
- `GET /functions/v1/categories/:slug`
- `POST|PUT|DELETE /functions/v1/categories...`

---

## 9) Cách dùng component catalogue trong Markdown

Sau khi cấu hình môi trường đúng, bạn có thể dùng trực tiếp trong nội dung docs:

```md
# Product Catalogue

<FeaturedProducts :limit="4" />

<ProductGrid :show-filters="true" />
```

Trang mẫu đã có sẵn tại:

- `docs/products/README.md`
- `docs/zh/products/README.md`

---

## 10) Luồng vận hành gợi ý

1. Tạo project Supabase và áp migration.  
2. Deploy Edge Functions (`products`, `categories`).  
3. Cấu hình `.env` cho root và `admin/.env`.  
4. Chạy `pnpm run docs:dev` để xem site catalogue.  
5. Chạy `cd admin && pnpm run dev` để nhập liệu qua dashboard.  
6. Build production cho docs/admin khi triển khai.

---

## 11) Lưu ý hiện trạng mã nguồn

- Repo vẫn giữ cấu trúc demo của `vuepress-theme-hope` (bao gồm docs/blog mẫu).
- Chức năng catalogue nằm ở các thư mục `docs/products`, `docs/.vuepress/components`, `docs/.vuepress/composables`, `supabase/`, và `admin/`.
- Trong Edge Function `products`, phần lọc query có đoạn tạo biến truy vấn trung gian nhưng chưa được tái sử dụng ở truy vấn trả dữ liệu cuối; nếu cần lọc nâng cao, nên refactor lại phần này.

---

## 12) Lệnh kiểm tra nhanh

Từ thư mục gốc:

```bash
pnpm run docs:build
cd admin && pnpm run build
```

Nếu cả 2 lệnh build thành công, cấu hình cơ bản của dự án đang ổn.
