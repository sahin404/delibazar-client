import useAxiosSecure from "../../../hooks/useAxiosPublic/useAxiosSecure"
import { useQuery } from '@tanstack/react-query';
import Spinner from "../../../components/shared/Spinner";
import { useState } from "react";
import ProductPaginationControl from "./ProductPaginationControl";
import AddProductModal from "../DashboardComponents/AddProductsModal/AddProductModal";
import Swal from "sweetalert2";
import UpdateProductModal from "../DashboardComponents/UpdateProductModal/UpdateProductModal";

const Products = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState([]);

  const fetchProducts = async ({ queryKey }) => {
    const [, page] = queryKey;
    const limit = 10;
    const res = await axiosSecure.get('/products', {
      params: { page, limit }
    });
    return res.data;
  }

  const { data: { result: products = [], total = 0 } = {}, isLoading, refetch } = useQuery({
    queryKey: ['products', page],
    queryFn: fetchProducts,
    keepPreviousData: true
  })

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/productDelete/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              refetch();
            }
          })

      }
    });

  }

  const handleUpdate = async (id) => {
    await axiosSecure.get(`/update/${id}`)
      .then(res => {
        if (res.status === 200) {
          setProductToUpdate(res.data); // Save the data in state
          setIsUpdateModalOpen(true);   // Open the modal
        }
      })
  };


  const totalPage = Math.ceil(total / 10);

  if (isLoading) {
    return <Spinner></Spinner>
  }

  return (
    <div>
      <h1 className="text-red-500 font-semibold text-3xl text-center">All Products List</h1>
      <div className="divider"></div>
      <div className="flex justify-between items-center">
        <div>
          <label className="" htmlFor="">Filtered By:</label>
          <select className="ml-2 w-52 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[#D1A054]">
            <option value="all">All Products</option>
            <option value="popular">🎩 Popular</option>
            <option value="grocery">🛒 Grocery</option>
            <option value="snacks">🍪 Snacks</option>
            <option value="cosmetics">💄 Cosmetics</option>
            <option value="beverages">🍷 Beverages</option>
            <option value="dairy_products">🐄 Dairy Products</option>
            <option value="bakery_items">🎂 Bakery Items</option>
            <option value="health_safety">👶 Health & Safety</option>
            <option value="baby_care">🚼 Baby Care</option>
            <option value="cooking_ingredients">👩‍🍳 Cooking Ingredients</option>
            <option value="cleaning_hygiene">🧹 Cleaning & Hygiene</option>
          </select>
        </div>
        <div>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-3 rounded">
            + Add Product
          </button>
        </div>
      </div>



      {/* table */}
      <div className="mt-5">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-[#D1A054] text-white">
              <th className="px-4 py-2">Serial No</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Product Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="border-b">
                <td className="px-4 py-2">{(page - 1) * 10 + index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={product.picture || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360'} // Use a default image if none exists
                    alt={product.picture}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.price} BDT</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleUpdate(product._id)} className="bg-blue-500 text-white px-4 py-1 rounded">
                    Update
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <ProductPaginationControl
          page={page}
          setPage={setPage}
          totalPage={totalPage}
        ></ProductPaginationControl>

        {/* Add Product Modal */}
        <AddProductModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} ></AddProductModal>

        {/* Update Product Modal */}
        <UpdateProductModal
          isUpdateModalOpen={isUpdateModalOpen}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          productToUpdate={productToUpdate}
          refetch={refetch}
        ></UpdateProductModal>

      </div>
    </div>
  )
}

export default Products