"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// =======================
// Tipos
// =======================

type Route = "home" | "about" | "contact";
type StoreView = "catalog" | "cart" | "detail";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
};

type CartLine = {
  productId: string;
  quantity: number;
};

// =======================
// Data inicial (zapatillas Nike)
// =======================

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "cleanser-01",
    name: "Nike Air Max 270 Blanco Hielo",
    category: "Lifestyle",
    price: 150.0,
    stock: 8,
    image:
      "https://images.pexels.com/photos/14910512/pexels-photo-14910512.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Nike Air Max 270 en blanco con detalles oscuros y unidad Air extragrande en el talón. Pensada para uso diario, mezcla comodidad suave con un look urbano limpio.",
  },
  {
    id: "serum-01",
    name: "Nike Air Force 1 Low Triple White",
    category: "Lifestyle",
    price: 140.0,
    stock: 10,
    image:
      "https://images.pexels.com/photos/6692037/pexels-photo-6692037.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "La clásica Nike Air Force 1 Low en blanco total. Un ícono del streetwear con capellada de cuero y suela gruesa que nunca pasa de moda.",
  },
  {
    id: "moisturizer-01",
    name: "Nike Air Zoom Pegasus Road",
    category: "Running",
    price: 135.0,
    stock: 7,
    image:
      "https://images.pexels.com/photos/13080356/pexels-photo-13080356.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Nike Air Zoom Pegasus diseñada para runners que buscan un equilibrio entre respuesta y amortiguación. Perfecta para entrenos diarios y trotes urbanos.",
  },
  {
    id: "cleanser-02",
    name: "Nike Dunk Low Sunset Red",
    category: "Skate",
    price: 145.0,
    stock: 5,
    image:
      "https://images.pexels.com/photos/11924648/pexels-photo-11924648.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Nike Dunk Low con bloques de color rojos y amarillos, ideal para quienes buscan un toque llamativo en su rotación de sneakers.",
  },
  {
    id: "cleanser-03",
    name: "Nike Zoom Running Night Mode",
    category: "Running",
    price: 130.0,
    stock: 6,
    image:
      "https://images.pexels.com/photos/14595086/pexels-photo-14595086.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Zapatilla Nike de running en tonos oscuros con detalles que destacan en baja luz. Perfecta para entrenar de noche o en clima fresco.",
  },
  {
    id: "cleanser-04",
    name: "Nike Revolution Road Runner",
    category: "Running",
    price: 95.0,
    stock: 12,
    image:
      "https://images.pexels.com/photos/797637/pexels-photo-797637.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Zapatilla de entrada de Nike para quienes inician en el running o quieren un par cómodo para caminar largas distancias.",
  },
  {
    id: "cleanser-05",
    name: "Nike Air Force 1 Low Red Swoosh",
    category: "Lifestyle",
    price: 145.0,
    stock: 9,
    image:
      "https://images.pexels.com/photos/12891494/pexels-photo-12891494.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Variante de Nike Air Force 1 Low en blanco con swoosh y detalles en rojo. Mantiene la silueta clásica con un toque de color.",
  },
  {
    id: "cleanser-06",
    name: "Nike Trail Terra Escape",
    category: "Trail",
    price: 155.0,
    stock: 4,
    image:
      "https://images.pexels.com/photos/27568728/pexels-photo-27568728.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Modelo inspirado en el trail con suela agresiva y upper reforzado. Diseñada para senderos, terrenos mixtos y salidas al aire libre.",
  },
  {
    id: "cleanser-07",
    name: "Nike Air Force 1 Shadow Red/White",
    category: "Lifestyle",
    price: 160.0,
    stock: 5,
    image:
      "https://images.pexels.com/photos/12891493/pexels-photo-12891493.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Silueta tipo Air Force 1 con combinación de blanco, negro y rojo, pensada para quienes aman los bloques de color fuertes.",
  },
  {
    id: "serum-02",
    name: "Nike Air Max 1 Concept Multicolor",
    category: "Lifestyle",
    price: 170.0,
    stock: 3,
    image:
      "https://images.pexels.com/photos/18946899/pexels-photo-18946899.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Modelo inspirado en las Nike Air Max 1 con mezcla de materiales y colores vivos. Perfecto para coleccionistas y amantes del diseño.",
  },
  {
    id: "serum-03",
    name: "Nike Zoom Street Runner",
    category: "Running",
    price: 135.0,
    stock: 6,
    image:
      "https://images.pexels.com/photos/10154937/pexels-photo-10154937.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Zapatilla Nike tipo runner con diseño moderno y suela pensada para asfalto. Un buen equilibrio entre rendimiento y estilo.",
  },
  {
    id: "serum-04",
    name: "Nike Air Force 1 Low White/Green",
    category: "Lifestyle",
    price: 145.0,
    stock: 7,
    image:
      "https://images.pexels.com/photos/27600381/pexels-photo-27600381.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Versión de Nike Air Force 1 en blanco con acentos verdes, ideal para quienes buscan un toque de color sin perder la limpieza del blanco.",
  },
  {
    id: "moisturizer-02",
    name: "Nike Air Max Minimal White",
    category: "Lifestyle",
    price: 155.0,
    stock: 4,
    image:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Zapatilla Nike en tonos blancos sobre fondo más oscuro, ideal para quienes buscan un diseño minimalista pero con presencia.",
  },
  {
    id: "moisturizer-03",
    name: "Air Jordan 4 Retro Fire Red",
    category: "Basketball",
    price: 190.0,
    stock: 3,
    image:
      "https://images.pexels.com/photos/15298945/pexels-photo-15298945.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Air Jordan 4 en combinación Fire Red, uno de los colores más reconocibles de la línea Jordan. Perfecto para amantes del basket y del streetwear.",
  },
  {
    id: "moisturizer-04",
    name: "Nike Zoom Tempo Training",
    category: "Training",
    price: 160.0,
    stock: 5,
    image:
      "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Modelo tipo Nike Zoom orientado a entrenos rápidos, gimnasio y sesiones mixtas de cardio y fuerza.",
  },
  {
    id: "toner-01",
    name: "Nike Dunk Low Blue/White",
    category: "Skate",
    price: 150.0,
    stock: 6,
    image:
      "https://images.pexels.com/photos/28368030/pexels-photo-28368030.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Nike Dunk Low en combinación azul y blanco. Ideal para looks relajados con jeans y prendas básicas.",
  },
  {
    id: "toner-02",
    name: "Nike Running Red/Black",
    category: "Running",
    price: 135.0,
    stock: 8,
    image:
      "https://images.pexels.com/photos/786003/pexels-photo-786003.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Zapatilla de running Nike con upper rojo y detalles negros, pensada para entrenos diarios y trotadas ligeras.",
  },
  {
    id: "exfoliant-01",
    name: "Nike Air Max Neon Glow",
    category: "Lifestyle",
    price: 165.0,
    stock: 4,
    image:
      "https://images.pexels.com/photos/8278491/pexels-photo-8278491.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Nike Air Max con colores llamativos y mezcla de tonos neón, ideal para destacar en la calle.",
  },
  {
    id: "exfoliant-02",
    name: "Nike Court Red & White",
    category: "Lifestyle",
    price: 140.0,
    stock: 5,
    image:
      "https://images.pexels.com/photos/15298949/pexels-photo-15298949.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Zapatilla Nike de corte bajo en rojo y blanco, pensada para combinar con looks casuales y deportivos.",
  },
  {
    id: "mask-01",
    name: "Air Jordan 1 KO Retro",
    category: "Basketball",
    price: 185.0,
    stock: 3,
    image:
      "https://images.pexels.com/photos/12010216/pexels-photo-12010216.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Versión Jordan 1 KO con mezcla de materiales y estética vintage. Un modelo muy apreciado por fans de Jordan.",
  },
  {
    id: "mask-02",
    name: "Nike Running White Breeze",
    category: "Running",
    price: 120.0,
    stock: 9,
    image:
      "https://images.pexels.com/photos/3557818/pexels-photo-3557818.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Zapatilla blanca de running Nike pensada para entrenos ligeros y caminatas largas, con diseño limpio y versátil.",
  },
  {
    id: "oil-01",
    name: "Nike Court Street Classic",
    category: "Lifestyle",
    price: 110.0,
    stock: 11,
    image:
      "https://images.pexels.com/photos/6540994/pexels-photo-6540994.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Modelo Nike de corte bajo, sencillo y cómodo, ideal como sneaker básico para combinar con jeans, joggers o shorts.",
  },
  {
    id: "oil-02",
    name: "Nike Street Neon Detail",
    category: "Lifestyle",
    price: 130.0,
    stock: 6,
    image:
      "https://images.pexels.com/photos/13691717/pexels-photo-13691717.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description:
      "Zapatilla urbana Nike con detalles de color vivos sobre base neutra, pensada para destacar sin perder funcionalidad.",
  },
];

