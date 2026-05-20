import { getProducts } from "@/api/getProducts";
import { useEffect, useState } from "react";
import UpdateProductModal from "./UpdateProductModal";
import ViewProductModal from "./ViewProductModal";
import { useApiState } from "@/hooks/useApiState";
import LoadingOverlay from "@/components/admin/common/LoadingOverlay";
import ToastContainer from "@/components/admin/common/ToastComponent";
import { deleteProduct } from "@/api/deleteProduct";
import { useToast } from "@/hooks/useToast";

interface Product {
  _id: string;
  name: string;
  logo: string;
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
  themeColor: string;
}

const ProductCMS = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [ viewProduct, setViewProduct ] = useState<Product | null>(null)
  const [ productToDelete, setProductToDelete ] = useState<Product | null>(null)

  const [ message, setMessage ] = useState("")
  const { toasts, addToast } = useToast()
  const apiState = useApiState()


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

  const handleUpdateProduct = async (updatedData: any) => {
    try {
      setProducts((prev) =>
        prev.map((p) => (p._id === selectedProduct?._id ? { ...p, ...updatedData } : p))
      );
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!productToDelete?._id) return;

      apiState.startLoading();

      const id = productToDelete._id;

      await deleteProduct(id);

      setProducts((prev) => prev.filter((p) => p._id !== id));

      addToast("Product deleted successfully", "success");

      setMessage("");
      setProductToDelete(null);
      setViewProduct(null);
    } catch (error) {
      console.log(error);
      addToast("Failed to delete product", "error");
    } finally {
      apiState.reset();
    }
  };


  return (
    <div className="w-full p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-4 py-4 md:px-6 border-b border-gray-200 flex flex-col sm:row justify-between items-start sm:items-center gap-2">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">
            Product Inventory
          </h2>
          <span className="text-xs md:text-sm font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-500">
            {products.length} Items Total
          </span>
        </div>

        {/* Table Wrapper for Horizontal Scroll on tiny devices */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Desktop Header - Hidden on mobile */}
            <thead className="bg-gray-100 uppercase text-[10px] md:text-xs font-semibold text-gray-600 hidden md:table-header-group">
              <tr>
                <th className="px-6 py-3 border-b">Product</th>
                <th className="px-6 py-3 border-b">Category</th>
                <th className="px-4 py-3 border-b hidden lg:table-cell">Industries</th>
                <th className="px-6 py-3 border-b text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 block md:table-row-group">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    Loading products...
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr 
                    key={product._id} 
                    onClick={()=> setViewProduct(product)}
                    className="hover:bg-gray-50 transition-colors flex flex-col md:table-row p-4 md:p-0"
                  >
                    {/* Product Name & Tagline */}
                    <td className="md:px-6 md:py-4">
                      <div className="font-bold md:font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs md:text-sm text-gray-500 line-clamp-1 md:max-w-xs">
                        {product.tagline}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="mt-2 md:mt-0 md:px-6 md:py-4">
                      <span className="inline-block px-2 py-1 text-blue-700 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                    </td>

                    {/* Industries - Hidden on Mobile/Tablet, visible on Large screens */}
                    <td className="hidden lg:table-cell px-4 py-4 text-sm text-gray-600 italic">
                      {product.industries?.slice(0, 2).join(", ")}
                      {product.industries?.length > 2 && "..."}
                    </td>

                    {/* Actions */}
                    <td className="mt-4 md:mt-0 md:px-6 md:py-4 md:text-right border-t md:border-t-0 pt-3 md:pt-0">
                      <div>
                        <button
                        className="w-full mr-4 md:w-auto text-green-300 hover:text-green-500 font-black text-xs md:text-sm uppercase tracking-widest py-2 md:py-0 border md:border-0 border-[#3CBDE6]/20 rounded md:rounded-none"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProduct(product)
                        }}
                      >
                        Edit 
                      </button>
                      <button
                        className="w-full md:w-auto text-red-300 hover:text-red-500 font-black text-xs md:text-sm uppercase tracking-widest py-2 md:py-0 border md:border-0 border-[#3CBDE6]/20 rounded md:rounded-none"
                        onClick={(e)=> {
                          e.stopPropagation()
                          setProductToDelete(product)
                          setMessage('Are you sure you want to delete this product?')
                        }}
                      >
                        Delete 
                      </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Floating Button Area */}
      <div className="max-w-6xl mx-auto mt-6 flex justify-center md:justify-start">
        <button
          onClick={() => (window.location.href = "add-product")}
          className="w-full sm:w-auto px-10 py-4 bg-black text-white font-black rounded-xl hover:bg-gray-800 transition-all uppercase text-xs tracking-[0.2em] shadow-xl active:scale-95"
        >
          Add New Product
        </button>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}

      {
        viewProduct && (
          <ViewProductModal 
            product={viewProduct}
            onClose={()=> setViewProduct(null)}
          />
        )
      }

      {
        message && (
          <ConfirmPopup 
            message={message}
            onCancel={()=> setMessage("")}
            onConfirm={handleDelete}
          />
        )
      }

      {apiState.status === 'loading' && <LoadingOverlay />}
            <ToastContainer toasts={toasts} />
    </div>
  );
};

export default ProductCMS;

type ConfirmPopupProps = {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmPopup = ({
  message,
  onCancel,
  onConfirm,
}: ConfirmPopupProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-[320px] rounded-xl shadow-lg p-5">
        <h2 className="text-lg font-semibold mb-3">
          Confirm Action
        </h2>

        <p className="text-gray-600 mb-5">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};