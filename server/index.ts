import { RHateMeServer } from './src/Server';
import { dbConnect } from './src/Database';

dbConnect();
RHateMeServer.run();