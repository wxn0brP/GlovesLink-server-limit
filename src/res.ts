import { validate } from "@wxn0brp/falcon-frame/valid";
import type { ValidationSchema } from "@wxn0brp/falcon-frame/types";
import { Socket_event, Socket_StandardRes } from "./types";

export class SocketRes {
	constructor(public module: Socket_event) {}

	valid(...err: any[]): Socket_StandardRes {
		return {
			err: [
				"error.valid",
				this.module,
				...err,
			],
		};
	}

	check(
		schema: ValidationSchema,
		data: any,
		regexRules?: Record<string, RegExp | string>,
	): Socket_StandardRes | null {
		const result = validate({
			schema,
			data,
			regexRules,
			isBodyParsed: true,
		});
		if (result.valid) return null;
		return this.valid(result.validErrors);
	}

	err(...err: any[]): Socket_StandardRes {
		return {
			err: [
				"error",
				this.module,
				...err,
			],
		};
	}

	data(...data: any[]): Socket_StandardRes {
		return {
			err: false,
			res: data,
		};
	}
}
