import app from './app';
import 'dotenv/config';
import './configs/db.config';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
