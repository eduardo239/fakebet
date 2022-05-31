function Api() {
  return (
    <div>
      <h1>APIs</h1>
      <div>
        <h3>USER</h3>
        <div className="code-grid done">
          <pre>REGISTER: </pre>
          <pre>http://localhost:3003/users/sign-up</pre>
        </div>
        <div className="code-grid done">
          <pre>LOGIN: </pre>
          <pre>http://localhost:3003/users/sign-in</pre>
        </div>
        <div className="code-grid done">
          <pre>EDIT: </pre>
          <pre>http://localhost:3003/users/edit</pre>
        </div>
        <div className="code-grid done">
          <pre>LOGGED USER: </pre>
          <pre>http://localhost:3003/users/</pre>
        </div>
        <div className="code-grid done">
          <pre>DELETE: </pre>
          <pre>http://localhost:3003/users/remove/:id</pre>
        </div>
        <div className="code-grid done">
          <pre>USERS: </pre>
          <pre>http://localhost:3003/users/users</pre>
        </div>
        <div className="code-grid done">
          <pre>USER: </pre>
          <pre>http://localhost:3003/users/user/:id</pre>
        </div>
      </div>

      <div>
        <h3>TEAM</h3>
        <div className="code-grid done">
          <pre>ADD: </pre>
          <pre>http://localhost:3003/teams/add</pre>
        </div>
        <div className="code-grid done">
          <pre>EDIT: </pre>
          <pre>http://localhost:3003/teams/edit</pre>
        </div>
        <div className="code-grid done">
          <pre>TEAM: </pre>
          <pre>http://localhost:3003/teams/:id</pre>
        </div>
        <div className="code-grid done">
          <pre>DELETE: </pre>
          <pre>http://localhost:3003/teams/remove/:id</pre>
        </div>
      </div>

      <div>
        <h3>GAME</h3>
        <div className="code-grid done">
          <pre>ADD: </pre>
          <pre>http://localhost:3003/games/add</pre>
        </div>
        <div className="code-grid">
          <pre>EDIT: </pre>
          <pre>http://localhost:3003/games/edit</pre>
        </div>
        <div className="code-grid">
          <pre>TEAM: </pre>
          <pre>http://localhost:3003/games/:id</pre>
        </div>
        <div className="code-grid">
          <pre>DELETE: </pre>
          <pre>http://localhost:3003/games/remove/:id</pre>
        </div>
        <div className="code-grid done">
          <pre>DELETE: </pre>
          <pre>http://localhost:3003/games/all</pre>
        </div>
      </div>

      <div>
        <h3>BET</h3>
        <div className="code-grid done">
          <pre>ADD: </pre>
          <pre>http://localhost:3003/bet/add</pre>
        </div>
        <div className="code-grid done">
          <pre>TEAM: </pre>
          <pre>http://localhost:3003/bet/:id</pre>
        </div>
        <div className="code-grid done">
          <pre>DELETE: </pre>
          <pre>http://localhost:3003/bet/remove/:id</pre>
        </div>
      </div>
      <div className="code-grid done">
        <pre>ALL: </pre>
        <pre>http://localhost:3003/bet/all</pre>
      </div>
    </div>
  );
}

export default Api;
