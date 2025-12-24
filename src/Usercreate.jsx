import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

function Usercreate() {
  const navigate = useNavigate();
  const myFormik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      phone: "",
      email: "",
      category : "admin",
      doj : ""
    },
    validate: (values) => {
      let error = {};

      if (
        values.username == "" ||
        values.username.length < 3 ||
        values.username.length > 15
      ) {
        error.username = "There is a issue in User name";
      }

      const emailExpression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (!emailExpression.test(values.email)) {
        error.email = "Email is not in correct format";
      }

      const phoneExpression = /^[0-9]{10}$/i;

      if (!phoneExpression.test(values.phone)) {
        error.phone = "Not a valid phone number";
      }

      if (values.fullName == "") {
        error.fullName = "FullName required";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://6461c1c2491f9402f4aa0565.mockapi.io/users",
          values
        );
        navigate("/user-list");
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <div className="w-full">
      <div className="w-7xl mx-auto">
        <h1 className="text-2xl">Create User</h1>
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
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                value={myFormik.values.username}
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
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                value={myFormik.values.fullName}
                className={`w-full border border-gray-300 p-2 rounded-lg ${
                  myFormik.errors.fullName &&
                  myFormik.touched["fullName"] &&
                  "border-red-500"
                }`}
              />
              {myFormik.touched["fullName"] && myFormik.errors.fullName ? (
                <span className="text-red-500">{myFormik.errors.fullName}</span>
              ) : null}
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
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                value={myFormik.values.phone}
                className={`w-full border border-gray-300 p-2 rounded-lg ${
                  myFormik.errors.phone &&
                  myFormik.touched["phone"] &&
                  "border-red-500"
                }`}
              />
              {myFormik.touched["phone"] && myFormik.errors.phone ? (
                <span className="text-red-500">{myFormik.errors.phone}</span>
              ) : null}
            </div>
            <div className="w-1/2">
              <label htmlFor="name" className="block pb-2">
                E-Mail
              </label>
              <input
                type="text"
                name="email"
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                value={myFormik.values.email}
                className={`w-full border border-gray-300 p-2 rounded-lg ${
                  myFormik.errors.email &&
                  myFormik.touched["email"] &&
                  "border-red-500"
                }`}
              />
              {myFormik.touched["email"] && myFormik.errors.email ? (
                <span className="text-red-500">{myFormik.errors.email}</span>
              ) : null}
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
              {myFormik.touched["doj"] && myFormik.errors.doj ? (
                <span className="text-red-500">{myFormik.errors.doj}</span>
              ) : null}
            </div>
          </div>
          <div className="w-7xl mx-auto pt-5">
            <input
              type="submit"
              className={` text-white px-4 py-2 rounded-lg ${
                Object.keys(myFormik.errors).length > 0
                  ? "bg-gray-500"
                  : "bg-blue-500"
              }`}
              value={"Submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Usercreate;
