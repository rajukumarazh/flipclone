import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import PreviewModal from "../Modals/PreviewModal";
const InputField = ({ label, value, onChange }) => (
	<div className="mb-3">
		<label className="text-sm text-gray-600">{label}</label>
		<input
			value={value}
			onChange={onChange}
			className="w-full border p-2 rounded mt-1"
		/>
	</div>
);
const AdminPanel = () => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [products, setProducts] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editId, setEditId] = useState(null);
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState(null);
	let initialForm = {
		title: "",
		price: "",
		category: "",
		image: "",
		description: "",
		rating: { rate: "", count: 10 },
		available: "",
	};
	const [form, setForm] = useState(initialForm);
	// 📥 Fetch Products
	const fetchProducts = async () => {
		const res = await axios.get(
			`http://localhost:5000/api/products?page=${page}&limit=5`,
		);
		console.log("responseAdmin", res);
		setProducts(res?.data?.products);
		setTotalPages(res?.data?.totalPages);
		//setProducts(res.data);
	};

	useEffect(() => {
		fetchProducts();
	}, [page]);
	// console.log("formsss", form);
	// ➕ Add / ✏️ Update
	const handleSubmit = async () => {
		if (editId) {
			let dt = await axios.put(
				`http://localhost:5000/api/updateproduct/${editId}`,
				form,
			);
			// console.log("ddt", dt);
		} else {
			await axios.post("http://localhost:5000/api/insert", form);
		}

		setShowModal(false);
		setEditId(null);
		setForm(initialForm);

		fetchProducts();
	};

	// ✏️ Edit
	const handleEdit = (product) => {
		setForm(product);
		setEditId(product._id);
		setShowModal(true);
	};

	//  Delete
	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:5000/api/product/${id}`);
		setProducts((prev) => prev.filter((p) => p._id !== id));
	};

	const handleClose = () => {
		setShowModal(!showModal);
		setForm(initialForm);
	};

	async function handleUpload() {
		const formData = new FormData();
		formData.append("image", file);

		let res = await axios.post(
			"http://localhost:5000/api/upload",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);

		setForm((prev) => ({
			...prev,
			image: res?.data?.imageUrl,
		}));
		if (res.data?.imageUrl) {
			alert("image uploaded sucessfully");
		}
		setIsOpen(!isOpen);
	}
	return (
		<div className="max-w-7xl mx-auto">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				{/* <h1 className="text-2xl font-bold">Admin Panel</h1> */}
				<button
					onClick={() => {
						setEditId(null), setShowModal(!showModal);
						setForm(initialForm);
					}}
					className="bg-blue-600 text-white px-4 py-2 rounded">
					+ Add Product
				</button>
				<button
					// onClick={() => {
					// 	setEditId(null), setShowModal(!showModal);
					// 	setForm(initialForm);
					// }}
					className="bg-blue-600 text-white px-4 py-2 rounded">
					+ Add Mulitiple Product
				</button>
			</div>

			{/* Table */}
			<div className="bg-white shadow  overflow-auto border rounded">
				<table className="w-full text-sm">
					<thead className="bg-gray-100">
						<tr className="">
							<th className="p-3">Image</th>
							<th className="p-3">Title</th>
							<th className="p-3">Price</th>
							<th className="p-3">Category</th>
							<th className="p-3">Actions</th>
						</tr>
					</thead>

					<tbody>
						{products?.map((p) => (
							<tr
								key={p._id}
								className="border-t hover:bg-gray-50">
								<td className="p-3">
									<img
										src={`${p.image}`}
										className="w-12 h-12 object-cover"
									/>
								</td>
								<td className="p-3">{p.title}</td>
								<td className="p-3">₹{p.price}</td>
								<td className="p-3">{p.category}</td>
								<td className="p-3 flex gap-3">
									<button
										onClick={() => handleEdit(p)}
										className="text-blue-600">
										Edit
									</button>
									<button
										onClick={() =>
											handleDelete(p._id)
										}
										className="text-red-600">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
					<div className="bg-white p-6 rounded w-full max-w-xl max-h-[80vh] overflow-y-auto shadow-lg">
						<div className="flex-wrap">
							{/* <h2 className="text-lg mb-4 font-semibold">
								Add / Edit Product
							</h2> */}
							<input
								type="file"
								onChange={(e) => {
									const f = e.target.files[0];
									if (!f) return;

									setFile(f);
									setPreview(URL.createObjectURL(f));
									setIsOpen(true);
									//handleUpload()
								}}
							/>
							{/* <button
								onClick={() => handleUpload()}
								className="bg-green-600 text-white px-4 py-1 rounded">
								Upload
							</button> */}
							<PreviewModal
								isOpen={isOpen}
								onClose={() => setIsOpen(false)}
								image={preview}
								onUpload={handleUpload}
							/>
						</div>
						<div className="bg-white p-6 rounded w-96">
							<h2 className="text-lg mb-4">
								{editId
									? "Edit Product"
									: "Add Product"}
							</h2>

							<InputField
								label="Title"
								value={form.title}
								onChange={(e) =>
									setForm({
										...form,
										title: e.target.value,
									})
								}
							/>

							<InputField
								label="Price"
								value={form.price}
								onChange={(e) =>
									setForm({
										...form,
										price: e.target.value,
									})
								}
							/>

							<InputField
								label="Category"
								value={form.category}
								onChange={(e) =>
									setForm({
										...form,
										category: e.target.value,
									})
								}
							/>

							{/* <InputField
								label="Imag"
								value={form.image}
								onChange={(e) =>
									setForm({
										...form,
										image: e.target.value,
									})
								}
							/> */}
							<InputField
								label="description"
								value={form.description}
								onChange={(e) =>
									setForm({
										...form,
										description: e.target.value,
									})
								}
							/>
							<InputField
								label="available"
								value={form.available}
								onChange={(e) =>
									setForm({
										...form,
										available: e.target.value,
									})
								}
							/>
							<div className="mb-3">
								<label className="text-sm text-gray-600">
									Rating (0–5)
								</label>

								<input
									type="number"
									step="1"
									min="0"
									max="5"
									value={form?.rating?.rate}
									onChange={(e) =>
										setForm({
											...form,
											rating: {
												...form.rating,
												rate: Number(
													e.target.value,
												),
											},
										})
									}
									className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div className="flex justify-center gap-3 mt-4">
								<button
									onClick={(e) => handleClose()}
									className="border px-3 py-1 rounded">
									Cancel
								</button>

								<button
									onClick={handleSubmit}
									className="bg-green-600 text-white px-4 py-1 rounded">
									{editId ? "Update" : "Add"}
								</button>
							</div>
						</div>

						{/* form fields */}

						{/* <div className="flex justify-end gap-3 mt-4">
						<button className="border px-3 py-1 rounded">
							Cancel
						</button>
						<button className="bg-green-600 text-white px-4 py-1 rounded">
							Save
						</button>
					</div> */}
					</div>
				</div>
			)}
			{/* {showModal && (
				<div className="bg-white p-6 rounded w-full max-w-4xl">
					<div className="bg-white p-6 rounded w-96">
						<h2 className="text-lg mb-4">
							{editId ? "Edit Product" : "Add Product"}
						</h2>

						<InputField
							label="Title"
							value={form.title}
							onChange={(e) =>
								setForm({
									...form,
									title: e.target.value,
								})
							}
						/>

						<InputField
							label="Price"
							value={form.price}
							onChange={(e) =>
								setForm({
									...form,
									price: e.target.value,
								})
							}
						/>

						<InputField
							label="Category"
							value={form.category}
							onChange={(e) =>
								setForm({
									...form,
									category: e.target.value,
								})
							}
						/>

						<InputField
							label="Imag"
							value={form.image}
							onChange={(e) =>
								setForm({
									...form,
									image: e.target.value,
								})
							}
						/>
						<InputField
							label="description"
							value={form.description}
							onChange={(e) =>
								setForm({
									...form,
									description: e.target.value,
								})
							}
						/>

						<div className="flex justify-end gap-3 mt-4">
							<button
								onClick={() => setShowModal(false)}
								className="border px-3 py-1 rounded">
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								className="bg-green-600 text-white px-4 py-1 rounded">
								{editId ? "Update" : "Add"}
							</button>
						</div>
					</div>
				</div>
			)} */}
			<Pagination
				page={page}
				setPage={setPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default AdminPanel;