// =======================
// Navbar
// =======================

interface NavbarProps {
  route: Route;
  onNavigate: (route: Route) => void;
  cartCount: number;
  onCartClick: () => void;
}

function Navbar({ route, onNavigate, cartCount, onCartClick }: NavbarProps) {
  const baseLinkClass =
    "rounded-full px-3 py-1 text-sm font-medium transition-colors";

  const linkClass = (r: Route) =>
    `${baseLinkClass} ${
      route === r
        ? "bg-sky-500 text-white"
        : "text-slate-700 hover:bg-sky-100 hover:text-slate-900"
    }`;

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-sky-100/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Nombre */}
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
            N
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-900">
              Nike Monochrome Store
            </span>
            <span className="text-[11px] text-slate-500">
              Zapatillas Nike 100% originales
            </span>
          </div>
        </div>

        {/* Menú + carrito */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className={linkClass("home")}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate("about")}
            className={linkClass("about")}
          >
            Acerca de
          </button>
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className={linkClass("contact")}
          >
            Contáctanos
          </button>

          <button
            type="button"
            onClick={onCartClick}
            className="relative inline-flex flex-col items-end rounded-2xl border border-slate-300 bg-white px-3 py-2 text-[11px] font-semibold text-slate-800 shadow-sm shadow-slate-200 hover:bg-slate-50"
          >
            <span className="text-[11px] uppercase tracking-wide text-slate-500">
              Carrito
            </span>
            <span className="text-sm font-bold text-slate-900">
              {cartCount} item(s)
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// =======================
// Página principal
// =======================

