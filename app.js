// -------------------------------------------------
// imports
// -------------------------------------------------
const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const dbConfig = require('./config/dbConfig.json');
const ModelTasks = require('./models/ModelTasks');
// -------------------------------------------------

// -------------------------------------------------
// basic inits
// -------------------------------------------------
dotenv.config();
const app = express();
const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
  host: dbConfig.development.host,
  dialect: dbConfig.development.dialect,
});

const InstantiatedModelTasks = ModelTasks(sequelize, Sequelize.DataTypes);
// -------------------------------------------------

// -------------------------------------------------
// middlewares
// -------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -------------------------------------------------

app.get('/', async (req, res) => {
  const allTasksList = await InstantiatedModelTasks.findAll();

  const contentList = allTasksList.map(task => `<tr>
      <td>${task.content}</td>
      <td>${task.location?.['x'] || "null"}</td>
      <td>${task.location?.['y'] || "null"}</td>
    <tr>`);
  try {
    res.send(`
    <div>
      <h1>Welcome to Tasks Viewer</h1>
      <h2>List below:</h2>
      <table>
        <thead>
          <tr>
            <th>
              TASK NAME
            </th>
            <th>
              LATITUDE
            </th>
            <th>
              LONGITUDE
            </th>
          </tr>
        </thead>
        <tbody>
          ${contentList}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <form method="POST" action="/post">
        <input name="taskName" type="text" placeholder="Enter task name" />
        <button type="submit">Submit</button>
      </form>
    </div>
  `);
  } catch {
    res.send('404: Not Found')
  }
})

app.post('/post', async (req, res) => {
  try {
    const { taskName } = req.body;
    await sequelize.query(`insert into "Tasks" ("createdAt", "updatedAt", "content", "location")
        values (:createdAt, :updatedAt, :content, point(:long, :lat))`, {
      replacements: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: taskName,
        long: Math.random(),
        lat: Math.random(),
      }
    });
    res.redirect('/');
  } catch (err) {
    console.log('error is: ', err);
    res.send('<h1>error happened</h1>');
  }
})

// -------------------------------------------------
// establish a connection to the database and start the server
// -------------------------------------------------
const init = async () => {
  try {
    await sequelize.authenticate();
    const portOnWhichServerListens = process.env.PORT || 3000;
    app.listen(portOnWhichServerListens, (err) => {
      if (err) {
        console.log('❌ Server Failed To Start');
        return;
      }

      console.log(`✅ Server Started on Port: ${portOnWhichServerListens}`);
    });
  } catch (error) {
    console.log('❌ Unable To Start (could be possible db connection issue)', error);
  }
};

init();
// -------------------------------------------------