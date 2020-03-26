import publicRouter from './public';
import protectedRouter from './protected';


export default protectedRouter.concat(publicRouter);