export default function HomePage() {
  const [route, setRoute] = useState<Route>("home");
  const [storeView, setStoreView] = useState<StoreView>("catalog");

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const totalItems = cart.reduce((acc, line) => acc + line.quantity, 0);

  const totalPrice = cart.reduce<number>((acc, line) => {
    const product = products.find((p) => p.id === line.productId);
    if (!product) return acc;
    return acc + product.price * line.quantity;
  }, 0);

  // =======================
  // CRUD Productos
  // =======================

  const handleCreateProduct = (data: Omit<Product, "id">) => {
    const idFromName = data.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const newProduct: Product = {
      ...data,
      id: `${idFromName}-${Date.now()}`,
    };

    setProducts((prev) => [...prev, newProduct]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setCart((prev) => [...prev]);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((line) => line.productId !== id));

    if (editingProduct?.id === id) {
      setEditingProduct(null);
    }
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
      setStoreView("catalog");
    }
  };

  // =======================
  // Carrito
  // =======================

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((line) => line.productId === productId);
      const currentQty = existing?.quantity ?? 0;

      if (currentQty >= product.stock) {
        alert("No hay más stock disponible para este modelo.");
        return prev;
      }

      if (existing) {
        return prev.map((line) =>
          line.productId === productId
            ? { ...line, quantity: line.quantity + 1 }
            : line
        );
      }

      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handleChangeCartQuantity = (productId: string, quantity: number) => {
    if (!Number.isFinite(quantity) || quantity < 1) {
      quantity = 1;
    }

    setCart((prev) =>
      prev.map((line) =>
        line.productId === productId ? { ...line, quantity } : line
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((line) => line.productId !== productId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío. Agrega al menos un producto.");
      return;
    }

    alert("✅ Venta exitosa. ¡Gracias por tu compra!");
    setCart([]);
    setStoreView("catalog");
  };

  // =======================
  // Navegación tienda
  // =======================

  const handleViewProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setStoreView("detail");
  };

  const goToCatalog = () => {
    setStoreView("catalog");
    setSelectedProduct(null);
  };

  const goToCart = () => {
    setStoreView("cart");
  };

  // =======================
  // Navegación global (menú)
  // =======================

  const handleNavigate = (next: Route) => {
    setRoute(next);
    if (next !== "home") {
      setStoreView("catalog");
      setSelectedProduct(null);
      setEditingProduct(null);
    }
  };

  const handleCartClickFromNavbar = () => {
    setRoute("home");
    setStoreView("cart");
  };

  // =======================
  // Render
  // =======================

  return (
    <main className="min-h-screen bg-sky-50">
      <Navbar
        route={route}
        onNavigate={handleNavigate}
        cartCount={totalItems}
        onCartClick={handleCartClickFromNavbar}
      />

      {/* CONTENIDO SEGÚN RUTA */}
      {route === "home" && (
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
          {/* HEADER HOME */}
          <header className="space-y-3">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Nike Monochrome Store
              </h1>
              <p className="max-w-2xl text-sm text-slate-600">
                Somos una tienda especializada en zapatillas Nike 100%
                originales, pensada para quienes viven el deporte y el estilo
                urbano todos los días. Aquí puedes gestionar el catálogo, ver
                detalles de cada modelo y simular compras en un carrito
                funcional.
              </p>
            </div>
          </header>

          {/* VISTAS DE LA TIENDA */}
          {storeView === "catalog" && (
            <section className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]">
              {/* Columna de productos */}
              <div className="space-y-4">
                {/* Formulario CRUD */}
                <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/80">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        Gestión de catálogo
                      </h2>
                      <p className="text-xs text-slate-600">
                        Crea, edita o elimina modelos de zapatillas Nike.
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700">
                      {products.length} modelos
                    </span>
                  </div>

                  <ProductForm
                    key={editingProduct?.id ?? "create"}
                    editingProduct={editingProduct}
                    onCreate={handleCreateProduct}
                    onUpdate={handleUpdateProduct}
                    onCancelEdit={() => setEditingProduct(null)}
                  />
                </section>

                {/* Grid de productos */}
                <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/80">
                  <ProductGrid
                    products={products}
                    cart={cart}
                    onAddToCart={handleAddToCart}
                    onEdit={setEditingProduct}
                    onDelete={handleDeleteProduct}
                    onViewDetail={handleViewProductDetail}
                  />
                </section>
              </div>

              {/* Carrito lateral */}
              <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/80 lg:sticky lg:top-6">
                <CartSidebar
                  products={products}
                  cart={cart}
                  totalItems={totalItems}
                  totalPrice={totalPrice}
                  onChangeQuantity={handleChangeCartQuantity}
                  onRemoveItem={handleRemoveFromCart}
                  onCheckout={handleCheckout}
                />
                <button
                  type="button"
                  onClick={goToCart}
                  className="mt-3 w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700 hover:bg-slate-50"
                >
                  Ver carrito en vista completa
                </button>
              </aside>
            </section>
          )}

          {storeView === "cart" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/80">
              <CartSidebar
                products={products}
                cart={cart}
                totalItems={totalItems}
                totalPrice={totalPrice}
                onChangeQuantity={handleChangeCartQuantity}
                onRemoveItem={handleRemoveFromCart}
                onCheckout={handleCheckout}
                showBackButton
                onBackToShop={goToCatalog}
              />
            </section>
          )}

          {storeView === "detail" && selectedProduct && (
            <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/80">
              <ProductDetail
                product={selectedProduct}
                onBack={goToCatalog}
                onAddToCart={() => handleAddToCart(selectedProduct.id)}
              />
            </section>
          )}
        </div>
      )}

      {route === "about" && <AboutView />}

      {route === "contact" && <ContactView />}
    </main>
  );
}

