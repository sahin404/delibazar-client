const ShowProductCard = ({product}) => {
   const {name, picture, price, stock_status, id} = product;
  return (
    <div className="space-y-2 rounded-xl bg-white p-3 shadow-lg border-2">
    <div className="relative flex h-48 w-full justify-center lg:h-[260px]">
        <img className="rounded-lg bg-black/40 object-cover" src={picture} alt="" />
    </div>
    <div className="space-y-2 font-semibold">
        <h6 className="text-sm md:text-base lg:text-lg">{name}</h6>
        <p className="text-xs font-semibold text-[#EF4444] md:text-sm">{stock_status==='in_stock'? "স্টকে আছে":"স্টকে নাই"}</p>
        <p>দাম: {price}৳</p>
    </div>
    <div className="flex items-center justify-center gap-3 flex-wrap">
        <button className="rounded-lg bg-[#233A95] px-4 py-2 font-semibold text-white duration-300 hover:scale-105 hover:bg-sky-600">বিস্তারিত</button>
        <button className="rounded-lg bg-[#EF4444] px-4 py-2 font-semibold text-white duration-300 hover:scale-95 hover:">ব্যাগে যোগ করুন</button>
    </div>
</div>
  )
}

export default ShowProductCard