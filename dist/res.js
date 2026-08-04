import { validate } from "@wxn0brp/falcon-frame/valid";
export class SocketRes {
    module;
    constructor(module) {
        this.module = module;
    }
    valid(...err) {
        return {
            err: [
                "error.valid",
                this.module,
                ...err,
            ],
        };
    }
    check(schema, data, regexRules) {
        const result = validate({
            schema,
            data,
            regexRules,
            isBodyParsed: true,
        });
        if (result.valid)
            return null;
        return this.valid(result.validErrors);
    }
    err(...err) {
        return {
            err: [
                "error",
                this.module,
                ...err,
            ],
        };
    }
    data(...data) {
        return {
            err: false,
            res: data,
        };
    }
}
