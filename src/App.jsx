import React, { useState } from "react";
import {
  NavLink,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { initialEmployees } from "./data";

function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="shell">
      <aside className={open ? "side open" : "side"}>
        <div className="brand">
          <b>DH</b>
          <span>
            <strong>DevOps Hub</strong>
            <small>Employee Portal</small>
          </span>
        </div>
        <nav>
          {[
            ["/", "Dashboard"],
            ["/employees", "Employees"],
            ["/departments", "Departments"],
            ["/attendance", "Attendance"],
            ["/profile", "Profile"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => {
            localStorage.removeItem("login");
            location.reload();
          }}
        >
          Sign out
        </button>
      </aside>

      <main>
        <header>
          <button className="menu" onClick={() => setOpen(!open)}>
            ☰
          </button>
          <div>
            <small>Employee Management</small>
            <h1>DevOps Employee Hub</h1>
          </div>
          <span className="avatar">BL</span>
        </header>
        <section className="content">{children}</section>
      </main>
    </div>
  );
}

function Login({ setLogged }) {
  return (
    <div className="login">
      <form
        className="card login-card"
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem("login", "1");
          setLogged(true);
        }}
      >
        <div className="brand">
          <b>DH</b>
          <span>
            <strong>DevOps Hub</strong>
            <small>Employee Portal</small>
          </span>
        </div>
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in</h1>
        <p>Demo login — enter any email and password.</p>
        <label>
          Email
          <input type="email" defaultValue="admin@example.com" required />
        </label>
        <label>
          Password
          <input type="password" defaultValue="password" required />
        </label>
        <button className="primary">Sign in</button>
      </form>
    </div>
  );
}

