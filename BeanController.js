"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller = require("candyjs/web/Controller");
/**
 * 控制器
 */
module.exports = class BeanController extends Controller {
    constructor(context) {
        super(context);
    }
    /**
     * 需要装配的模型
     */
    autowire() {
        return null;
    }
    wireBeans() {
        let Beans = this.autowire();
        if (null === Beans) {
            return;
        }
        for (let i = 0, bean = null, name = ''; i < Beans.length; i++) {
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
    runControllerAction(request, response) {
        this.wireBeans();
        super.runControllerAction(request, response);
    }
};
