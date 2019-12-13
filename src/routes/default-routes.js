module.exports = (route) => {
    route.get('/', (ctx) => ctx.render('index'));

    return route;
};
