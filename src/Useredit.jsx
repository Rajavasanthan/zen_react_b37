import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

function Useredit() {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const myFormik = useFormik({
    initialValues: {
      username: user.username || "",
      fullName: user.fullName || "",
      phone: user.phone || "",
      email: user.email || "",
      category: user.category || "",
      doj: user.doj || "",
    },
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://6461c1c2491f9402f4aa0565.mockapi.io/users/${params.id}`,
          values
        );
        navigate("/user-list");
      } catch (error) {
        alert(error);
      }
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const getUser = await axios.get(
          `https://6461c1c2491f9402f4aa0565.mockapi.io/users/${params.id}`
        );
        setUser(getUser.data);
        myFormik.setValues({
          username: getUser.data.username || "",
          fullName: getUser.data.fullName || "",
          phone: getUser.data.phone || "",
          email: getUser.data.email || "",
          category: getUser.data.category || "",
          doj: getUser.data.doj || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className="w-full">
      <div className="w-7xl mx-auto">
        <h1 className="text-2xl">User Edit - {params.id}</h1>
      </div>
      <div>
        <form onSubmit={myFormik.handleSubmit}>
          <div className="w-7xl mx-auto pt-5 flex gap-5">
            <div className="w-1/2">
              <label htmlFor="name" className="block pb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={myFormik.values.username}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                className={`w-full border border-gray-300 p-2 rounded-lg ${
                  myFormik.errors.username &&
                  myFormik.touched["username"] &&
                  "border-red-500"
                }`}
              />
              {myFormik.touched["username"] && myFormik.errors.username ? (
                <span className="text-red-500">{myFormik.errors.username}</span>
              ) : null}
            </div>
            <div className="w-1/2">
              <label htmlFor="name" className="block pb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={myFormik.values.fullName}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                className={`w-full border border-gray-300 p-2 rounded-lg ${
                  myFormik.errors.fullName &&
                  myFormik.touched["fullName"] &&
                  "border-red-500"
                }`}
              />
            </div>
          </div>

          <div className="w-7xl mx-auto pt-5 flex gap-5">
            <div className="w-1/2">
              <label htmlFor="name" className="block pb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={myFormik.values.phone}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                className={`w-full border border-gray-300 p-2 rounded-lg ${
                  myFormik.errors.phone &&
                  myFormik.touched["phone"] &&
                  "border-red-500"
                }`}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="name" className="block pb-2">
                E-Mail
              </label>
              <input
                type="text"
                name="email"
                value={myFormik.values.email}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                className={`w-full border border-gray-300 p-2 rounded-lg ${
                  myFormik.errors.email &&
                  myFormik.touched["email"] &&
                  "border-red-500"
                }`}
              />
            </div>
          </div>

          <div className="w-7xl mx-auto pt-5 flex gap-5">
            <div className="w-1/2">
              <label htmlFor="name" className="block pb-2">
                Role
              </label>
              <select
                name="category"
                className="w-full border border-gray-300 p-2 rounded-lg"
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                value={myFormik.values.category}
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="asst_manager">Asst Manager</option>
                <option value="lead_developer">Lead Developer</option>
                <option value="junior_developer">Junior Developer</option>
              </select>
              {/* <input
                type="text"
                name="phone"
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                value={myFormik.values.phone}
                className={`w-full border border-gray-300 p-2 rounded-lg ${
                  myFormik.errors.phone &&
                  myFormik.touched["phone"] &&
                  "border-red-500"
                }`}
              /> */}
              {myFormik.touched["category"] && myFormik.errors.category ? (
                <span className="text-red-500">{myFormik.errors.category}</span>
              ) : null}
            </div>
            <div className="w-1/2">
              <label htmlFor="name" className="block pb-2">
                Joining Date
              </label>
              <input
                type="date"
                name="doj"
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                value={myFormik.values.doj}
                className={`w-full border border-gray-300 p-2 rounded-lg ${
                  myFormik.errors.doj &&
                  myFormik.touched["doj"] &&
                  "border-red-500"
                }`}
              />
              {myFormik.touched["email"] && myFormik.errors.email ? (
                <span className="text-red-500">{myFormik.errors.email}</span>
              ) : null}
            </div>
          </div>
          <div className="w-7xl mx-auto pt-5">
            <input
              type={"submit"}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              value="Update User"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Useredit;
