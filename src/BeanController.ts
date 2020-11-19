import * as Controller from 'candyjs/web/Controller';

/**
 * 控制器
 */
module.exports = class BeanController extends Controller {
    public context: any;

    constructor(context: any) {
        super(context);
    }

    /**
     * 需要装配的模型
     */
    public autowire(): any[] {
        return null;
    }

    private wireBeans() {
        let Beans = this.autowire();
        if(null === Beans) {
            return;
        }

        for(let i=0, bean=null, name=''; i<Beans.length; i++) {
            bean = new Beans[i];
            bean.fill(this.context.request);

            name = bean.className();
            this[name] = bean;
        }
    }

    /**
     * 拦截控制器执行
     *
     * @param {any} request
     * @param {any} response
     */
    public runControllerAction(request: any, response: any): void {
        this.wireBeans();

        super.runControllerAction(request, response);
    }
}
