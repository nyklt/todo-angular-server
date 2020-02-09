import { Pageable, IndexablePage, paginate } from '@panderalabs/koa-pageable';
import Router from 'koa-router';
import productStore from './store';

export const router = new Router();

router.get('/', paginate, async (ctx) => {
    ctx.body = result;
    const response = ctx.response;

    response.body = await productStore.find({});
    response.status = 200; // ok


    // const pageable: Pageable = ctx.state.pageable;
    //
    // const result: IndexablePage<number, Person> = service.getData(pageable);
    //
    // ctx.body = result;
});

router.get('/:id', async (ctx) => {
    const product = await productStore.findOne({ _id: ctx.params.id });
    const response = ctx.response;
    if (product) {
        response.body = product;
        response.status = 200; // ok
    } else {
        response.status = 404; // not found
    }
});

const createProduct = async (product, response) => {
    try {
        response.body = await productStore.insert(product);
        response.status = 201; // created
    } catch (err) {
        response.body = { issue: [{ error: err.message }] };
        response.status = 400; // bad request
    }
};

router.post('/', async (ctx) => await createProduct(ctx.request.body, ctx.response));

// router.put('/:id', async (ctx) => {
//     const product = ctx.request.body;
//     const productId = ctx.params.id;
//     const response = ctx.response;
//     try {
//         const updatedproduct = await productStore.update({ _id: productId }, product);
//         console.log(updatedproduct)
//         response.body = updatedproduct;
//         response.status = 200;
//     } catch (err) {
//         response.body = { issue: [{ error: err.message }] };
//         response.status = 400; // bad request
//     }
// });

router.put('/:id', async (ctx) => {
    const product = ctx.request.body;
    const id = ctx.params.id;
    const productId = product._id;
    const response = ctx.response;
    if (productId && productId !== id) {
        response.body = { issue: [{ error: 'Param id and body _id should be the same' }] };
        response.status = 400; // bad request
        return;
    }
    if (!productId) {
        await createProduct(product, response);
    } else {
        const updatedCount = await productStore.update({ _id: id }, product);
        if (updatedCount === 1) {
            response.body = product;
            response.status = 200; // ok
        } else {
            response.body = { issue: [{ error: 'Resource no longer exists' }] };
            response.status = 405; // method not allowed
        }
    }
});

router.del('/:id', async (ctx) => {
    await productStore.remove({ _id: ctx.params.id });
    ctx.response.status = 204; // no content
});