function Dashboard({ employees }) {
  let active = employees.filter((e) => e.status === "Active").length;
  let depts = new Set(employees.map((e) => e.department)).size;

  return (
    <div>
      <div className="hero card">
        <div>
          <p className="eyebrow">Good morning</p>
          <h2>Welcome to DevOps Employee Hub</h2>
          <p>React frontend for our production-style Kubernetes DevOps project.</p>
        </div>
        <Link className="primary" to="/employees/new">
          + Add employee
        </Link>
      </div>

      <div className="stats">
        <Stat title="Employees" value={employees.length} />
        <Stat title="Active" value={active} />
        <Stat title="Departments" value={depts} />
        <Stat title="On Leave" value={employees.length - active} />
      </div>

      <div className="grid">
        <Panel title="Recent employees">
          <Table employees={employees.slice(0, 5)} />
        </Panel>
        <Panel title="DevOps platform">
          <ul className="services">
            <li>React frontend <b>Running</b></li>
            <li>REST API <b>Planned</b></li>
            <li>PostgreSQL <b>Planned</b></li>
            <li>AWS EKS <b>Planned</b></li>
            <li>Prometheus / Grafana <b>Planned</b></li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="card stat">
      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="card panel">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function Table({ employees, actions = false, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>
                <Link to={"/employees/" + e.id}>
                  <b>{e.name}</b>
                  <small>{e.email}</small>
                </Link>
              </td>
              <td>{e.department}</td>
              <td>{e.role}</td>
              <td>
                <span className={"badge " + e.status.toLowerCase().replaceAll(" ", "-")}>
                  {e.status}
                </span>
              </td>
              {actions && (
                <td>
                  <Link to={"/employees/" + e.id + "/edit"}>Edit</Link>{" "}
                  <button onClick={() => onDelete(e.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Employees({ employees, setEmployees }) {
  const [q, setQ] = useState("");
  let list = employees.filter((e) =>
    (e.name + " " + e.email + " " + e.role).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="heading">
        <div>
          <p className="eyebrow">Directory</p>
          <h2>Employees</h2>
        </div>
        <Link className="primary" to="/employees/new">
          + Add employee
        </Link>
      </div>

      <div className="card panel">
        <input
          className="search"
          placeholder="Search employees..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Table
          employees={list}
          actions
          onDelete={(id) =>
            confirm("Delete employee?") &&
            setEmployees((es) => es.filter((e) => e.id !== id))
          }
        />
      </div>
    </div>
  );
}

function Form({ employees, setEmployees }) {
  const { id } = useParams(),
    nav = useNavigate(),
    old = employees.find((e) => e.id === Number(id));

  const [f, setF] = useState(
    old || {
      name: "",
      email: "",
      phone: "",
      department: "Engineering",
      role: "",
      location: "Hyderabad",
      status: "Active",
      joined: new Date().toISOString().slice(0, 10),
    }
  );

  const change = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    if (id) {
      setEmployees((es) =>
        es.map((x) => (x.id === Number(id) ? { ...f, id: Number(id) } : x))
      );
    } else {
      setEmployees((es) => [
        { ...f, id: Math.max(...es.map((x) => x.id), 1000) + 1 },
        ...es,
      ]);
    }
    nav("/employees");
  };

  return (
    <div className="narrow">
      <div className="heading">
        <div>
          <p className="eyebrow">Employee directory</p>
          <h2>{id ? "Edit" : "Add"} employee</h2>
        </div>
      </div>

      <form className="card form" onSubmit={save}>
        <div className="form-grid">
          {["name", "email", "phone", "role", "location", "joined"].map((n) => (
            <label key={n}>
              {n}
              <input
                name={n}
                type={n === "email" ? "email" : n === "joined" ? "date" : "text"}
                value={f[n]}
                onChange={change}
                required={["name", "email", "role", "location"].includes(n)}
              />
            </label>
          ))}
          <label>
            Department
            <select name="department" value={f.department} onChange={change}>
              {[
                "Engineering",
                "DevOps",
                "Human Resources",
                "Finance",
                "Design",
                "Sales",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select name="status" value={f.status} onChange={change}>
              {["Active", "On Leave", "Inactive"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="actions">
          <button type="button" onClick={() => nav("/employees")}>
            Cancel
          </button>
          <button className="primary">Save</button>
        </div>
      </form>
    </div>
  );
}

function Details({ employees }) {
  const { id } = useParams(),
    e = employees.find((x) => x.id === Number(id));

  if (!e)
    return (
      <Panel title="Not found">
        <Link to="/employees">Back</Link>
      </Panel>
    );

  return (
    <div className="card detail">
      <div className="big-avatar">{e.name[0]}</div>
      <div>
        <p className="eyebrow">Employee profile</p>
        <h2>{e.name}</h2>
        <p>
          {e.role} · {e.department}
        </p>
        <hr />
        <div className="details">
          {Object.entries({
            Email: e.email,
            Phone: e.phone,
            Location: e.location,
            Status: e.status,
            "Joined date": e.joined,
            "Employee ID": "EMP-" + e.id,
          }).map(([k, v]) => (
            <div key={k}>
              <small>{k}</small>
              <b>{v}</b>
            </div>
          ))}
        </div>
        <Link className="primary" to={"/employees/" + e.id + "/edit"}>
          Edit employee
        </Link>
      </div>
    </div>
  );
}

function Simple({ title, text, children }) {
  return (
    <div>
      <p className="eyebrow">Organization</p>
      <h2>{title}</h2>
      <p>{text}</p>
      {children}
    </div>
  );
}

function App() {
  const [logged, setLogged] = useState(
    localStorage.getItem("login") !== null
  );
  const [employees, setEmployees] = useState(initialEmployees);

  if (!logged) return <Login setLogged={setLogged} />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard employees={employees} />} />
        <Route
          path="/employees"
          element={
            <Employees employees={employees} setEmployees={setEmployees} />
          }
        />
        <Route
          path="/employees/new"
          element={<Form employees={employees} setEmployees={setEmployees} />}
        />
        <Route
          path="/employees/:id/edit"
          element={<Form employees={employees} setEmployees={setEmployees} />}
        />
        <Route
          path="/employees/:id"
          element={<Details employees={employees} />}
        />
        <Route
          path="/departments"
          element={
            <Simple
              title="Departments"
              text="Employee distribution across departments."
            >
              <div className="stats">
                {[...new Set(employees.map((e) => e.department))].map((d) => (
                  <div className="card stat" key={d}>
                    <b>{d}</b>
                    <strong>
                      {employees.filter((e) => e.department === d).length}
                    </strong>
                  </div>
                ))}
              </div>
            </Simple>
          }
        />
        <Route
          path="/attendance"
          element={
            <Simple title="Attendance" text="Today's attendance overview.">
              <Panel title="Attendance">
                <Table employees={employees} />
              </Panel>
            </Simple>
          }
        />
        <Route
          path="/profile"
          element={
            <Simple
              title="Profile"
              text="Platform Administrator · admin@example.com"
            />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;