import { getProducts } from "@/api/getProducts";
import { useEffect, useState } from "react";

// 1. Define the Product interface based on your JSON structure
interface Product {
  _id: string;
  name: string;
  category: string;
  tagline: string;
  industries: string[];
  image: string;
}

const ProductCMS = () => {
  // 2. Type the state as an array of Products
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className="w-full p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Product Inventory</h2>
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
                    <button className="text-indigo-600 hover:text-indigo-900 font-medium text-sm">
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
             <button onClick={()=> window.location.href = 'add-product'} className="p-2 bg-green-200">Add Products</button>
        </div>

    </div>
  );
};

export default ProductCMS;