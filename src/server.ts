import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
// @ts-ignore
import cors from 'cors'
import userRoutes from "./handlers/users";
import productsRoutes from './handlers/products';
import orderRoutes from "./handlers/orders";
import dashboardRoutes from "./handlers/dashboard";

const app: express.Application = express()
const address = "0.0.0.0:3000"

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello Wörld')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

userRoutes(app);
productsRoutes(app);
orderRoutes(app);
dashboardRoutes(app);