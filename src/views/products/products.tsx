"use client";

import React, { useState, useCallback, useEffect, Suspense } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { useSearchParams, useRouter } from "next/navigation";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { currentPage, totalPages, paginatedItems: paginatedProducts, handlePageChange } =
    usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const handleOpenModal = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      const params = new URLSearchParams(searchParams?.toString());
      params.set("product-id", product.id);
      router.push(`/products?${params.toString()}`); // Use router.push for consistency
    },
    [router, searchParams]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    router.push("/products"); // Use router.push instead of window.history.pushState
  }, [router]);

  useEffect(() => {
    const productID = searchParams?.get("product-id"); // Get Search Query product-id
    const productDetails = PRODUCTS_DATA.find((item) => item.id === productID); // Find product details by ID
    if (productDetails) setSelectedProduct(productDetails);
  }, [searchParams]); // Add searchParams to dependencies

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <BackToHome />
        <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
        <div className="h-4" />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
      </div>
    </Suspense>
  );
};
