import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { AboutPage, BlogDetailPage, BlogPage, CaseStudiesPage, CategoriesPage, ContactPage, FaqPage, IndustriesPage, LegalPage, SolutionsPage } from "./pages/Marketing";
import { CartPage, CheckoutPage, WishlistPage } from "./pages/Commerce";
import { ForgotPasswordPage, LoginPage, OrdersPage, ProfilePage, QuotesPage, RegisterPage, SupportPage } from "./pages/Account";
import { AdminDashboard, AdminLayout, AdminTablePage, AnalyticsPage, SettingsPage, TargetsPage } from "./pages/Admin";
import NotFound from "./pages/NotFound";

function Seo({ title, description }: { title: string; description: string }) {
  return <><title>{title} | PaceMaker</title><meta name="description" content={description} /><meta property="og:title" content={`${title} | PaceMaker`} /><meta property="og:description" content={description} /></>;
}

function Page({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <><Seo title={title} description={description} />{children}</>;
}

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<Page title="Industrial Electrical Solutions" description="Reliable stabilizers, control panels, transformers and power quality systems."><Home /></Page>} />
      <Route path="products" element={<Page title="Products" description="Browse industrial voltage stabilizers, control panels, transformers and UPS systems."><Products /></Page>} />
      <Route path="products/:slug" element={<ProductDetail />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="solutions" element={<SolutionsPage />} />
      <Route path="industries" element={<IndustriesPage />} />
      <Route path="case-studies" element={<CaseStudiesPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="blog/:slug" element={<BlogDetailPage />} />
      <Route path="faq" element={<FaqPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="wishlist" element={<WishlistPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="quotes" element={<QuotesPage />} />
      <Route path="support" element={<SupportPage />} />
      <Route path="privacy" element={<LegalPage type="privacy" />} />
      <Route path="terms" element={<LegalPage type="terms" />} />
      <Route path="not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="products" element={<AdminTablePage type="products" />} />
      <Route path="orders" element={<AdminTablePage type="orders" />} />
      <Route path="customers" element={<AdminTablePage type="customers" />} />
      <Route path="quotes" element={<AdminTablePage type="quotes" />} />
      <Route path="leads" element={<AdminTablePage type="leads" />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="targets" element={<TargetsPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
  </Routes>;
}
