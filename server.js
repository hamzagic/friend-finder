import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './src/db/Connection.js';
import subjectRoutes from './src/routes/SubjectRoutes.js';
import genreRoutes from './src/routes/GenreRoutes.js';
import subgenreRoutes from './src/routes/SubgenreRoutes.js';
import titleRoutes from './src/routes/TitleRoutes.js';
import starRoutes from './src/routes/StarRoutes.js';
import userRoutes from './src/routes/UserRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(subjectRoutes);
app.use(genreRoutes);
app.use(subgenreRoutes);
app.use(titleRoutes);
app.use(starRoutes);
app.use(userRoutes);
connect();
app.get('/', (req, res) => {
  res.json({ message: 'Hello There' });
});
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));