// =======================
// Formulario de producto (CRUD)
// =======================

interface ProductFormProps {
  editingProduct: Product | null;
  onCreate: (data: Omit<Product, "id">) => void;
  onUpdate: (product: Product) => void;
  onCancelEdit: () => void;
}

type ProductFormState = {
  name: string;
  category: string;
  price: string;
  stock: string;
  image: string;
  description: string;
};

const emptyFormState: ProductFormState = {
  name: "",
  category: "",
  price: "",
  stock: "",
  image: "",
  description: "",
};

function ProductForm({
  editingProduct,
  onCreate,
  onUpdate,
  onCancelEdit,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormState>(() => {
    if (editingProduct) {
      return {
        name: editingProduct.name,
        category: editingProduct.category,
        price: String(editingProduct.price),
        stock: String(editingProduct.stock),
        image: editingProduct.image,
        description: editingProduct.description,
      };
    }
    return emptyFormState;
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.price || !form.stock) {
      alert("Nombre, precio y stock son obligatorios.");
      return;
    }

    const payload: Omit<Product, "id"> = {
      name: form.name.trim(),
      category: form.category.trim() || "Lifestyle",
      price: Number(form.price),
      stock: Number(form.stock),
      image:
        form.image.trim() ||
        "https://images.pexels.com/photos/14910512/pexels-photo-14910512.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
      description:
        form.description.trim() || "Modelo personalizado añadido al catálogo.",
    };

    if (editingProduct) {
      onUpdate({ ...payload, id: editingProduct.id });
    } else {
      onCreate(payload);
    }

    setForm(emptyFormState);
  };

  const isEditing = Boolean(editingProduct);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200"
    >
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1 text-xs">
          <label className="font-semibold text-slate-800" htmlFor="name">
            Modelo
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nike Air Max..."
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>

        <div className="flex flex-col gap-1 text-xs">
          <label className="font-semibold text-slate-800" htmlFor="category">
            Categoría
          </label>
          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Running, Lifestyle..."
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>

        <div className="flex flex-col gap-1 text-xs">
          <label className="font-semibold text-slate-800" htmlFor="price">
            Precio (USD)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step={0.01}
            value={form.price}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>

        <div className="flex flex-col gap-1 text-xs">
          <label className="font-semibold text-slate-800" htmlFor="stock">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min={0}
            value={form.stock}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1 text-xs">
          <label className="font-semibold text-slate-800" htmlFor="image">
            URL de imagen (opcional)
          </label>
          <input
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1 text-xs">
          <label className="font-semibold text-slate-800" htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            placeholder="Detalles del modelo, sensaciones, uso recomendado..."
            className="resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-slate-300 hover:bg-sky-600"
        >
          {isEditing ? "Actualizar modelo" : "Crear modelo"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

// =======================
// Grid de productos
// =======================

interface ProductGridProps {
  products: Product[];
  cart: CartLine[];
  onAddToCart: (productId: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onViewDetail: (product: Product) => void;
}

function ProductGrid({
  products,
  cart,
  onAddToCart,
  onEdit,
  onDelete,
  onViewDetail,
}: ProductGridProps) {
  if (!products.length) {
    return (
      <p className="text-sm text-slate-600">
        No hay productos en el catálogo. Crea un modelo con el formulario
        superior.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Catálogo de zapatillas Nike
          </h2>
          <p className="text-xs text-slate-600">
            Añade modelos al carrito, edítalos o revisa su detalle.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const line = cart.find((l) => l.productId === product.id);
          const inCartQty = line?.quantity ?? 0;
          const stockLeft = product.stock - inCartQty;
          const outOfStock = stockLeft <= 0;

          return (
            <article
              key={product.id}
              className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-sm shadow-slate-200"
            >
              <button
                type="button"
                onClick={() => onViewDetail(product)}
                className="relative mb-3 overflow-hidden rounded-2xl bg-slate-200 text-left"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover transition duration-300 hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 flex flex-col gap-1 text-[11px] font-medium text-slate-700">
                  <span className="inline-flex rounded-full bg-white/90 px-2 py-0.5 border border-slate-200">
                    {product.category}
                  </span>
                  {outOfStock ? (
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-slate-500 border border-slate-200">
                      Sin stock
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">
                      {stockLeft} disponibles
                    </span>
                  )}
                </div>
              </button>

              <div className="flex flex-1 flex-col justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-end justify-between gap-2">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-600">Precio</p>
                    <p className="text-sm font-semibold text-slate-900">
                      ${product.price.toFixed(2)}
                    </p>
                    {inCartQty > 0 && (
                      <p className="text-[11px] text-slate-600">
                        En carrito: {inCartQty}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <button
                      type="button"
                      disabled={outOfStock}
                      onClick={() => onAddToCart(product.id)}
                      className="inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm shadow-slate-300 hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                    >
                      {outOfStock ? "Sin stock" : "Añadir al carrito"}
                    </button>
                    <div className="flex flex-wrap gap-1">
                      <button
                        type="button"
                        onClick={() => onViewDetail(product)}
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Ver detalle
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(product.id)}
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

// =======================
// Carrito
// =======================

interface CartSidebarProps {
  products: Product[];
  cart: CartLine[];
  totalItems: number;
  totalPrice: number;
  onChangeQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  showBackButton?: boolean;
  onBackToShop?: () => void;
}

function CartSidebar({
  products,
  cart,
  totalItems,
  totalPrice,
  onChangeQuantity,
  onRemoveItem,
  onCheckout,
  showBackButton,
  onBackToShop,
}: CartSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Carrito de compras
          </h2>
          <p className="text-xs text-slate-600">
            Revisa tus modelos Nike antes de finalizar.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700">
          {totalItems} artículo(s)
        </span>
      </div>

      {showBackButton && onBackToShop && (
        <button
          type="button"
          onClick={onBackToShop}
          className="mb-3 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
        >
          ← Seguir comprando
        </button>
      )}

      {cart.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600">
          Tu carrito está vacío. Añade zapatillas desde el catálogo.
        </p>
      ) : (
        <>
          <div className="flex-1 space-y-2 overflow-auto rounded-2xl bg-slate-50 p-2">
            {cart.map((line) => {
              const product = products.find((p) => p.id === line.productId);
              if (!product) return null;

              return (
                <article
                  key={line.productId}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3"
                >
                  <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-slate-600">
                          {product.category}
                        </p>
                      </div>
                      <p className="text-xs font-semibold text-slate-900">
                        ${(product.price * line.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-600">
                          Cantidad:
                        </span>
                        <input
                          type="number"
                          min={1}
                          value={line.quantity}
                          onChange={(event) =>
                            onChangeQuantity(
                              line.productId,
                              Number(event.target.value)
                            )
                          }
                          className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(line.productId)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-4 space-y-3 border-t border-slate-200 pt-3 text-sm">
            <div className="flex items-center justify-between text-slate-700">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className="w-full rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-slate-300 hover:bg-sky-600"
            >
              Finalizar compra (demo)
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// =======================
// Detalle de producto
// =======================

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: () => void;
}

function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="space-y-3">
        <button
          type="button"
          onClick={onBack}
          className="mb-2 inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
        >
          ← Volver al catálogo
        </button>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-cover md:h-80"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
            {product.category}
          </p>
          <h2 className="text-2xl font-bold text-slate-900">{product.name}</h2>
          <p className="text-sm text-slate-700">{product.description}</p>
        </div>

        <div className="space-y-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Precio</span>
            <span className="text-xl font-semibold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Stock disponible:{" "}
            <span className="font-semibold text-slate-900">
              {product.stock}
            </span>
          </p>

          <button
            type="button"
            onClick={onAddToCart}
            className="mt-1 w-full rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-slate-300 hover:bg-sky-600"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

// =======================
// Vista "Acerca de"
// =======================

function AboutView() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h2 className="mb-4 text-2xl font-bold text-slate-900">
        Acerca de nuestra tienda
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-700">
        <p>
          Somos una tienda especializada en zapatillas Nike 100% originales,
          pensada para quienes viven el deporte y el estilo urbano todos los
          días. Trabajamos únicamente con referencias auténticas, cuidando cada
          detalle: calidad, confort y diseño. En nuestra tienda encontrarás
          modelos clásicos y lanzamientos modernos, ideales para correr,
          entrenar o completar tu outfit con el sello inconfundible de Nike.
        </p>
        <p>
          Nuestra tienda nació de una idea sencilla: ofrecer tenis originales en
          un espacio donde la confianza y la experiencia del cliente fueran lo
          primero. Durante años vimos cómo muchas personas compraban sneakers
          sin estar seguras de su autenticidad, sin asesoría y sin información
          clara sobre el modelo que realmente necesitaban. De esa necesidad
          surgió este proyecto, creado por amantes del deporte y del streetwear.
        </p>
        <p>
          Desde el inicio nos propusimos tres pilares: autenticidad, comodidad y
          acompañamiento. Autenticidad, porque trabajamos solo con productos
          originales y proveedores confiables. Comodidad, porque elegimos
          modelos que acompañen tu ritmo de vida: correr, entrenar, estudiar,
          trabajar o simplemente caminar por la ciudad. Y acompañamiento, porque
          queremos que cada cliente sepa qué está comprando y para qué le sirve
          ese modelo.
        </p>
        <p>
          Hoy, nuestra tienda es un punto de encuentro para runners,
          coleccionistas, amantes del streetwear y personas que simplemente
          quieren un par de Nike que les dure, se sienta bien y refleje su
          estilo. No buscamos solo vender zapatillas, sino construir una
          relación a largo plazo, paso a paso, pisada a pisada, contigo.
        </p>
      </div>
    </section>
  );
}

// =======================
// Vista "Contáctanos"
// =======================

function ContactView() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Mensaje enviado. Pronto te responderemos.");
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h2 className="mb-4 text-2xl font-bold text-slate-900">Contáctanos</h2>
      <p className="mb-4 text-sm text-slate-700">
        Si tienes dudas sobre tallas, modelos, disponibilidad o quieres asesoría
        para elegir tus próximas Nike, déjanos un mensaje y te responderemos lo
        antes posible (en esta demo solo verás una alerta).
      </p>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit}
          className="space-y-3 rounded-2xl bg-white p-4 shadow-lg shadow-slate-200/80 ring-1 ring-slate-200"
        >
          <div className="flex flex-col gap-1 text-sm">
            <label className="font-semibold text-slate-800" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              required
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <label className="font-semibold text-slate-800" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <label className="font-semibold text-slate-800" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Cuéntanos qué modelo buscas, tu talla o tu duda..."
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-slate-300 hover:bg-sky-600"
          >
            Enviar mensaje (demo)
          </button>
        </form>

        <div className="space-y-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 text-sm text-slate-700">
          <h3 className="text-base font-semibold text-slate-900">
            Información de contacto
          </h3>
          <p>
            <span className="font-semibold">Correo:</span>{" "}
            contacto@nike-monochrome.store
          </p>
          <p>
            <span className="font-semibold">WhatsApp:</span> +57 300 000 0000
          </p>
          <p>
            <span className="font-semibold">Horario:</span> Lunes a sábado, 9:00
            a.m. – 7:00 p.m.
          </p>
          <p className="text-xs text-slate-500">
            *Este es un proyecto demo sin conexión real a sistemas de Nike ni
            pasarela de pago.
          </p>
        </div>
      </div>
    </section>
  );
}
