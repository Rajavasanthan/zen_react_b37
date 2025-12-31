import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "./userSlice";
ChartJS.register(ArcElement, Tooltip, Legend);

function Userlist() {
  // const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const getUsers = async () => {
    try {
      // axios
      const user = await axios.get(
        "https://6461c1c2491f9402f4aa0565.mockapi.io/users"
      );
      dispatch(setUsers(user.data));
      console.log(users);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const resp = confirm("Are you sure do you want to delete this data?");
      if (resp) {
        await axios.delete(
          `https://6461c1c2491f9402f4aa0565.mockapi.io/users/${id}`
        );
      }
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <div className="w-7xl mx-auto">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl">User List</h1>
          <Link
            to={"/user-create"}
            className="bg-green-600 p-3 text-white rounded cursor-pointer hover:bg-green-700"
          >
            Create User
          </Link>
        </div>
        <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          {!users && (
            <div className="w-full">
              <div className="w-7xl mx-auto flex justify-center">
                <span class="relative flex size-3">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                </span>
              </div>
            </div>
          )}

          {users?.length > 0 && (
            <table class="w-full text-sm text-left rtl:text-right text-body">
              <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                  <th scope="col" class="px-6 py-3 font-medium">
                    Username
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                    Full Name
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                    Date of Joining
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                    Phone
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                    E-mail
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr class="bg-neutral-primary border-b border-default">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                      >
                        {user.username}
                      </th>
                      <td class="px-6 py-4">{user.fullName}</td>
                      <td class="px-6 py-4">{user.category}</td>
                      <td class="px-6 py-4">{user.doj}</td>
                      <td class="px-6 py-4">{user.phone}</td>
                      <td class="px-6 py-4">{user.email}</td>
                      <td class="px-6 py-4">
                        <Link
                          to={`/user-edit/${user.id}`}
                          className="bg-blue-400 p-2 rounded text-white mx-2 cursor-pointer hover:bg-blue-500"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-400 p-2 rounded text-white cursor-pointer hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {users?.length == 0 && (
            <div className="w-full py-5">
              <h2 className="text-center text-lg">No Users Found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Userlist;
