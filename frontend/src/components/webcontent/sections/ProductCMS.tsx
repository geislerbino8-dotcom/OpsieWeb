import { getProducts } from "@/api/getProducts";
import { useEffect, useState } from "react";
import UpdateProductModal from "./UpdateProductModal"; // Adjust path as needed

// Updated interface to match the full structure required by the Modal
interface Product {
  _id: string;
  name: string;
  image: string;
  tagline: string;
  description: string;
  category: string;
  price?: number;
  features: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  contents: {
    overview: string;
    problemSolved: string;
    implementation: string;
    support: string;
  };
  videoAd: string;
  photos: string[];
  analytics: { title: string; value: string; description: string }[];
  industries: string[];
}

const ProductCMS = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // State to track which product is currently being edited
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle the update after modal submission
  const handleUpdateProduct = async (updatedData: any) => {
    try {
      // 1. Optional: Call your API here to persist changes to MongoDB
      // await api.updateProduct(selectedProduct?._id, updatedData);

      // 2. Update local state so UI reflects changes immediately
      setProducts((prev) =>
        prev.map((p) => (p._id === selectedProduct?._id ? { ...p, ...updatedData } : p))
      );
      
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  console.log(selectedProduct)

  return (
    <div className="w-full p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Product Inventory</h2>
          <span className="text-sm text-gray-500">{products.length} Items Total</span>
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 uppercase text-xs font-semibold text-gray-600">
            <tr>
              <th className="px-6 py-3 border-b">Product</th>
              <th className="px-6 py-3 border-b">Category</th>
              <th className="px-6 py-3 border-b">Industries</th>
              <th className="px-6 py-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{product.tagline}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.industries?.join(", ") || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      className="text-[#3CBDE6] hover:text-blue-800 font-bold text-sm uppercase tracking-wider"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="max-w-6xl mx-auto mt-5">
        <button 
          onClick={() => window.location.href = 'add-product'} 
          className="px-6 py-2 bg-black text-white font-bold rounded hover:bg-gray-800 transition-all uppercase text-sm tracking-widest"
        >
          Add Product
        </button>
      </div>

      {/* Conditional Rendering of the Modal */}
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default ProductCMS;