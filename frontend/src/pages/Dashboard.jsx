import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [deadline, setDeadline] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const [editingTask, setEditingTask] = useState(null);

  const token = localStorage.getItem("token");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      let url = "http://localhost:5000/api/tasks";

      if (filterStatus !== "all") {
        url += `?status=${filterStatus}`;
      }

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filterStatus]);

  // CREATE / UPDATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        // UPDATE TASK
        await axios.put(
          `http://localhost:5000/api/tasks/${editingTask._id}`,
          {
            title,
            description,
            status,
            deadline,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEditingTask(null);
      } else {
        // CREATE TASK
        await axios.post(
          "http://localhost:5000/api/tasks",
          {
            title,
            description,
            status,
            deadline,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // RESET FORM
      setTitle("");
      setDescription("");
      setStatus("pending");
      setDeadline("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT TASK
  const editTask = (task) => {
    setEditingTask(task);

    setTitle(task.title);
    setDescription(task.description || "");
    setStatus(task.status || "pending");

    if (task.deadline) {
      setDeadline(task.deadline.substring(0, 10));
    } else {
      setDeadline("");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #020617, #111827, #172554)",
        color: "white",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            HALAMAN DASHBOARD UTAMA
          </h1>

          <button
            onClick={logout}
            style={{
              background: "#ef4444",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>

        {/* FILTER */}
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
            style={inputStyle}
          >
            <option value="all">
              All Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="in-progress">
              In Progress
            </option>

            <option value="done">
              Done
            </option>
          </select>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#111827",
            padding: "25px",
            borderRadius: "18px",
            marginBottom: "30px",
            border: "1px solid #374151",
          }}
        >
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
            style={inputStyle}
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            style={{
              ...inputStyle,
              minHeight: "100px",
            }}
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            style={inputStyle}
          >
            <option value="pending">
              Pending
            </option>

            <option value="in-progress">
              In Progress
            </option>

            <option value="done">
              Done
            </option>
          </select>

          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
            }
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#38bdf8",
              border: "none",
              borderRadius: "10px",
              color: "black",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            {editingTask
              ? "Update Task"
              : "Add Task"}
          </button>
        </form>

        {/* TASK LIST */}
        {tasks.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#94a3b8",
              marginTop: "40px",
            }}
          >
            No tasks found
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              style={{
                background: "#111827",
                padding: "20px",
                borderRadius: "16px",
                marginBottom: "20px",
                border: "1px solid #374151",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {task.title}
              </h2>

              <p
                style={{
                  color: "#cbd5e1",
                  marginBottom: "10px",
                }}
              >
                {task.description || "-"}
              </p>

              <p
                style={{
                  marginBottom: "8px",
                }}
              >
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      task.status === "done"
                        ? "#22c55e"
                        : task.status ===
                          "in-progress"
                        ? "#facc15"
                        : "#38bdf8",
                  }}
                >
                  {task.status}
                </span>
              </p>

              <p>
                <strong>Deadline:</strong>{" "}
                {task.deadline
                  ? new Date(
                      task.deadline
                    ).toLocaleDateString()
                  : "-"}
              </p>

              {/* BUTTONS */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "18px",
                }}
              >
                <button
                  onClick={() => editTask(task)}
                  style={{
                    background: "#3b82f6",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  style={{
                    background: "#ef4444",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #374151",
  background: "#0f172a",
  color: "white",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

export default Dashboard;