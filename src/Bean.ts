import * as StringHelper from 'candyjs/helpers/StringHelper';

/**
 * Bean
 */
module.exports = class Bean {
    /**
     * @property {String} $fromParameter 从哪里取值
     */
    private $fromParameter: string;

    /**
     * @property {any} $fieldsMap 模型属性与表单字段对应关系
     *
     * {
     *      name: user_name
     * }
     */
    private $fieldsMap: any;

    constructor() {
        this.$fromParameter = 'body';
        this.$fieldsMap = null;
    }

    /**
     * 是否是内置属性
     *
     * @param {String} field
     */
    private isInternalField(field: string): boolean {
        let list = ['$fromParameter', '$fieldsMap'];
        let isInternal = false;

        for(let i=0; i<list.length; i++) {
            if(list[i] === field) {
                isInternal = true;
                break;
            }
        }

        return isInternal;
    }

    /**
     * 填充模型
     */
    fill(request: any): void {
        let fields = Object.getOwnPropertyNames(this);
        let data = request[this.$fromParameter];


        let method = '';
        let value = '';
        for(let field of fields) {
            if(this.isInternalField(field)) {
                continue;
            }

            method = 'set' + StringHelper.ucFirst(field);

            if(null !== this.$fieldsMap && undefined !== this.$fieldsMap[field]) {
                value = data[ this.$fieldsMap[field] ];
            } else {
                value = data[ field ];
            }

            if('function' === typeof this[method]) {
                this[method](value);
            } else {
                this[field] = value;
            }
        }
    }

    /**
     * 注入控制器的模型名
     *
     * @returns {String}
     */
    public className(): string {
        throw new Error('Bean class must implements className() method');
    }
}
